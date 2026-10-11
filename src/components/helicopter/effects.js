import * as THREE from 'three';
// All effects share the aircraft RAF. No timers, external textures or desktop capture.
export function createFlightEffects(helicopter,scene,mainRotor) {
  const group=new THREE.Group();group.name='V5_Flight_Effects';helicopter.add(group);
  const texture=(stops)=>{const c=document.createElement('canvas');c.width=c.height=64;const ctx=c.getContext('2d'),g=ctx.createRadialGradient(32,32,0,32,32,32);for(const [p,v] of stops)g.addColorStop(p,v);ctx.fillStyle=g;ctx.fillRect(0,0,64,64);return new THREE.CanvasTexture(c);};
  const glow=texture([[0,'#fff'],[.2,'#fff'],[1,'#fff0']]);
  const modelNode=name=>helicopter.getObjectByName(THREE.PropertyBinding.sanitizeNodeName(name));
  // Use existing lens meshes, never detached red/green marker sprites.
  const lensMaterials=names=>names.flatMap(name=>{
    const object=modelNode(name);if(!object?.isMesh)return [];
    const originals=Array.isArray(object.material)?object.material:[object.material];
    const cloned=originals.map(m=>{const clone=m.clone();clone.emissive.copy(clone.color);clone.emissiveIntensity=0;return clone;});
    object.material=Array.isArray(object.material)?cloned:cloned[0];return cloned;
  });
  const nav=lensMaterials(['Port / navigation lens','Starboard / navigation lens']);
  const beacon=lensMaterials(['Tail / position light 1','Tail / position light -1']);
  const landing=lensMaterials(['Nose / landing light lens 1','Nose / landing light lens -1']);
  const search=new THREE.Group();
  const searchLens=modelNode('Searchlight / optical lens');
  if(searchLens?.geometry){
    helicopter.updateWorldMatrix(true,true);searchLens.geometry.computeBoundingBox();
    const mount=searchLens.geometry.boundingBox.getCenter(new THREE.Vector3());
    search.position.copy(helicopter.worldToLocal(searchLens.localToWorld(mount)));
  }else search.position.set(-1.3,1.05,0);
  group.add(search);
  const lens=new THREE.Sprite(new THREE.SpriteMaterial({map:glow,color:0xfff0c6,transparent:true,depthWrite:false,toneMapped:false}));lens.scale.setScalar(.32);search.add(lens);
  const cone=new THREE.Mesh(new THREE.ConeGeometry(3.1,8,20,1,true),new THREE.MeshBasicMaterial({color:0xffecc3,transparent:true,opacity:.055,depthWrite:false,side:THREE.DoubleSide}));cone.position.y=-4;search.add(cone);
  const blur=new THREE.Mesh(new THREE.RingGeometry(.6,5.3,48),new THREE.MeshBasicMaterial({color:0xb8c9cc,transparent:true,opacity:.045,side:THREE.DoubleSide,depthWrite:false}));blur.rotation.x=Math.PI/2;blur.position.copy(mainRotor.position);helicopter.add(blur);
  const shadow=new THREE.Sprite(new THREE.SpriteMaterial({map:glow,color:0x17242d,transparent:true,opacity:.22,depthWrite:false}));shadow.position.z=-30;scene.add(shadow);
  const dust=new THREE.Mesh(new THREE.RingGeometry(.85,1,48),new THREE.MeshBasicMaterial({color:0xb9d7dc,transparent:true,opacity:0,depthWrite:false,side:THREE.DoubleSide}));dust.position.z=-20;scene.add(dust);
  const positions=new Float32Array(24*3),geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.BufferAttribute(positions,3));geometry.setDrawRange(0,0);
  const trail=new THREE.Line(geometry,new THREE.LineBasicMaterial({color:0x95c9dc,transparent:true,opacity:0,depthWrite:false}));trail.frustumCulled=false;scene.add(trail);
  let settings={search:false,navigation:true,enhanced:false},clock=0,scanAngle=0,count=0,trailOpacity=0,epoch=-1,snapshot={};
  return {
    configure(value){settings={...settings,...value};},
    update(dt,motion) {
      const flying=motion.state!=='PARKED'&&motion.visible,held=motion.state==='HOLDING',task=motion.taskEffects||{};clock+=dt;
      const enabled=flying&&settings.search;
      if(task.scan&&!held)scanAngle=Math.sin(clock*.8)*.30;
      if(!enabled)scanAngle=0;
      search.visible=enabled;search.rotation.z=scanAngle;
      for(const material of nav)material.emissiveIntensity=flying&&settings.navigation?1.4:0;
      for(const material of beacon)material.emissiveIntensity=flying&&settings.navigation&&(clock%1.4<.12)?2:0;
      const landingActive=flying&&['TAKING_OFF','RETURNING','LANDING'].includes(motion.state);
      for(const material of landing)material.emissiveIntensity=landingActive?2:0;
      blur.visible=flying&&motion.rotor>.45;blur.material.opacity=.045*motion.rotor;
      const height=Math.max(0,motion.y-motion.home.y),proximity=Math.max(0,1-height/190);
      shadow.visible=motion.visible&&proximity>0;shadow.position.set(motion.x,motion.home.y-motion.modelWidth*.19,-30);shadow.scale.set(motion.modelWidth*.70,motion.modelWidth*.12,1);shadow.material.opacity=.18*proximity;
      const ring=1+(clock%1)*.6;dust.visible=flying&&settings.enhanced&&proximity>.2;dust.position.set(motion.x,motion.home.y-motion.modelWidth*.18,-20);dust.scale.set(75*ring,14*ring,1);dust.material.opacity=.11*proximity*(1-clock%1);
      if(epoch!==motion.taskEpoch){epoch=motion.taskEpoch;if(!held){count=0;trailOpacity=0;geometry.setDrawRange(0,0);}}
      const trailing=settings.enhanced&&flying&&!held&&Math.hypot(motion.vx,motion.vy)>100;
      if(trailing){positions.copyWithin(3,0,69);positions[0]=motion.x;positions[1]=motion.y+motion.bob;positions[2]=-5;count=Math.min(24,count+1);trailOpacity=.22;}
      else trailOpacity=settings.enhanced?Math.max(0,trailOpacity-dt*.5):0;
      if(trailOpacity===0)count=0;geometry.attributes.position.needsUpdate=true;geometry.setDrawRange(0,count);trail.material.opacity=trailOpacity;
      snapshot={search:enabled,scanning:enabled&&!!task.scan&&!held,scanAngle,navigation:flying&&settings.navigation,rotorBlur:blur.visible,landingLight:landingActive,
        landingShadow:shadow.visible,trailPoints:count,temporaryCount:(enabled&&task.search?1:0)+(count?1:0),enhanced:settings.enhanced,
        addedRedGreenMarkers:0,searchMount:search.position.toArray(),searchMountNode:searchLens?.name||null,searchDirection:'down',navigationLensCount:nav.length};
    },
    snapshot:()=>({...snapshot}),
    dispose(){group.removeFromParent();blur.removeFromParent();for(const o of [shadow,dust,trail])o.removeFromParent();
      group.traverse(o=>{o.geometry?.dispose();o.material?.dispose();});for(const o of [blur,shadow,dust,trail]){o.geometry?.dispose();o.material?.dispose();}glow.dispose();}
  };
}
