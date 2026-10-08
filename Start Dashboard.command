#!/bin/zsh
cd "${0:A:h}"
if ! command -v node >/dev/null 2>&1; then
  print 'Node.js 20+ is required. Install it from https://nodejs.org, then open this launcher again.'
  read '?Press Enter to close.'
  exit 1
fi
if [[ ! -d node_modules/@mediapipe/tasks-vision ]]; then
  npm install || exit 1
fi
if curl -fsS http://localhost:3000/ | head -c 500 | grep -q 'Tank Driving 101'; then
  open 'http://localhost:3000'
  exit 0
fi
npm start &
dashboard_pid=$!
trap 'kill "$dashboard_pid" 2>/dev/null' EXIT INT TERM
for attempt in {1..30}; do
  if curl -fsS http://localhost:3000/ >/dev/null 2>&1; then
    open 'http://localhost:3000'
    break
  fi
  sleep 0.2
done
wait "$dashboard_pid"
