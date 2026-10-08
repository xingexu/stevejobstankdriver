// Game score: mean of the five displayed percentages and absolute head tilt.
export function averageSignals(values,tilt){
 const names=['eyeLeft','eyeRight','mouth','smile','brow'];
 if(!Number.isFinite(tilt)||!names.every(name=>Number.isFinite(values?.[name])&&values[name]>=0&&values[name]<=1))return null;
 return (names.reduce((sum,name)=>sum+Math.round(values[name]*100),0)+Math.abs(Math.round(tilt)))/6;
}
export function isPokerFace(values,tilt){const average=averageSignals(values,tilt);return average!==null&&average<=30;}
