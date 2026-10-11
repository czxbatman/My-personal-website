import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
import {HelicopterController} from './controller.mjs';
import {createPoliceLights} from './police-lights.js';
import {createFlightEffects} from './effects.js';

// Flight math and performance sequences are retained from Desktop Helicopter V5.0.3.
// The browser adapter only supplies a measured dock, inspection pose and DOM input.
export class WebHelicopterController extends HelicopterController {
  get modelWidth(){return this.displayWidth || super.modelWidth;}
  get home(){return this.dockPoint || super.home;}
  setDock(point, displayWidth){
    const parked=this.state==='PARKED';
    this.displayWidth=displayWidth;this.dockPoint=this.bound(point,false);
    if(parked)this.park();
  }
  startPerformance(name){
    if(!['patrol','search'].includes(name)||!this.visible||this.activity==='performance/'+name)return;
    // Desktop sequences start with takeoff. In-page takeover can already be airborne.
    if(this.state!=='PARKED'){this.vx=this.vy=0;this.goal=this.target=null;this.setState('HOVERING');}
    super.startPerformance(name);
  }
}

export function createHelicopterScene({host,stage,onStatus,onError,reducedMotion}) {
  const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));
  renderer.setClearColor(0,0);
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.toneMapping=THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure=1.18;
  renderer.domElement.setAttribute('aria-hidden','true');
  host.appendChild(renderer.domElement);
  const scene=new THREE.Scene();
  const camera=new THREE.OrthographicCamera(-1,1,1,-1,1,3000);
  camera.position.z=1000;
  const environment=new RoomEnvironment(),pmrem=new THREE.PMREMGenerator(renderer);
  const environmentMap=pmrem.fromScene(environment,.04);
  scene.environment=environmentMap.texture;scene.environmentIntensity=.65;
  environment.dispose();pmrem.dispose();
  scene.add(new THREE.HemisphereLight(0xeaf5ff,0x647486,2.2));
  const key=new THREE.DirectionalLight(0xfff4e0,3.2);key.position.set(-2,6,7);scene.add(key);
  const fill=new THREE.DirectionalLight(0xbddcff,1.8);fill.position.set(4,2,-4);scene.add(fill);
  const carrier=new THREE.Group(),pad=new THREE.Group();scene.add(carrier,pad);
  const metal=new THREE.MeshStandardMaterial({color:0x354650,metalness:.65,roughness:.35});
  const topMaterial=new THREE.MeshStandardMaterial({color:0x617784,metalness:.45,roughness:.5});
  const base=new THREE.Mesh(new THREE.CylinderGeometry(1,1,1,64),metal);pad.add(base);
  const disc=new THREE.Mesh(new THREE.CircleGeometry(1,64),topMaterial);disc.rotation.x=-Math.PI/2;pad.add(disc);
  const ringMaterial=new THREE.MeshBasicMaterial({color:0xb9ded9,transparent:true,opacity:.8,side:THREE.DoubleSide});
  const ring=new THREE.Mesh(new THREE.RingGeometry(.81,.825,64),ringMaterial);ring.rotation.x=-Math.PI/2;pad.add(ring);
  const markMaterial=new THREE.MeshBasicMaterial({color:0xeaf1ed});
  const hParts=[[-.19,0,.05,.43],[.19,0,.05,.43],[0,0,.38,.05]].map(([x,z,w,h])=>{
    const mesh=new THREE.Mesh(new THREE.BoxGeometry(w,.005,h),markMaterial);mesh.position.set(x,0,z);pad.add(mesh);return mesh;
  });
  const controller=new WebHelicopterController(innerWidth,innerHeight,'right');
  let helicopter,mainRotor,tailRotor,lights,effects,modelSize,restBounds;
  let disposed=false,ready=false,raf=0,last=0,clock=0,autoIntro=!reducedMotion&&innerWidth>=1200&&location.pathname==='/',pointMode=false;
  let inspectYaw=0,inspectPitch=0,drag=null,lastStatus='',draws=0,dockVisible=true;
  const query=matchMedia('(prefers-reduced-motion: reduce)');
  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
  function publish(){
    const snapshot=controller.snapshot();
    host.dataset.state=snapshot.state;host.dataset.activity=snapshot.activity||'';
    host.dataset.x=snapshot.x.toFixed(2);host.dataset.y=snapshot.y.toFixed(2);
    host.dataset.pointMode=String(pointMode);host.dataset.ready=String(ready);
    const status={state:snapshot.state,ready,pointMode,activity:snapshot.activity};
    const statusKey=JSON.stringify(status);
    if(statusKey!==lastStatus){lastStatus=statusKey;onStatus(status);}
  }
  function draw(dt=0){
    if(!ready||disposed)return;
    const motion=controller.snapshot(),parked=motion.state==='PARKED';
    carrier.position.set(motion.x,motion.y+motion.bob,0);
    carrier.rotation.set(.2+(parked?inspectPitch:motion.pitch),motion.yaw+(parked?inspectYaw:0),motion.roll);
    mainRotor.rotation.y=(mainRotor.rotation.y+dt*41.89*motion.rotor)%(Math.PI*2);
    tailRotor.rotation.z=(tailRotor.rotation.z+dt*103.67*motion.rotor)%(Math.PI*2);
    clock+=dt;lights.update(clock,!parked);
    effects.configure({search:!!motion.taskEffects.search,navigation:true,enhanced:false});
    effects.update(dt,motion);
    pad.visible=dockVisible;
    // Measure the landing gear silhouette after the flight pose is applied.
    if(parked){
      carrier.updateWorldMatrix(true,true);
      const bounds=restBounds.clone().applyMatrix4(carrier.matrixWorld);
      pad.position.set(controller.home.x,bounds.min.y-3,-18);
    }else pad.position.set(controller.home.x,controller.home.y-modelSize.y*carrier.scale.x*.42-3,-18);
    pad.rotation.set(.48,parked?inspectYaw:0,0);
    renderer.render(scene,camera);controller.recordRenderedPose(carrier.position.x,carrier.position.y);
    host.dataset.draws=String(++draws);publish();
  }
  function frame(now){
    raf=0;if(disposed||document.hidden||!ready)return;
    const dt=Math.min((now-last)/1000,.25);last=now;
    // Retain the original 50ms physics step without slowing flight on weaker GPUs.
    let remaining=dt;
    while(remaining>0){
      const previous=controller.state,step=Math.min(remaining,.05);controller.update(step);remaining-=step;
      if(autoIntro&&previous==='ENTERING'&&controller.state==='INTRO_HOLD'){
        autoIntro=false;controller.command('performance',{name:'patrol'});
      }
    }
    draw(dt);
    if(controller.state!=='PARKED')raf=requestAnimationFrame(frame);
    host.dataset.animating=String(!!raf);
  }
  function wake(){
    if(!disposed&&ready&&!document.hidden&&!raf){last=performance.now();raf=requestAnimationFrame(frame);host.dataset.animating='true';}
  }
  function layout(){
    if(disposed)return;
    const width=innerWidth,height=innerHeight,rect=stage.getBoundingClientRect();
    const displayWidth=Math.min(760,rect.width*.95,rect.height*1.18);
    const point={x:rect.left+rect.width/2-width/2,y:height/2-(rect.top+rect.height*.38)};
    dockVisible=rect.width>0&&rect.height>0;
    if(controller.width!==width||controller.height!==height)controller.resize(width,height);
    controller.setDock(point,displayWidth);
    renderer.setSize(width,height);
    camera.left=-width/2;camera.right=width/2;camera.top=height/2;camera.bottom=-height/2;camera.updateProjectionMatrix();
    if(ready){
      carrier.scale.setScalar(displayWidth/modelSize.x);
      const radius=displayWidth*.46;
      base.scale.set(radius,7,radius);disc.scale.setScalar(radius);disc.position.y=3.55;
      ring.scale.setScalar(radius);ring.position.y=3.8;
      hParts.forEach((mesh,index)=>{mesh.scale.setScalar(radius);mesh.position.set(index===0?-radius*.19:index===1?radius*.19:0,3.9,0);});
      draw();wake();
    }
  }
  function command(action){
    if(!ready||disposed)return;
    autoIntro=false;inspectYaw=inspectPitch=0;
    if(action==='point'){
      pointMode=!pointMode;
      if(pointMode)controller.command(controller.state==='PARKED'?'takeoff':'hold');
      if(!pointMode)controller.command('hold');
      publish();wake();return;
    }
    pointMode=false;
    if(action==='patrol'||action==='search')controller.command('performance',{name:action});
    else controller.command(action);
    publish();wake();
  }
  function collapse(){
    pointMode=false;autoIntro=false;inspectYaw=inspectPitch=0;
    if(ready){controller.cancelTask();controller.park();draw();}
    if(raf)cancelAnimationFrame(raf);raf=0;host.dataset.animating='false';
  }
  function visibility(){
    if(document.hidden){cancelAnimationFrame(raf);raf=0;host.dataset.animating='false';}
    else wake();
  }
  function reduceMotion(){
    if(query.matches){autoIntro=false;pointMode=false;controller.cancelTask();controller.park();draw();}
    wake();
  }
  function keydown(event){
    if(event.key==='Escape'&&pointMode&&!document.querySelector('[role="dialog"]'))command('point');
  }
  function pointerDown(event){
    drag=null;
    if(event.button!==0||!pointMode||document.querySelector('[role="dialog"]'))return;
    const target=event.target;
    if(!(target instanceof Element)||target.closest('a,button,input,textarea,select,label,[role="button"],[role="dialog"],[contenteditable],nav,header,figure,[data-helicopter-ui]'))return;
    drag={id:event.pointerId,x:event.clientX,y:event.clientY,scroll:scrollY,moved:false};
  }
  function pointerMove(event){
    if(drag&&drag.id===event.pointerId&&Math.hypot(event.clientX-drag.x,event.clientY-drag.y)>6)drag.moved=true;
  }
  function pointerUp(event){
    const gesture=drag;drag=null;
    if(!gesture||gesture.id!==event.pointerId||gesture.moved||Math.abs(scrollY-gesture.scroll)>2||!pointMode||document.querySelector('[role="dialog"]'))return;
    autoIntro=false;inspectYaw=inspectPitch=0;
    controller.command('target',{x:event.clientX-innerWidth/2,y:innerHeight/2-event.clientY});wake();
  }
  let inspection=null;
  function inspectionDown(event){
    if(!ready||controller.state!=='PARKED'||event.button!==0)return;
    inspection={id:event.pointerId,x:event.clientX,y:event.clientY};stage.setPointerCapture(event.pointerId);
  }
  function inspectionMove(event){
    if(!inspection||inspection.id!==event.pointerId)return;
    inspectYaw+=(event.clientX-inspection.x)*.012;
    inspectPitch=clamp(inspectPitch+(event.clientY-inspection.y)*.006,-.18,.45);
    inspection.x=event.clientX;inspection.y=event.clientY;draw();
  }
  function inspectionEnd(){inspection=null;drag=null;}
  const observer=new ResizeObserver(layout);observer.observe(stage);
  addEventListener('resize',layout);document.addEventListener('visibilitychange',visibility);
  document.addEventListener('keydown',keydown);
  document.addEventListener('pointerdown',pointerDown);document.addEventListener('pointermove',pointerMove);
  document.addEventListener('pointerup',pointerUp);document.addEventListener('pointercancel',inspectionEnd);
  stage.addEventListener('pointerdown',inspectionDown);stage.addEventListener('pointermove',inspectionMove);
  stage.addEventListener('pointerup',inspectionEnd);stage.addEventListener('pointercancel',inspectionEnd);
  query.addEventListener('change',reduceMotion);
  function fail(){
    if(disposed)return;autoIntro=false;pointMode=false;ready=false;cancelAnimationFrame(raf);raf=0;
    renderer.domElement.style.display='none';publish();onError();
  }
  renderer.domElement.addEventListener('webglcontextlost',event=>{event.preventDefault();fail();});
  layout();publish();
  new GLTFLoader().load('/models/helicopter.glb',gltf=>{
    if(disposed){disposeObject(gltf.scene);return;}
    helicopter=gltf.scene;mainRotor=helicopter.getObjectByName('Main_Rotor');tailRotor=helicopter.getObjectByName('Tail_Rotor');
    if(!mainRotor||!tailRotor||!helicopter.getObjectByName('Body')){disposeObject(helicopter);fail();return;}
    const materials=new Set();helicopter.traverse(o=>{if(o.isMesh)(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>materials.add(m));});
    for(const m of materials)if(m.name.startsWith('Glass /')){m.transmission=0;m.roughness=.16;m.metalness=.22;m.needsUpdate=true;}
    const bounds=new THREE.Box3().setFromObject(helicopter);modelSize=bounds.getSize(new THREE.Vector3());
    const center=bounds.getCenter(new THREE.Vector3());
    helicopter.position.sub(center);restBounds=bounds.clone();restBounds.min.sub(center);restBounds.max.sub(center);carrier.add(helicopter);
    lights=createPoliceLights(helicopter);effects=createFlightEffects(helicopter,scene,mainRotor);
    ready=true;layout();
    if(autoIntro)controller.command('entrance');else controller.park();
    draw();wake();
  },undefined,fail);
  function disposeObject(object){
    const geometries=new Set(),materials=new Set(),textures=new Set();
    object.traverse(o=>{if(o.geometry)geometries.add(o.geometry);if(o.material)(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>materials.add(m));});
    for(const m of materials){for(const value of Object.values(m))if(value?.isTexture)textures.add(value);m.dispose();}
    geometries.forEach(g=>g.dispose());textures.forEach(t=>t.dispose());
  }
  return {
    command,collapse,layout,
    dispose(){
      if(disposed)return;disposed=true;cancelAnimationFrame(raf);observer.disconnect();
      removeEventListener('resize',layout);document.removeEventListener('visibilitychange',visibility);
      document.removeEventListener('keydown',keydown);query.removeEventListener('change',reduceMotion);
      document.removeEventListener('pointerdown',pointerDown);document.removeEventListener('pointermove',pointerMove);document.removeEventListener('pointerup',pointerUp);
      document.removeEventListener('pointercancel',inspectionEnd);
      stage.removeEventListener('pointerdown',inspectionDown);stage.removeEventListener('pointermove',inspectionMove);stage.removeEventListener('pointerup',inspectionEnd);stage.removeEventListener('pointercancel',inspectionEnd);
      effects?.dispose();disposeObject(scene);environmentMap.dispose();renderer.dispose();renderer.domElement.remove();
    },
  };
}
