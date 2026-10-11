import {PerformanceSequencer,performanceSteps} from './performance.mjs';
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const damp=(a,b,rate,dt)=>a+(b-a)*(1-Math.exp(-rate*dt));
// The controller is the sole owner of flight coordinates (DIP, centred, Y up).
export class HelicopterController {
  constructor(width,height,dock='right') {
    Object.assign(this,{width,height,dock,state:'PARKED',visible:true,elapsed:0,x:0,y:0,vx:0,vy:0,
      roll:0,yaw:Math.PI-.42,pitch:0,rotor:0,timer:0,transitions:0,taskEpoch:0,activity:null,
      sequence:null,taskEffects:{},lastOutcome:null,moveSpeed:270,takeoffSpeed:85,takeoffDelay:.7,rotorAcceleration:2.6});this.park();
  }
  get modelWidth(){return Math.min(280,this.width*.27,this.height*.65);}
  get padX(){return this.modelWidth*.62+14;}
  get padY(){return this.modelWidth*.21+6;}
  get home(){return {x:(this.dock==='left'?-1:1)*Math.max(0,this.width/2-this.padX-(this.dock==='right'?this.modelWidth*.16:0)),y:-Math.max(0,this.height/2-this.padY)};}
  get aboveHome(){return this.bound({x:this.home.x,y:this.home.y+100},false);}
  bound(p,following=this.state==='FOLLOWING'){
    const x=Math.max(0,this.width/2-(following?0:this.padX)),y=Math.max(0,this.height/2-(following?0:this.padY));return {x:clamp(p.x,-x,x),y:clamp(p.y,-y,y)};
  }
  setState(state){if(this.state!==state){this.state=state;this.transitions++;}}
  cancelTask(result='cancelled',keepEffects=false){
    this.taskEpoch++;this.sequence?.cancel(result);this.sequence=null;this.activity=null;
    this.goal=this.target=this.paused=null;this.knowledgeRequest=null;this.headingTarget=null;this.pitchTarget=0;this.moveSpeed=270;
    this.takeoffSpeed=85;this.takeoffDelay=.7;this.rotorAcceleration=2.6;
    this.lastOutcome=result;if(!keepEffects)this.taskEffects={};
  }
  park(){
    Object.assign(this,this.home,{vx:0,vy:0,rotor:0,roll:0,pitch:0,timer:0,goal:null,paused:null,target:null,holdPoint:null,arriving:false,renderedPose:null});
    this.yaw=this.dock==='right'?.42:Math.PI-.42;this.setState('PARKED');if(!this.sequence){this.activity=null;this.taskEffects={};}
  }
  resize(width,height){
    this.cancelTask();this.width=width;this.height=height;
    if(this.state==='PARKED'||!this.visible)this.park();else {Object.assign(this,this.bound(this,false));this.vx=this.vy=0;this.holdPoint={x:this.x,y:this.y};this.renderedPose=null;this.setState('HOLDING');}
  }
  recordRenderedPose(x,y){this.renderedPose={x,y};}
  startEntrance(){this.cancelTask();this.activity='entrance';this.timer=0;this.rotor=1;this.yaw=Math.PI-.42;this.roll=0;this.arriving=true;this.holdPoint=null;this.setState('ENTERING');this.placeEntrance();}
  placeEntrance(){const t=Math.min(1,this.timer/3.6),start=-this.width/2-this.modelWidth*.8;this.x=start*(1-t*t*(3-2*t));this.y=0;this.vx=-start*6*t*(1-t)/3.6;this.vy=0;}
  depart(goal){
    this.goal=goal;this.paused=this.holdPoint=null;this.headingTarget=null;
    if(this.state==='PARKED'){this.timer=0;this.takeoffPoint=this.bound({x:this.x,y:this.y+(this.activity==='avoidance'?40:100)},false);this.setState('TAKING_OFF');}else if(this.state!=='TAKING_OFF')this.activateGoal();
  }
  activateGoal(){
    if(this.goal?.kind==='target'){this.target=this.bound(this.goal.point,false);this.setState('FLYING');}
    else if(this.goal?.kind==='follow')this.setState('FOLLOWING');else {this.goal=null;this.setState('HOVERING');}
  }
  holdCurrentState(){
    if(!this.visible||['PARKED','HOLDING'].includes(this.state))return;
    const pose=this.renderedPose||{x:this.x,y:this.y+this.snapshot().bob};this.cancelTask('held',true);
    Object.assign(this,pose);this.vx=this.vy=0;this.holdPoint={...pose};this.taskEffects.scan=false;this.taskEffects.alert=false;this.setState('HOLDING');
  }
  beginReturn(){
    this.holdPoint=null;this.goal=this.paused=this.target=null;this.headingTarget=null;this.pitchTarget=0;
    if(['RETURNING','LANDING'].includes(this.state))return;
    if(this.state==='PARKED'&&Math.hypot(this.x-this.home.x,this.y-this.home.y)<1)return;
    if(this.state==='PARKED'){this.depart({kind:'return'});return;}this.setState('RETURNING');
  }
  abortAndReturnHome(){
    if(!this.visible)return;if(['RETURNING','LANDING'].includes(this.state)){if(this.activity!=='return'){this.cancelTask();this.activity='return';}this.taskEffects={};return;}
    if(this.state==='PARKED'&&Math.hypot(this.x-this.home.x,this.y-this.home.y)<1){this.cancelTask();return;}
    this.cancelTask();this.activity='return';this.beginReturn();
  }
  startPerformance(name){
    if(!this.visible||this.activity==='performance/'+name)return;const steps=performanceSteps(name,this);if(!steps)return;
    this.cancelTask();this.holdPoint=null;this.activity='performance/'+name;this.sequence=new PerformanceSequencer(steps,this.taskEpoch);this.sequence.update(this,0);
  }
  command(type,data={}){
    if(type==='hide'){this.cancelTask();this.visible=false;this.park();return;}
    if(type==='show'){if(!this.visible)this.park();this.visible=true;return;}
    if(type==='dock'&&['left','right'].includes(data.side)){
      if(this.dock===data.side)return;this.cancelTask();this.dock=data.side;
      if(!this.visible)this.park();else {if(['RETURNING','LANDING'].includes(this.state))this.setState('HOVERING');this.activity='return';this.beginReturn();}return;
    }
    if(!this.visible)return;
    if(type==='pointer'&&Number.isFinite(data.x)&&Number.isFinite(data.y)){this.pointer={x:data.x,y:data.y};return;}
    if(type==='hold'){this.holdCurrentState();return;}if(type==='return'){this.abortAndReturnHome();return;}
    if(type==='performance'){this.startPerformance(data.name);return;}
    if(type==='entrance'&&this.state==='PARKED'){this.startEntrance();return;}
    if(type==='hover'){
      if(['PARKED','HOVERING'].includes(this.state))return;this.paused=['RETURNING','LANDING'].includes(this.state)?{kind:'return'}:this.goal;this.goal=null;this.setState('HOVERING');return;
    }
    if(type==='resume'&&this.state==='HOVERING'&&this.paused){const goal=this.paused;this.paused=null;goal.kind==='return'?this.beginReturn():this.depart(goal);return;}
    if(type==='follow'){
      if(this.goal?.kind==='follow')return;this.cancelTask();this.activity='follow';this.pointer={x:this.x,y:this.y};this.followFacing=this.yaw>Math.PI/2?1:-1;this.depart({kind:'follow'});return;
    }
    if(type==='takeoff'){if(this.state==='PARKED'){this.cancelTask();this.activity='flight';this.depart({kind:'hover'});}return;}
    if(['target','knowledge'].includes(type)&&Number.isFinite(data.x)&&Number.isFinite(data.y)){
      this.cancelTask();this.activity=type==='knowledge'?'knowledge':'flight';this.knowledgeRequest=type==='knowledge'?data.requestId:null;this.moveSpeed=270;this.depart({kind:'target',point:this.bound(data,false)});
    }
  }
  move(point,dt,speed=270){
    point=this.bound(point,false);const dx=point.x-this.x,dy=point.y-this.y,distance=Math.hypot(dx,dy),desired=Math.min(speed,distance*2.1);
    this.vx=damp(this.vx,distance?dx/distance*desired:0,5,dt);this.vy=damp(this.vy,distance?dy/distance*desired:0,5,dt);
    // Bound the destination, never snap the current edge/offscreen position.
    this.x+=this.vx*dt;this.y+=this.vy*dt;
    if(distance<1.2&&Math.hypot(this.vx,this.vy)<4){Object.assign(this,point);this.vx=this.vy=0;this.arriving=false;return true;}return false;
  }
  followPointer(dt, point = this.pointer) {
    const target = this.bound(point, true), response = 7, speed = 560;
    // A bounded look-ahead keeps distant pursuit quick without a speed spike.
    // Close to the pointer, the same spring converges to its exact position.
    const steps = Math.max(1, Math.ceil(dt * 120)), step = dt / steps;
    const decay = Math.exp(-response * step);
    for (let i = 0; i < steps; i++) {
      const dx = target.x - this.x, dy = target.y - this.y, distance = Math.hypot(dx, dy);
      if (distance < .025) {
        this.x = target.x; this.y = target.y; this.vx = this.vy = 0;
        break;
      }
      const reach = Math.min(1, speed * 2 / (response * distance));
      const advance = (delta, velocity) => {
        // Discard momentum away from a newly moved pointer and limit inward
        // momentum so the critically damped step cannot cross a fixed target.
        const sign = Math.sign(delta);
        velocity = sign * clamp(velocity * sign, 0, response * Math.abs(delta));
        return {
          move: delta * (1 - (1 + response * step) * decay) + velocity * step * decay,
          velocity: (velocity + (response * delta - velocity) * response * step) * decay
        };
      };
      const x = advance(dx * reach, this.vx), y = advance(dy * reach, this.vy);
      const motionScale = Math.min(1, speed * step / (Math.hypot(x.move, y.move) || 1));
      const velocityScale = Math.min(1, speed / (Math.hypot(x.velocity, y.velocity) || 1));
      this.x += x.move * motionScale; this.y += y.move * motionScale;
      this.vx = x.velocity * velocityScale; this.vy = y.velocity * velocityScale;
    }
    if (this.x >= -this.width / 2) this.arriving = false;
  }

