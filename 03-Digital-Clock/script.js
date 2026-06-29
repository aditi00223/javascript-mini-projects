let format = 12;

function setFormat(f) {
  format = f;
  document.getElementById('btn12').classList.toggle('active', f === 12);
  document.getElementById('btn24').classList.toggle('active', f === 24);
  document.getElementById('ampm').style.display = f === 12 ? '' : 'none';
  tick();
}

function pad(n) {
  return String(n).padStart(2, '0');
}

const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

let colonVisible = true;

function tick() {
  const now = new Date();
  const d = now.getDay(), mo = now.getMonth(), dt = now.getDate(), yr = now.getFullYear();

  document.getElementById('date').textContent =
    `${days[d]}, ${pad(dt)} ${months[mo]} ${yr}`;

  let h = now.getHours(), ampm = '';
  if (format === 12) {
    ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
  }

  document.getElementById('hours').textContent = pad(h);
  document.getElementById('minutes').textContent = pad(now.getMinutes());
  document.getElementById('seconds').textContent = pad(now.getSeconds());
  document.getElementById('ampm').textContent = ampm;

  colonVisible = !colonVisible;
  document.getElementById('colon').style.opacity = colonVisible ? '0.4' : '0.1';
}

setFormat(12);
tick();
setInterval(tick, 1000);