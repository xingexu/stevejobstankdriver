# Tank Driving 101

A tank-interior-inspired live face dashboard. No simulation, history or recording.

## Start

Install Node.js 20+ if needed. Double-click Start Dashboard.command in Finder, or run:

```sh
npm install
npm start
```

Open http://localhost:3000 and click Try now. Allow camera access for localhost. Chrome or Edge is recommended. The face model is included; runtime and WASM are supplied by the pinned official @mediapipe/tasks-vision package. After npm install, face tracking needs no internet connection.

The dashboard measures left/right eye closure, jaw opening, mouth-corner movement, inner brow raise and head roll. Landmark overlay follows the actual camera face; readouts remain blank without a detected face. Percentages are model coefficients, not emotion or fatigue probabilities. Head roll is a geometric estimate from the outer eye landmarks. Tracking is limited to one face. Glasses, occlusion and lighting can affect results. Sustained eye closure over 70% for two seconds changes the status indicator.

Frames and measurements stay in the browser. No upload, persistence, face recognition or session API. Local Node server listens only on 127.0.0.1. This is a training prototype, not certified for vehicle operation or fitness assessments.

MediaPipe: https://ai.google.dev/edge/mediapipe/solutions/vision/face_landmarker/web_js

## Tank Driver 101 challenge

Enter the driver station to start the animated periscope terrain and synthesized engine audio. Try now requests camera permission and loads the face model before entering the dashboard. There is one 30-second challenge with frequent random distractions. No separate camera-start button or level selector.

Poker Face requires the mean of all six displayed trackers to stay at 30 or below for a continuous 30 seconds. Five facial percentages and absolute head tilt in degrees are averaged as game values. The current average is displayed. Any score above 30, missing face, hidden tab or sample gap over 500 ms resets the hold. These are game rules, not an emotion or fitness assessment.

The supplied duck image randomly appears inside the periscope with a synthesized triple quack. Synthetic gunshot bursts produce a short recoil effect. All sound is created locally with Web Audio; volume defaults to 35%, with mute and motion controls. Reduced-motion preferences are respected. Audio pauses when the page is hidden. No history or recording is added.

Run `node --test game-rules.test.mjs` for threshold and missing-signal checks.
