document.addEventListener('DOMContentLoaded', () => {

  const body = document.body;
  const startGate = document.getElementById('start-gate');
  const enterBtn = document.getElementById('enter-btn');
  const bgm = document.getElementById('hero-bgm');
  const bgFlash = document.getElementById('bg-flash');
  const progressBar = document.querySelector('.progress-bar');
  const viewport = document.getElementById('viewport');

  // Set total height for scrolling duration
  const totalScrollHeight = 7000; 
  body.style.height = `${totalScrollHeight}px`;

  // Start Gate Logic
  document.body.style.overflow = 'hidden'; // Lock before start
  enterBtn.addEventListener('click', () => {
    bgm.volume = 0.6;
    bgm.play().catch(e => console.log("Audio play blocked by browser:", e));
    startGate.style.opacity = '0';
    startGate.style.visibility = 'hidden';
    document.body.style.overflow = 'auto'; // Unlock scroll
    // Initial Flash
    triggerFlash();
  });

  // Flash utility
  function triggerFlash() {
    bgFlash.classList.remove('flash-active');
    void bgFlash.offsetWidth; // trigger reflow
    bgFlash.classList.add('flash-active');
  }

  // Screenshake utility
  function triggerShake() {
    viewport.animate([
      { transform: 'translate(10px, 10px) rotate(1deg)' },
      { transform: 'translate(-10px, -20px) rotate(-1deg)' },
      { transform: 'translate(-20px, 10px) rotate(2deg)' },
      { transform: 'translate(10px, -10px) rotate(-1deg)' },
      { transform: 'translate(0px, 0px) rotate(0deg)' }
    ], { duration: 300, easing: 'cubic-bezier(.36,.07,.19,.97)' });
  }

  // Scene Elements
  const sName = document.getElementById('scene-name');
  const nFirst = document.querySelector('.name-first');
  const nLast = document.querySelector('.name-last');
  const subtitle = document.querySelector('.hero-subtitle');

  const sAbout = document.getElementById('scene-about');
  
  const sExp = document.getElementById('scene-exp');
  const exps = [document.getElementById('exp-1'), document.getElementById('exp-2'), document.getElementById('exp-3')];
  
  const sProj = document.getElementById('scene-projects');
  const projs = [document.getElementById('proj-1'), document.getElementById('proj-2'), document.getElementById('proj-3')];

  const sContact = document.getElementById('scene-contact');
  const contactInfo = document.querySelector('.contact-shatter');

  // Tracking states to trigger flash/shake only ONCE per threshold cross
  let hasFlashedExp = [false, false, false];
  let hasFlashedProj = [false, false, false];

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    const maxScroll = totalScrollHeight - window.innerHeight;
    const progress = Math.min(Math.max(y / maxScroll, 0), 1);
    
    progressBar.style.width = `${progress * 100}%`;

    /* ========================================================
       SCENE 1: THE NAME (0 - 1500)
       - Slams in via scale.
    ======================================================== */
    if (y >= 0 && y < 1500) {
      sName.style.opacity = 1;
      // Interpolate scale down from 8 to 1
      let scale = Math.max(1, 4 - (y / 200)); 
      nFirst.style.transform = `scale(${scale}) translateY(${y/2}px)`;
      nLast.style.transform = `scale(${scale}) translateY(${y/2}px)`;
      
      nFirst.style.opacity = Math.min(1, y / 100 + 0.2);
      nLast.style.opacity = Math.min(1, y / 100 + 0.2);
      
      subtitle.style.transform = `translateY(${Math.max(0, 100 - y/3)}px)`;
      subtitle.style.opacity = Math.min(1, y / 300);
    } else {
      sName.style.opacity = 0;
    }

    /* ========================================================
       SCENE 2: ABOUT / ORIGIN (1200 - 2800)
    ======================================================== */
    if (y > 1200 && y < 2800) {
      let relativeY = y - 1200;
      sAbout.style.opacity = Math.min(1, relativeY / 400);
      sAbout.style.transform = `translateY(${Math.max(0, 200 - relativeY/2)}px)`;
      // Fade out at end
      if (y > 2400) {
        sAbout.style.opacity = 1 - ((y - 2400) / 400);
      }
    } else {
      sAbout.style.opacity = 0;
    }

    /* ========================================================
       SCENE 3: EXPERIENCES (2500 - 4500)
    ======================================================== */
    if (y > 2500 && y < 4500) {
      sExp.style.opacity = 1;
      let relativeY = y - 2500;
      
      // Stomp 1
      if (relativeY > 200) {
        exps[0].style.transform = `scale(1)`; exps[0].style.opacity = 1;
        if(!hasFlashedExp[0]) { triggerShake(); triggerFlash(); hasFlashedExp[0] = true; }
      } else { exps[0].style.transform = `scale(3)`; exps[0].style.opacity = 0; hasFlashedExp[0] = false; }
      
      // Stomp 2
      if (relativeY > 600) {
        exps[1].style.transform = `scale(1)`; exps[1].style.opacity = 1;
        if(!hasFlashedExp[1]) { triggerShake(); triggerFlash(); hasFlashedExp[1] = true; }
      } else { exps[1].style.transform = `scale(3)`; exps[1].style.opacity = 0; hasFlashedExp[1] = false; }

      // Stomp 3
      if (relativeY > 1000) {
        exps[2].style.transform = `scale(1)`; exps[2].style.opacity = 1;
        if(!hasFlashedExp[2]) { triggerShake(); triggerFlash(); hasFlashedExp[2] = true; }
      } else { exps[2].style.transform = `scale(3)`; exps[2].style.opacity = 0; hasFlashedExp[2] = false; }

      // Fade out
      if (y > 4000) {
        sExp.style.opacity = 1 - ((y - 4000) / 500);
      }
    } else {
      sExp.style.opacity = 0;
      hasFlashedExp = [false, false, false];
    }

    /* ========================================================
       SCENE 4: PROJECTS (4100 - 5800)
    ======================================================== */
    if (y > 4100 && y < 5800) {
      sProj.style.opacity = 1;
      let relativeY = y - 4100;

      const slideIn = (el, startPoint, index) => {
        if (relativeY > startPoint) {
           el.style.transform = `translateX(0) rotate(0deg)`;
           el.style.opacity = 1;
           if(!hasFlashedProj[index]) { triggerShake(); hasFlashedProj[index] = true; }
        } else {
           el.style.transform = `translateX(100vw) rotate(15deg)`;
           el.style.opacity = 0;
           hasFlashedProj[index] = false;
        }
      }

      slideIn(projs[0], 200, 0);
      slideIn(projs[1], 600, 1);
      slideIn(projs[2], 1000, 2);

      if (y > 5400) {
        sProj.style.opacity = 1 - ((y - 5400) / 400);
      }
    } else {
      sProj.style.opacity = 0;
      hasFlashedProj = [false, false, false];
    }

    /* ========================================================
       SCENE 5: CONTACT (5400 - End)
    ======================================================== */
    if (y > 5400) {
      let relativeY = y - 5400;
      sContact.style.opacity = Math.min(1, relativeY / 500);
      let scale = Math.max(1, 2 - relativeY/1000);
      contactInfo.style.transform = `scale(${scale})`;
    } else {
      sContact.style.opacity = 0;
    }
  });


  /* ========================================================
     ASH PARTICLE RENDERER
  ======================================================== */
  const canvas = document.getElementById('ash-canvas');
  const ctx = canvas.getContext('2d');
  let cw = canvas.width = window.innerWidth;
  let ch = canvas.height = window.innerHeight;
  
  let particles = [];
  const maxParticles = 80;

  class Ash {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * cw;
      this.y = Math.random() * ch + ch; // start below screen
      this.size = Math.random() * 3 + 1;
      this.speedX = (Math.random() - 0.5) * 2;
      this.speedY = -(Math.random() * 3 + 2); // fly upward
      this.life = Math.random() * 0.5 + 0.3; // opacity mod
      // Colors ranging from orange to red to ash gray
      const colors = ['#ff4500', '#ff002b', '#888', '#fff'];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }
    update() {
      this.x += this.speedX + (Math.random() - 0.5); // wobble
      this.y += this.speedY;
      if (this.y < -10) this.reset();
    }
    draw() {
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.life;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  for (let i=0; i<maxParticles; i++) particles.push(new Ash());

  function renderAsh() {
    ctx.clearRect(0, 0, cw, ch);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(renderAsh);
  }
  renderAsh();

  window.addEventListener('resize', () => {
    cw = canvas.width = window.innerWidth;
    ch = canvas.height = window.innerHeight;
  });

});
