/* ============================================================
   AYUSH GIRI — PORTFOLIO SCRIPT
   ============================================================
   Three independent features live in this file:
   1. Scroll-reveal   — fades/slides "reveal" elements into view
   2. Tech Stack tabs  — switches between Languages/Front-End/etc.
   3. Terminal typewriter — animates the hero's fake terminal
   None of these need to be touched when you only add new TEXT
   content in index.html — they work automatically on anything
   with the right class/id, as explained in each section below.
   ============================================================ */

/* ------------------------------------------------------------
   1. SCROLL-REVEAL
   Any element in index.html with class="reveal" starts hidden
   and animates into view the first time it scrolls on screen.
   To make a new block animate in, just add class="reveal" to it
   — no changes needed here.
   ------------------------------------------------------------ */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target); // only animate once
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObserver.observe(el));

/* ------------------------------------------------------------
   2. TECH STACK TABS
   Looks for any button.stack-tab (with a data-tab="xyz" attribute)
   and any div.stack-panel (with id="panel-xyz"). Clicking a tab
   shows its matching panel and hides the rest.
   To add a brand new tab/category, just add the matching HTML in
   index.html — this code needs no edits, it picks up new tabs
   automatically.
   ------------------------------------------------------------ */
const stackTabs = document.querySelectorAll('.stack-tab');
const stackPanels = document.querySelectorAll('.stack-panel');
stackTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    stackTabs.forEach(t => t.classList.remove('active'));
    stackPanels.forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('panel-' + tab.dataset.tab).classList.add('active');
  });
});

/* ------------------------------------------------------------
   3. HERO TERMINAL TYPEWRITER
   This builds the little animated "terminal" in the hero section
   entirely in JavaScript (nothing is hardcoded in index.html —
   it renders into the empty <div id="term-body"> there).

   TO EDIT WHAT THE TERMINAL "TYPES OUT":
   Just edit the `termScript` array below. Each line is either:
     { type: 'cmd', text: '...' }   -> looks like a typed command
     { type: 'out', text: '...' }   -> looks like command output
   Add, remove, or reorder lines freely — the animation logic
   below handles any length of script automatically.
   ------------------------------------------------------------ */
const termBody = document.getElementById('term-body');

const termScript = [
  { type: 'cmd', text: 'who am I' },
  { type: 'out', text: 'full_stack_developer · web · app · ai_ml' },
  { type: 'cmd', text: 'langs --count' },
  { type: 'out', text: '18+ languages · C-family, JS/TS, Python, Java, Rust, Go, Lua…' },
  { type: 'cmd', text: './build --project gyaan-ai' }
];

// small helper: waits `ms` milliseconds before continuing
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// types `text` into `promptEl` one character at a time
async function typeLine(promptEl, text) {
  for (let i = 0; i <= text.length; i++) {
    promptEl.textContent = text.slice(0, i);
    await sleep(28 + Math.random() * 22); // slight random speed = feels more human
  }
}

// runs through the whole termScript once, then loops itself forever
async function runTerminal() {
  if (!termBody) return; // safety check in case the element is missing
  termBody.innerHTML = '';

  for (const step of termScript) {
    if (step.type === 'cmd') {
      // build one "command" line: ➜ + typed text + blinking cursor
      const line = document.createElement('div');
      line.className = 'term-line';
      line.innerHTML = '<span class="prompt">➜</span><span class="typed"></span><span class="cursor"></span>';
      termBody.appendChild(line);

      const typedSpan = line.querySelector('.typed');
      await typeLine(typedSpan, step.text);

      line.querySelector('.cursor').remove(); // remove cursor once the line is fully typed
      await sleep(280); // small pause before showing the output
    } else {
      // build one "output" line that fades in below the command
      const outLine = document.createElement('div');
      outLine.className = 'term-out term-out-fade';
      outLine.textContent = step.text;
      termBody.appendChild(outLine);
      requestAnimationFrame(() => outLine.classList.add('in'));
      await sleep(420);
    }
  }

  // leave a blinking cursor on the last line for a moment, then restart the whole animation
  const lastLine = termBody.lastElementChild;
  if (lastLine) {
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    lastLine.appendChild(cursor);
  }
  await sleep(1600);
  runTerminal(); // loop forever
}

runTerminal();
