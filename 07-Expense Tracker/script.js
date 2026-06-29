const catIcon = {
  Food: '🍔', Transport: '🚗', Shopping: '🛍️',
  Bills: '💡', Health: '💊', Salary: '💰', Other: '📦'
};
const catBg = {
  Food: '#fff7ed', Transport: '#eff6ff', Shopping: '#fdf4ff',
  Bills: '#fefce8', Health: '#f0fdf4', Salary: '#f0fdf4', Other: '#f5f5f4'
};

let entries = [];
let nextId = 1;
let entryType = 'expense';

document.getElementById('f-date').value = new Date().toISOString().split('T')[0];

function setType(t) {
  entryType = t;
  document.getElementById('btn-exp').className = 'type-btn' + (t === 'expense' ? ' sel-exp' : '');
  document.getElementById('btn-inc').className = 'type-btn' + (t === 'income'  ? ' sel-inc' : '');
}

function fmt(n) {
  return '₹' + n.toLocaleString('en-IN');
}

function render() {
  const inc = entries.filter(e => e.type === 'income').reduce((s, e) => s + e.amt, 0);
  const exp = entries.filter(e => e.type === 'expense').reduce((s, e) => s + e.amt, 0);
  const bal = inc - exp;

  document.getElementById('s-inc').textContent = fmt(inc);
  document.getElementById('s-exp').textContent = fmt(exp);
  document.getElementById('s-bal').textContent = fmt(bal);
  document.getElementById('s-bal').className   = 's-val ' + (bal >= 0 ? 'blue' : 'red');

  const pct = inc > 0 ? Math.min(100, Math.round((exp / inc) * 100)) : 0;
  const bar = document.getElementById('prog');
  bar.style.width      = pct + '%';
  bar.style.background = pct > 80 ? '#dc2626' : pct > 50 ? '#f59e0b' : '#22c55e';

  const list = document.getElementById('list');
  if (!entries.length) {
    list.innerHTML = '<div class="empty">No transactions yet.</div>';
    return;
  }

  const sorted = [...entries].sort((a, b) => b.date.localeCompare(a.date));
  list.innerHTML = sorted.map(e => `
    <div class="entry">
      <div class="cat-icon" style="background:${catBg[e.cat]}">${catIcon[e.cat]}</div>
      <div class="entry-info">
        <div class="entry-desc">${e.desc}</div>
        <div class="entry-meta">${e.cat} &middot; ${e.date}</div>
      </div>
      <div class="entry-amt ${e.type === 'expense' ? 'exp' : 'inc'}">
        ${e.type === 'expense' ? '-' : '+'}${fmt(e.amt)}
      </div>
      <button class="del-btn" onclick="del(${e.id})" aria-label="Delete">&#215;</button>
    </div>
  `).join('');
}

function addEntry() {
  const desc = document.getElementById('f-desc').value.trim();
  const amt  = parseFloat(document.getElementById('f-amt').value);
  const cat  = document.getElementById('f-cat').value;
  const date = document.getElementById('f-date').value;
  if (!desc || !amt || amt <= 0 || !date) return;
  entries.unshift({ id: nextId++, type: entryType, desc, amt, cat, date });
  document.getElementById('f-desc').value = '';
  document.getElementById('f-amt').value  = '';
  render();
}

function del(id) {
  entries = entries.filter(e => e.id !== id);
  render();
}

render();