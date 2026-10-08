import {test} from 'node:test';
import assert from 'node:assert/strict';
import {isPokerFace} from './public/game-rules.js';
const neutral={eyeLeft:.02,eyeRight:.03,mouth:.01,smile:.04,brow:.05};
test('all displayed scores and absolute tilt must be below 10',()=>{assert.equal(isPokerFace(neutral,0),true);for(const name of Object.keys(neutral)){assert.equal(isPokerFace({...neutral,[name]:.1},0),false);assert.equal(isPokerFace({...neutral,[name]:.096},0),false);}assert.equal(isPokerFace(neutral,-11),false);assert.equal(isPokerFace(neutral,10),false);assert.equal(isPokerFace(neutral,9),true);});
test('missing or invalid signals cannot produce a poker face',()=>{assert.equal(isPokerFace({},0),false);assert.equal(isPokerFace(null,0),false);assert.equal(isPokerFace(neutral,NaN),false);assert.equal(isPokerFace({...neutral,smile:NaN},0),false);});