  update(dt){
    if(!this.visible)return this.snapshot();dt=clamp(dt,0,.05);this.elapsed+=dt;
    if(this.state==='ENTERING'){this.timer+=dt;this.placeEntrance();if(this.timer>=3.6){this.x=this.y=this.vx=this.vy=0;this.arriving=false;this.timer=0;this.setState('INTRO_HOLD');}}
    else if(this.state==='INTRO_HOLD'){this.timer+=dt;if(this.timer>=1.1){this.timer=0;this.setState('RETURNING');}}
    else if(this.state==='TAKING_OFF'){this.timer+=dt;if(this.timer>this.takeoffDelay&&this.move(this.takeoffPoint,dt,this.takeoffSpeed)){if(this.goal?.kind==='return'){this.goal=null;this.setState('RETURNING');}else this.activateGoal();}}
    else if(this.state==='FLYING'){if(this.move(this.target,dt,this.moveSpeed)){this.goal=null;this.setState('HOVERING');}}
    else if(this.state==='FOLLOWING')this.followPointer(dt);
    else if(this.state==='RETURNING'){if(this.move(this.aboveHome,dt)){this.timer=0;this.setState('LANDING');}}
    else if(this.state==='LANDING'){if(this.move(this.home,dt,48)){this.timer+=dt;if(this.timer>1.8)this.park();}}
    else if(this.state==='HOVERING'){this.vx=damp(this.vx,0,7,dt);this.vy=damp(this.vy,0,7,dt);this.x+=this.vx*dt;this.y+=this.vy*dt;}
    this.sequence?.update(this,dt);
    if(this.sequence?.result==='completed'){this.sequence=null;this.activity=null;this.taskEffects={};this.lastOutcome='completed';}
    const rotorTarget=this.state==='PARKED'||(this.state==='LANDING'&&this.timer>0)?0:1;this.rotor=damp(this.rotor,rotorTarget,rotorTarget?this.rotorAcceleration:2,dt);
    this.roll=damp(this.roll,-this.vx/270*.10,4,dt);this.pitch=damp(this.pitch,this.pitchTarget||0,4,dt);let heading=this.headingTarget??this.yaw;
    if(this.state==='FOLLOWING'){const dx=this.pointer.x-this.x;if(Math.abs(dx)>8)this.followFacing=Math.sign(dx);heading=this.followFacing>0?Math.PI-.42:.42;}
    else if(this.headingTarget==null&&Math.abs(this.vx)>8)heading=this.vx>0?Math.PI-.42:.42;
    if(['LANDING','PARKED'].includes(this.state))heading=this.dock==='right'?.42:Math.PI-.42;this.yaw=damp(this.yaw,heading,3,dt);return this.snapshot();
  }
  snapshot(){
    const bob=!this.holdPoint&&!['knowledge','avoidance'].includes(this.activity)&&['FLYING','HOVERING','RETURNING'].includes(this.state)?Math.sin(this.elapsed*1.7)*2.2:0;
    return {state:this.state,visible:this.visible,dock:this.dock,home:this.home,x:this.x,y:this.y,vx:this.vx,vy:this.vy,roll:this.roll,yaw:this.yaw,pitch:this.pitch,rotor:this.rotor,bob,
      canResume:!!this.paused,transitions:this.transitions,goal:this.goal?.kind||null,followFacing:this.followFacing||0,holdPoint:this.holdPoint?{...this.holdPoint}:null,
      taskEpoch:this.taskEpoch,activity:this.activity,knowledgeRequest:this.knowledgeRequest,sequence:this.sequence?.snapshot()||null,activeTaskCount:this.activity?1:0,taskEffects:{...this.taskEffects},lastOutcome:this.lastOutcome,modelWidth:this.modelWidth};
  }
}
