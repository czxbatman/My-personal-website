import * as THREE from 'three';

// All emitters come from the Blender asset; no lights float beside the aircraft.
export function createPoliceLights(helicopter) {
  const materials = { red:new Set(), blue:new Set() }, emitters = [];
  helicopter.traverse(object => {
    if (!object.isMesh) return;
    const list = Array.isArray(object.material) ? object.material : [object.material];
    const color = list.some(m => m.name === 'Police_Light_Red') ? 'red'
      : list.some(m => m.name === 'Police_Light_Blue') ? 'blue' : null;
    if (!color) return;
    list.filter(m => m.name === `Police_Light_${color === 'red' ? 'Red' : 'Blue'}`)
      .forEach(m => { materials[color].add(m); m.emissiveIntensity = 0; });
    emitters.push({ object, color });
  });

  const canvas = document.createElement('canvas'); canvas.width = canvas.height = 64;
  const ctx = canvas.getContext('2d'), gradient = ctx.createRadialGradient(32,32,0,32,32,32);
  gradient.addColorStop(0,'rgba(255,255,255,0.85)');
  gradient.addColorStop(.22,'rgba(255,255,255,0.45)');
  gradient.addColorStop(.55,'rgba(255,255,255,0.10)');
  gradient.addColorStop(1,'rgba(255,255,255,0)');
  ctx.fillStyle = gradient; ctx.fillRect(0,0,64,64);
  const texture = new THREE.CanvasTexture(canvas);
  const glow = {};
  for (const [color, hex] of [['red',0xff2440],['blue',0x1875ff]]) {
    glow[color] = new THREE.SpriteMaterial({map:texture,color:hex,transparent:true,
      depthWrite:false,opacity:0,toneMapped:false});
  }
  for (const emitter of emitters) {
    const {object,color} = emitter;
    object.geometry.computeBoundingBox();
    const center = object.geometry.boundingBox.getCenter(new THREE.Vector3());
    const sprite = new THREE.Sprite(glow[color]); sprite.position.copy(center);
    sprite.scale.set(.62,.62,1); sprite.visible = false; object.add(sprite);
    const light = new THREE.PointLight(color === 'red' ? 0xff1230 : 0x166dff,0,1.5,2);
    light.position.copy(center); object.add(light);
    Object.assign(emitter,{sprite,light});
  }
  let snapshot = {active:false,red:0,blue:0,emitters:emitters.length};
  return {
    update(seconds, active) {
      const phase = seconds % 1.2;
      const red = active && (phase < .10 || (phase >= .18 && phase < .28)) ? 1 : 0;
      const blue = active && ((phase >= .50 && phase < .60) || (phase >= .68 && phase < .78)) ? 1 : 0;
      for (const [color,pulse] of [['red',red],['blue',blue]]) {
        for (const material of materials[color]) material.emissiveIntensity = pulse * 5.5;
        glow[color].opacity = pulse * .76;
      }
      for (const emitter of emitters) {
        const pulse = emitter.color === 'red' ? red : blue;
        emitter.sprite.visible = !!pulse; emitter.light.intensity = pulse * 1.15;
      }
      snapshot = {active:!!active,red,blue,emitters:emitters.length,peakEmissive:5.5,peakGlow:.76,peakLight:1.15};
    },
    snapshot:() => ({...snapshot})
  };
}
