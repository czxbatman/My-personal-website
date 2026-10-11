import assert from 'node:assert/strict';
import {WebHelicopterController} from '../src/components/helicopter/engine.mjs';

function advance(controller,condition){
  for(let i=0;i<8000&&!condition();i++)controller.update(.05);
  assert.ok(condition(),JSON.stringify(controller.snapshot()));
}

for(const [width,height,size] of [[1440,1000,600],[1280,800,520],[390,844,322]]){
  const c=new WebHelicopterController(width,height);
  c.setDock({x:width*.25,y:0},size);
  c.command('entrance');advance(c,()=>c.state==='INTRO_HOLD');
  c.command('performance',{name:'patrol'});advance(c,()=>c.state==='PARKED'&&c.sequence===null);
  c.command('performance',{name:'search'});advance(c,()=>c.state==='PARKED'&&c.sequence===null);
  c.command('takeoff');advance(c,()=>c.state==='HOVERING');
  c.command('target',{x:-width*.2,y:height*.2});advance(c,()=>c.state==='HOVERING');
  c.recordRenderedPose(c.x,c.y);c.command('hold');
  const point={x:c.x,y:c.y};for(let i=0;i<30;i++)c.update(.05);
  assert.equal(c.x,point.x);assert.equal(c.y,point.y);
  c.command('performance',{name:'patrol'});c.update(.05);
  c.command('target',{x:0,y:0});assert.equal(c.sequence,null);
  c.command('return');advance(c,()=>c.state==='PARKED');
  c.resize(width-30,height-20);c.setDock({x:0,y:0},size*.7);
  assert.deepEqual({x:c.x,y:c.y},c.home);
  console.log(`HELICOPTER_PASS ${width}x${height}: entry, patrol, search, hold, takeover, return, resize`);
}
