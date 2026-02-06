const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const buttons = document.getElementById("buttons");
const hint = document.getElementById("hint");

const result = document.getElementById("result");
const resultTitle = document.getElementById("resultTitle");
const resultText = document.getElementById("resultText");
const emoji = document.getElementById("emoji");
const againBtn = document.getElementById("againBtn");

// “לא” בורח
function moveNoButton() {
  const area = buttons.getBoundingClientRect();
  const btn = noBtn.getBoundingClientRect();

  const padding = 10;
  const maxX = area.width - btn.width - padding * 2;
  const maxY = area.height - btn.height - padding * 2;

  const x = Math.max(padding, Math.floor(Math.random() * maxX) + padding);
  const y = Math.max(padding, Math.floor(Math.random() * maxY) + padding);

  noBtn.style.transform = `translate(${x - (btn.left - area.left)}px, ${y - (btn.top - area.top)}px)`;
  hint.textContent = "😅 לא כזה מהר…";
}

noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener(
  "touchstart",
  (e) => {
    e.preventDefault();
    moveNoButton();
  },
  { passive: false }
);

// “כן” → חגיגה
yesBtn.addEventListener("click", () => {
  showResult({
    title: "ידעתי 😌",
    text: "את עשית לי את היום. עכשיו מגיע לך חיבוק וגלידה 🍦",
    em: "🎉",
    confetti: true,
  });
});

// אם הצליחה ללחוץ “לא”
noBtn.addEventListener("click", () => {
  showResult({
    title: "אממ… חשוד 🤨",
    text: "אוקיי, אז אני אנסה שוב עוד 3…2…1 😄",
    em: "🌀",
    confetti: false,
  });
});

againBtn.addEventListener("click", () => {
  result.classList.remove("show");
  hint.textContent = 'טיפ: נסי ללחוץ על “לא”… 😅';
  noBtn.style.transform = "translate(0,0)";
  yesBtn.focus();
});

function showResult({ title, text, em, confetti }) {
  resultTitle.textContent = title;
  resultText.textContent = text;
  emoji.textContent = em;
  result.classList.add("show");
  if (confetti) shootConfetti();
}

// קונפטי
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
let pieces = [];
let animId = null;

function resize() {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.floor(window.innerWidth * dpr);
  canvas.height = Math.floor(window.innerHeight * dpr);
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
window.addEventListener("resize", resize);
resize();

function shootConfetti() {
  pieces = Array.from({ length: 160 }, () => ({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    vx: (Math.random() - 0.5) * 10,
    vy: (Math.random() - 0.8) * 12,
    r: 2 + Math.random() * 3,
    a: 1,
    rot: Math.random() * Math.PI,
  }));

  if (animId) cancelAnimationFrame(animId);
  canvas.classList.add("show");

  const start = performance.now();
  const duration = 1400;

  function tick(t) {
    const p = Math.min(1, (t - start) / duration);
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (const c of pieces) {
      c.x += c.vx;
      c.y += c.vy + 1.8;
      c.vx *= 0.98;
      c.vy *= 0.98;
      c.a = 1 - p;

      ctx.save();
      ctx.globalAlpha = Math.max(0, c.a);
      ctx.translate(c.x, c.y);
      ctx.rotate(c.rot);
      ctx.fillStyle = "rgba(255,255,255,0.9)";
      ctx.fillRect(-c.r, -c.r, c.r * 2.2, c.r * 2.2);
      ctx.restore();
    }

    if (p < 1) animId = requestAnimationFrame(tick);
    else {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      canvas.classList.remove("show");
    }
  }

  animId = requestAnimationFrame(tick);
}
