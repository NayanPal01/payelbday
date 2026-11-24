/**
 * COTTAGECORE / COQUETTE BIRTHDAY EXPERIENCE FOR PAYEL
 * Clean Flow: Wax-Seal Envelope -> Candle -> Blackout -> Touch Cake -> Celebration (vdoframe.mp4) -> Her Video (vdo2.mp4) -> Photo Memories (Pic 1-9)
 */

// ==========================================
// AESTHETIC AUDIO SYNTHESIZER
// ==========================================
class CozyAudio {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playSealBreak() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(380, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, this.ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);
    } catch (e) {
      console.warn(e);
    }
  }

  playTap() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(340, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(580, this.ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.16, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch (e) {
      console.warn(e);
    }
  }

  playBlow() {
    if (!this.enabled || !this.ctx) return;
    try {
      const bufferSize = this.ctx.sampleRate * 0.45;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(360, this.ctx.currentTime);
      filter.frequency.linearRampToValueAtTime(80, this.ctx.currentTime + 0.45);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.45);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start();
    } catch (e) {
      console.warn(e);
    }
  }

  playSwitch() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, this.ctx.currentTime);
      osc.frequency.setValueAtTime(110, this.ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.07);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.07);
    } catch (e) {
      console.warn(e);
    }
  }

  playSlice() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(680, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(160, this.ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.24, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.2);
    } catch (e) {
      console.warn(e);
    }
  }

  playMelody() {
    if (!this.enabled || !this.ctx) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.1);
        gain.gain.setValueAtTime(0.14, this.ctx.currentTime + idx * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + idx * 0.1 + 0.3);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + idx * 0.1);
        osc.stop(this.ctx.currentTime + idx * 0.1 + 0.3);
      });
    } catch (e) {
      console.warn(e);
    }
  }
}

const audio = new CozyAudio();

