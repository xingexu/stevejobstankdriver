import {test} from 'node:test';
import assert from 'node:assert/strict';
import {averageSignals,isPokerFace} from './public/game-rules.js';
const signals=value=>({eyeLeft:value,eyeRight:value,mouth:value,smile:value,brow:value});
test('average includes all six trackers, with absolute head tilt',()=>{assert.equal(averageSignals(signals(.3),30),30);assert.equal(averageSignals(signals(.3),-30),30);assert.equal(isPokerFace(signals(.3),30),true);assert.equal(isPokerFace(signals(.3),31),false);assert.equal(isPokerFace({...signals(.1),smile:1},0),true);});
test('missing or invalid trackers cannot qualify',()=>{for(const values of [null,{}, {...signals(.1),mouth:NaN}, {...signals(.1),mouth:1.1}]){assert.equal(averageSignals(values,0),null);assert.equal(isPokerFace(values,0),false);}assert.equal(isPokerFace(signals(.1),NaN),false);});
