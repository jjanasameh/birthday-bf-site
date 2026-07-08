/* ============================================================
   BIRTHDAY CARD — script.js
   All logic: countdown, navigation, modal, floating hearts
   ============================================================ */


/* ============================================================
   1. COUNTDOWN TIMER
   ✏️  Change the date below to the birthday date/time.
       Format: 'YYYY-MM-DDTHH:MM:SS'  (uses device local time)
       Current target: July 5, 2026 at 12:00 AM midnight
   ============================================================ */
const TARGET_DATE = new Date('2026-07-05T00:00:00');

/* helper: pads a number to 2 digits  e.g. 5 → "05" */
function pad(n) {
  return String(n).padStart(2, '0');
}

function updateCountdown() {
  const now  = new Date();
  const diff = TARGET_DATE - now;   /* milliseconds remaining */

  if (diff <= 0) {
    /* ── Countdown finished ── */
    document.getElementById('cd-days').textContent  = '00';
    document.getElementById('cd-hours').textContent = '00';
    document.getElementById('cd-mins').textContent  = '00';
    document.getElementById('cd-secs').textContent  = '00';

    document.getElementById('waitingMsg').style.display = 'none';
    document.getElementById('zeroMsg').style.display    = 'block';
    document.getElementById('openGiftBtn').classList.add('visible');
    return;
  }

  /* ── Still counting ── */
  const days    = Math.floor(diff / 86400000);
  const hours   = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000)  / 60000);
  const seconds = Math.floor((diff % 60000)    / 1000);

  document.getElementById('cd-days').textContent  = pad(days);
  document.getElementById('cd-hours').textContent = pad(hours);
  document.getElementById('cd-mins').textContent  = pad(minutes);
  document.getElementById('cd-secs').textContent  = pad(seconds);
}

/* run immediately then every second */
updateCountdown();
setInterval(updateCountdown, 1000);


/* ============================================================
   2. PAGE NAVIGATION
   ============================================================ */
function goTo(pageId) {
  document.querySelectorAll('.page').forEach(p => {
    p.classList.remove('active');
    p.scrollTop = 0;
  });

  const page = document.getElementById(pageId);
  page.classList.add('active');
  page.scrollTop = 0;
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
}

/* Countdown page → Gift selection */
const openGiftBtn = document.getElementById('openGiftBtn');
if (openGiftBtn) {
  openGiftBtn.addEventListener('click', () => {
    goTo('page2');
  });
}

/* Gift selection → individual gift pages */
document.querySelectorAll('.gift-item').forEach(item => {
  item.addEventListener('click', () => {
    const target = item.getAttribute('data-target');
    if (target) goTo(target);
  });
});

/* "Back to gifts" button on every detail page */
document.querySelectorAll('.back-to-gifts').forEach(btn => {
  btn.addEventListener('click', () => {
    goTo('page2');
  });
});


/* ============================================================
   3. PHOTO MODAL
   Tap any polaroid or main gift image to enlarge it.
   Tap the dark overlay to close.
   ============================================================ */
const modalOverlay = document.getElementById('modalOverlay');
const modalImg     = document.getElementById('modalImg');

if (modalOverlay && modalImg) {
  document.querySelectorAll('.polaroid img, .main-gift').forEach(img => {
    img.addEventListener('click', e => {
      e.stopPropagation();          /* don't trigger parent clicks */
      modalImg.src = img.src;
      modalOverlay.classList.add('active');
    });
  });

  modalOverlay.addEventListener('click', () => {
    modalOverlay.classList.remove('active');
  });
}


/* ============================================================
   4. FLOATING HEARTS ANIMATION (countdown page background)
   ============================================================ */
const heartsContainer = document.getElementById('heartsContainer');
const heartSymbols    = ['♡', '♥', '💕', '✦'];

function spawnHeart() {
  const h = document.createElement('div');
  h.className = 'fh';
  h.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];

  h.style.left             = Math.random() * 100 + '%';
  h.style.animationDuration = (6 + Math.random() * 8) + 's';
  h.style.animationDelay   = '0s';
  h.style.fontSize         = (0.8 + Math.random() * 0.8) + 'rem';
  h.style.opacity          = '0';

  heartsContainer.appendChild(h);

  /* remove from DOM after animation ends to save memory */
  setTimeout(() => h.remove(), 15000);
}

setInterval(spawnHeart, 1200);
