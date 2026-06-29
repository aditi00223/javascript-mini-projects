const items = ['stone', 'paper', 'scissors'];
const emoji = { stone: '✊', paper: '✋', scissors: '✌️' };
const beats  = { stone: 'scissors', paper: 'stone', scissors: 'paper' };
const scores = { you: 0, cpu: 0, draw: 0 };
let busy = false;

function play(choice) {
  if (busy) return;
  busy = true;

  const hYou = document.getElementById('h-you');
  const hCpu = document.getElementById('h-cpu');
  const res  = document.getElementById('result');

  hYou.textContent = '🤜';
  hCpu.textContent = '🤛';
  hYou.classList.add('shake');
  hCpu.classList.add('shake');
  res.className = 'result-banner idle';
  res.textContent = '...';

  setTimeout(() => {
    const cpu = items[Math.floor(Math.random() * 3)];
    hYou.textContent = emoji[choice];
    hCpu.textContent = emoji[cpu];
    hYou.classList.remove('shake');
    hCpu.classList.remove('shake');

    let outcome, cls;
    if (choice === cpu) {
      outcome = 'Draw!';      cls = 'draw'; scores.draw++;
    } else if (beats[choice] === cpu) {
      outcome = 'You win!';   cls = 'win';  scores.you++;
    } else {
      outcome = 'You lose!';  cls = 'lose'; scores.cpu++;
    }

    res.className = 'result-banner ' + cls;
    res.textContent = outcome;
    document.getElementById('s-you').textContent  = scores.you;
    document.getElementById('s-cpu').textContent  = scores.cpu;
    document.getElementById('s-draw').textContent = scores.draw;
    busy = false;
  }, 600);
}

function reset() {
  scores.you = scores.cpu = scores.draw = 0;
  ['s-you','s-cpu','s-draw'].forEach(id => document.getElementById(id).textContent = 0);
  document.getElementById('h-you').textContent = '🤜';
  document.getElementById('h-cpu').textContent = '🤛';
  const res = document.getElementById('result');
  res.className = 'result-banner idle';
  res.textContent = 'Pick your move';
}