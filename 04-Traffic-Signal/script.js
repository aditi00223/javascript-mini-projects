const states = [
  { name: 'red',    cls: 'on-red',    off: 'off-red',    color: '#ff3b30', dur: 5 },
  { name: 'green',  cls: 'on-green',  off: 'off-green',  color: '#30d158', dur: 4 },
  { name: 'yellow', cls: 'on-yellow', off: 'off-yellow', color: '#ffd60a', dur: 2 },
];

const lights  = {
  red:    document.getElementById('l-red'),
  yellow: document.getElementById('l-yellow'),
  green:  document.getElementById('l-green'),
};
const label   = document.getElementById('state-label');
const bar     = document.getElementById('timer-bar');
const txt     = document.getElementById('timer-txt');
const autoBtn = document.getElementById('auto-btn');

let cur = 0, remaining = 0, autoMode = true;
let interval = null, barInterval = null;

function apply(idx) {
  const s = states[idx];
  Object.keys(lights).forEach(k => {
    lights[k].className = 'light ' + (k === s.name ? s.cls : states.find(x => x.name === k).off);
  });
  label.textContent = s.name.charAt(0).toUpperCase() + s.name.slice(1);
  label.style.color = s.color;
  bar.style.background = s.color;
}

function startTimer(duration) {
  clearTimeout(interval);
  clearInterval(barInterval);
  remaining = duration;

  bar.style.transition = 'none';
  bar.style.width = '100%';
  txt.textContent = remaining + 's remaining';

  setTimeout(() => { bar.style.transition = 'width 1s linear'; }, 50);

  barInterval = setInterval(() => {
    remaining--;
    bar.style.width = Math.max(0, (remaining / duration) * 100) + '%';
    txt.textContent = remaining + 's remaining';
    if (remaining <= 0) clearInterval(barInterval);
  }, 1000);

  if (autoMode) {
    interval = setTimeout(() => {
      cur = (cur + 1) % states.length;
      apply(cur);
      startTimer(states[cur].dur);
    }, duration * 1000);
  }
}

function manual(name) {
  autoMode = false;
  autoBtn.textContent = 'Auto off';
  autoBtn.classList.remove('active-btn');
  clearTimeout(interval);
  clearInterval(barInterval);
  cur = states.findIndex(s => s.name === name);
  apply(cur);
  bar.style.width = '100%';
  txt.textContent = 'Manual mode';
}

function toggleAuto() {
  autoMode = !autoMode;
  autoBtn.textContent = autoMode ? 'Auto on' : 'Auto off';
  autoBtn.classList.toggle('active-btn', autoMode);
  if (autoMode) {
    startTimer(states[cur].dur);
  } else {
    clearTimeout(interval);
    clearInterval(barInterval);
    txt.textContent = 'Paused';
  }
}

apply(cur);
startTimer(states[cur].dur);