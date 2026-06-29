let tasks = [];
let filter = 'all';
let nextId = 1;

function render() {
  const list = document.getElementById('list');
  const visible = tasks.filter(t =>
    filter === 'all' ? true : filter === 'done' ? t.done : !t.done
  );

  const total = tasks.length;
  document.getElementById('count').textContent = total + ' task' + (total !== 1 ? 's' : '');
  const left = tasks.filter(t => !t.done).length;
  document.getElementById('left').textContent = left + ' remaining';

  if (visible.length === 0) {
    list.innerHTML = '<div class="empty">No tasks here.</div>';
    return;
  }

  list.innerHTML = visible.map(t => `
    <div class="item${t.done ? ' done' : ''}" id="item-${t.id}">
      <div class="cb${t.done ? ' checked' : ''}" onclick="toggle(${t.id})"></div>
      <span class="item-text">${t.text}</span>
      <button class="del-btn" onclick="del(${t.id})" aria-label="Delete task">&#215;</button>
    </div>
  `).join('');
}

function addTask() {
  const inp = document.getElementById('inp');
  const text = inp.value.trim();
  if (!text) return;
  tasks.unshift({ id: nextId++, text, done: false });
  inp.value = '';
  render();
}

function toggle(id) {
  const t = tasks.find(t => t.id === id);
  if (t) t.done = !t.done;
  render();
}

function del(id) {
  tasks = tasks.filter(t => t.id !== id);
  render();
}

function setFilter(f, btn) {
  filter = f;
  document.querySelectorAll('.f-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  render();
}

function clearDone() {
  tasks = tasks.filter(t => !t.done);
  render();
}

render();