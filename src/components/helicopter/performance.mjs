// Declarative sequences. Only HelicopterController may write flight coordinates.
export const PERFORMANCE_NAMES = ['patrol', 'search'];
export function performanceSteps(name, c) {
  const p = (x, y) => c.bound({x:c.width*x, y:c.height*y}, false);
  const move = (x,y,speed=270,pitch=0) => ({kind:'move',point:p(x,y),speed,pitch});
  const wait = seconds => ({kind:'wait',seconds});
  const turn = yaw => ({kind:'turn',yaw});
  const effect = value => ({kind:'effect',value});
  const takeoff = {kind:'takeoff'}, home = {kind:'return'};
  const routes = {
    patrol:[takeoff,move(-.29,.10,220),turn(Math.PI-.42),move(.29,.10,220),move(.12,.27,180),wait(2),move(-.20,.19,220),home],
    search:[takeoff,effect({search:true,scan:true}),move(-.25,.12,125),move(.23,.17,125),wait(3),turn(.42),wait(2),effect({search:false,scan:false}),home]
  };
  return routes[name] || null;
}
export class PerformanceSequencer {
  constructor(steps, epoch) { this.steps=steps; this.epoch=epoch; this.index=0; this.started=false; this.elapsed=0; this.result='running'; }
  cancel(result='cancelled') { this.result=result; }
  update(c,dt) {
    if(this.result!=='running'||c.taskEpoch!==this.epoch)return;
    const step=this.steps[this.index];
    if(!step){this.result='completed';return;}
    if(!this.started) {
      this.started=true;this.elapsed=0;
      if(step.kind==='effect'){Object.assign(c.taskEffects,step.value);this.next();return;}
      if(step.kind==='takeoff'){if(c.state==='PARKED'){c.takeoffSpeed=step.speed??85;c.takeoffDelay=step.delay??.7;c.rotorAcceleration=step.rotorAcceleration??2.6;c.depart({kind:'hover'});}}
      if(step.kind==='move'){c.moveSpeed=step.speed;c.pitchTarget=step.pitch;c.depart({kind:'target',point:step.point});}
      if(step.kind==='turn'){c.vx=c.vy=0;c.goal=null;c.setState('HOVERING');c.headingTarget=step.yaw;}
      if(step.kind==='wait'){c.vx=c.vy=0;c.pitchTarget=0;c.setState('HOVERING');}
      if(step.kind==='return'){c.taskEffects={};c.pitchTarget=0;c.beginReturn();}
    }
    this.elapsed+=dt;
    const complete = step.kind==='takeoff' ? c.state==='HOVERING'
      : step.kind==='move' ? c.state==='HOVERING' && !c.goal
      : step.kind==='wait' ? this.elapsed>=step.seconds
      : step.kind==='turn' ? this.elapsed>=1.2 && Math.abs(c.yaw-step.yaw)<.04
      : step.kind==='return' ? c.state==='PARKED' : false;
    if(complete)this.next();
  }
  next(){this.index++;this.started=false;this.elapsed=0;if(this.index>=this.steps.length)this.result='completed';}
  snapshot(){return {index:this.index,total:this.steps.length,kind:this.steps[this.index]?.kind||null,result:this.result};}
}