// ==========================================
// ROSE PETALS & SOFT CONFETTI
// ==========================================
class RosePetalCannon {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.colors = ['#B32638', '#D9384C', '#F59E0B', '#FCEEE9', '#E8A598', '#FFFFFF'];
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  burst(x, y, count = 45) {
    const originX = x || window.innerWidth / 2;
    const originY = y || window.innerHeight / 2;

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 3;
      this.particles.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2.5,
        size: Math.random() * 8 + 5,
        color: this.colors[Math.floor(Math.random() * this.colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        opacity: 1,
        life: 0,
        maxLife: Math.random() * 50 + 65
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.22;
      p.vx *= 0.98;
      p.rotation += p.rotationSpeed;
      p.life++;
      p.opacity = 1 - (p.life / p.maxLife);

      if (p.life >= p.maxLife || p.y > this.canvas.height + 20) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);
      this.ctx.fillStyle = p.color;
      this.ctx.globalAlpha = Math.max(0, p.opacity);
      this.ctx.beginPath();
      this.ctx.ellipse(0, 0, p.size, p.size * 0.6, 0, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }

    requestAnimationFrame(this.animate);
  }
}

let confetti = null;

// ==========================================
// PHOTO GALLERY DATA (Pic1 to Pic9 with Sweet Words)
// ==========================================
const photosData = [
  { src: 'assets/pic1.jpeg', caption: 'That effortless glow that lights up every room' },
  { src: 'assets/pic2.jpeg', caption: 'Serving 10/10 looks and pure natural grace' },
  { src: 'assets/pic3.jpeg', caption: 'The unmistakable smile that we all adore' },
  { src: 'assets/pic4.jpeg', caption: 'Joyful, vibrant and unapologetically you' },
  { src: 'assets/pic5.jpeg', caption: 'Queen of good energy and sunny days' },
  { src: 'assets/pic6.jpeg', caption: 'Endless laughter and the best conversations' },
  { src: 'assets/pic7.jpeg', caption: 'Main character aura wherever you go' },
  { src: 'assets/pic8.jpeg', caption: 'A sweet soul with a heart of pure gold' },
  { src: 'assets/pic9.jpeg', caption: 'Today the whole world celebrates you, Payel!' }
];

let loveCounter = 0;
let isCandleBlown = false;
let isCakeCut = false;
let isEnvelopeOpened = false;

// ==========================================
// STAGE MANAGER
// ==========================================
function switchStage(fromStageId, toStageId) {
  const fromStage = document.getElementById(fromStageId);
  const toStage = document.getElementById(toStageId);

  if (fromStage) {
    fromStage.classList.remove('active');
  }

  setTimeout(() => {
    if (toStage) {
      toStage.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, 240);
}

// ==========================================
// STAGE 0: WAX SEAL ENVELOPE OPENING
// ==========================================
function openWaxEnvelope() {
  if (isEnvelopeOpened) return;
  isEnvelopeOpened = true;

  audio.init();
  audio.playSealBreak();

  const seal = document.getElementById('wax-seal');
  const envelope = document.getElementById('envelope');

  if (seal) seal.classList.add('broken');
  if (envelope) envelope.classList.add('open');

  confetti.burst(window.innerWidth / 2, window.innerHeight * 0.55, 35);

  setTimeout(() => {
    audio.playMelody();
    switchStage('stage-envelope', 'stage-candle');
  }, 900);
}

// ==========================================
// STAGE 1: CANDLE & BLOW OUT
// ==========================================
function blowOutCandle() {
  if (isCandleBlown) return;
  isCandleBlown = true;

  audio.init();
  audio.playBlow();

  const flameGlow = document.getElementById('flame-glow');
  const flameImg = document.getElementById('flame-img');
  const aura = document.getElementById('candle-aura');
  const smoke = document.getElementById('smoke-wisp');

  if (flameGlow) flameGlow.style.opacity = '0';
  if (aura) aura.style.opacity = '0.1';
  if (smoke) smoke.classList.add('rising');

  if (flameImg) {
    flameImg.style.transition = 'filter 0.8s ease, opacity 0.8s ease';
    flameImg.style.filter = 'brightness(0.65) contrast(0.9)';
  }

  setTimeout(() => {
    switchStage('stage-candle', 'stage-blackout');
    const curtain = document.getElementById('blackout-curtain');
    if (curtain) {
      curtain.style.display = 'flex';
      curtain.style.opacity = '1';
    }
  }, 900);
}

// ==========================================
// STAGE 2: BLACKOUT & TRANSITION TO CAKE
// ==========================================
function switchOnLights() {
  audio.init();
  audio.playSwitch();

  const curtain = document.getElementById('blackout-curtain');
  if (curtain) {
    curtain.style.opacity = '0';
    setTimeout(() => {
      curtain.style.display = 'none';
      switchStage('stage-blackout', 'stage-cut-cake');
      audio.playMelody();
      confetti.burst(window.innerWidth / 2, window.innerHeight * 0.45, 50);
    }, 450);
  }
}

// ==========================================
// STAGE 3: TOUCH-ONLY CAKE CUTTING
// ==========================================
function performCakeCut() {
  if (isCakeCut) return;
  isCakeCut = true;

  audio.init();
  audio.playSlice();

  const sliceLine = document.getElementById('slice-line');
  const uncut = document.getElementById('uncut-cake-img');
  const cutted = document.getElementById('cutted-cake-img');
  const touchCue = document.getElementById('touch-cue-banner');
  const notice = document.getElementById('slice-notice');
  const toCelebBtn = document.getElementById('to-celebration-btn');
  const title = document.getElementById('cake-title');
  const desc = document.getElementById('cake-desc');

  if (sliceLine) sliceLine.classList.add('cutting');

  setTimeout(() => {
    if (uncut) uncut.classList.add('hidden');
    if (cutted) cutted.classList.remove('hidden');
    if (sliceLine) sliceLine.classList.remove('cutting');
    if (touchCue) touchCue.classList.add('hidden');
    if (notice) notice.classList.remove('hidden');
    if (toCelebBtn) toCelebBtn.classList.remove('hidden');

    if (title) title.textContent = 'Cake Sliced!';
    if (desc) desc.textContent = 'You got the biggest piece!';

    audio.playMelody();
    confetti.burst(window.innerWidth / 2, window.innerHeight * 0.48, 60);
  }, 450);
}

// ==========================================
// STAGE 6: SCROLLABLE PHOTO MEMORIES FEED
// ==========================================
function initScrollableFeed() {
  const feed = document.getElementById('photo-feed');
  if (!feed) return;
  feed.innerHTML = '';

  photosData.forEach((photo, idx) => {
    const card = document.createElement('article');
    card.className = 'feed-photo-card';
    card.innerHTML = `
      <div class="feed-img-holder">
        <img src="${photo.src}" alt="Payel photo ${idx + 1}" loading="lazy">
      </div>
      <div class="feed-caption-text">${photo.caption}</div>
    `;
    feed.appendChild(card);
  });
}

// ==========================================
// REACTION HUG COUNTER
// ==========================================
function spawnLoveHeart(e) {
  audio.init();
  audio.playTap();

  loveCounter++;
  const countBadge = document.getElementById('love-count');
  if (countBadge) countBadge.textContent = loveCounter;

  const heart = document.createElement('div');
  heart.className = 'cozy-floating-heart';
  heart.textContent = '♥';

  const rect = e.target.getBoundingClientRect();
  const startX = rect.left + rect.width / 2 + (Math.random() - 0.5) * 50;
  const startY = rect.top + (Math.random() - 0.5) * 15;

  heart.style.left = `${startX}px`;
  heart.style.top = `${startY}px`;
  heart.style.color = '#B32638';

  document.body.appendChild(heart);

  if (loveCounter % 5 === 0) {
    confetti.burst(startX, startY, 25);
    audio.playMelody();
  }

  setTimeout(() => heart.remove(), 1100);
}

// ==========================================
// REPLAY FROM START
// ==========================================
function replaySurprise() {
  isEnvelopeOpened = false;
  isCandleBlown = false;
  isCakeCut = false;

  // Reset Envelope
  const seal = document.getElementById('wax-seal');
  const envelope = document.getElementById('envelope');
  if (seal) seal.classList.remove('broken');
  if (envelope) envelope.classList.remove('open');

  // Reset Candle
  const flameGlow = document.getElementById('flame-glow');
  const flameImg = document.getElementById('flame-img');
  const aura = document.getElementById('candle-aura');
  const smoke = document.getElementById('smoke-wisp');
  if (flameGlow) flameGlow.style.opacity = '1';
  if (aura) aura.style.opacity = '0.85';
  if (smoke) smoke.classList.remove('rising');
  if (flameImg) {
    flameImg.style.filter = '';
    flameImg.style.opacity = '1';
  }

  // Reset Blackout
  const curtain = document.getElementById('blackout-curtain');
  if (curtain) {
    curtain.style.display = 'flex';
    curtain.style.opacity = '1';
  }

  // Reset Cake Cutting
  const uncut = document.getElementById('uncut-cake-img');
  const cutted = document.getElementById('cutted-cake-img');
  const touchCue = document.getElementById('touch-cue-banner');
  const notice = document.getElementById('slice-notice');
  const toCelebBtn = document.getElementById('to-celebration-btn');
  const title = document.getElementById('cake-title');
  const desc = document.getElementById('cake-desc');

  if (uncut) uncut.classList.remove('hidden');
  if (cutted) cutted.classList.add('hidden');
  if (touchCue) touchCue.classList.remove('hidden');
  if (notice) notice.classList.add('hidden');
  if (toCelebBtn) toCelebBtn.classList.add('hidden');
  if (title) title.textContent = 'Touch Cake to Cut';
  if (desc) desc.textContent = 'Simply touch the cake directly to take your first slice.';

  // Jump to Stage 0 (Envelope)
  switchStage('stage-gallery', 'stage-envelope');
  audio.playMelody();
  confetti.burst(window.innerWidth / 2, window.innerHeight * 0.35, 30);
}

// ==========================================
// DOM READY & EVENT BINDINGS
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  confetti = new RosePetalCannon('confetti-canvas');
  initScrollableFeed();

  // Sound Toggle
  const soundBtn = document.getElementById('sound-btn');
  const soundText = document.getElementById('sound-text');
  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      audio.init();
      audio.enabled = !audio.enabled;
      soundText.textContent = audio.enabled ? 'Sound: On' : 'Sound: Off';
      if (audio.enabled) audio.playTap();
    });
  }

  // First interaction unlocks AudioContext
  document.body.addEventListener('touchstart', () => audio.init(), { once: true });
  document.body.addEventListener('click', () => audio.init(), { once: true });

  // STAGE 0: Wax-Seal Envelope
  document.getElementById('wax-seal')?.addEventListener('click', openWaxEnvelope);
  document.getElementById('envelope')?.addEventListener('click', openWaxEnvelope);

  // STAGE 1: Candle
  document.getElementById('blow-btn')?.addEventListener('click', blowOutCandle);
  document.getElementById('candle-trigger')?.addEventListener('click', blowOutCandle);

  // STAGE 2: Blackout
  document.getElementById('lights-btn')?.addEventListener('click', switchOnLights);

  // STAGE 3: TOUCH-ONLY CAKE CUTTING
  document.getElementById('touch-cake-target')?.addEventListener('click', performCakeCut);
  document.getElementById('cake-cut-area')?.addEventListener('click', performCakeCut);

  // Navigate from Cake to Stage 4: Celebration Video (vdoframe.mp4)
  document.getElementById('to-celebration-btn')?.addEventListener('click', () => {
    audio.playMelody();
    confetti.burst(window.innerWidth / 2, window.innerHeight * 0.35, 60);
    switchStage('stage-cut-cake', 'stage-celebration-vdo');

    const vdo = document.getElementById('vdoframe-player');
    if (vdo) {
      vdo.play().catch(e => console.log('Autoplay handled', e));
    }
  });

  // Navigate from Celebration to Stage 5: Video of Her (vdo2.mp4)
  document.getElementById('to-vdo2-btn')?.addEventListener('click', () => {
    audio.playTap();
    confetti.burst(window.innerWidth / 2, window.innerHeight * 0.35, 50);
    switchStage('stage-celebration-vdo', 'stage-vdo2-fullscreen');

    const vdo2 = document.getElementById('vdo2-player');
    if (vdo2) {
      vdo2.play().catch(e => console.log('Autoplay handled', e));
    }
  });

  // Navigate from vdo2.mp4 to Stage 6: All Photo Memories (Pic 1–9)
  document.getElementById('to-gallery-btn')?.addEventListener('click', () => {
    audio.playTap();
    confetti.burst(window.innerWidth / 2, window.innerHeight * 0.4, 40);
    switchStage('stage-vdo2-fullscreen', 'stage-gallery');
  });

  // Love Reaction & Replay
  document.getElementById('love-btn')?.addEventListener('click', (e) => spawnLoveHeart(e));
  document.getElementById('replay-btn')?.addEventListener('click', replaySurprise);
});
