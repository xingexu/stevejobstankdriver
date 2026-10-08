export function isPokerFace(values,tilt){
 const names=['eyeLeft','eyeRight','mouth','smile','brow'];
 return Number.isFinite(tilt)&&Math.abs(Math.round(tilt))<10&&names.every(name=>Number.isFinite(values?.[name])&&values[name]>=0&&Math.round(values[name]*100)<10);
}
