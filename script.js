// GSAP animations
window.addEventListener('load', () => {
  gsap.from(".animate-title", { duration: 1.2, y: -80, opacity: 0, ease: "power4.out" });
  gsap.to(".animate-title", { duration: 20, x: "10vw", repeat: -1, yoyo: true, ease: "linear" });
  gsap.from(".animate-subtitle", { duration: 1, delay: 0.4, y: 30, opacity: 0, ease: "power2.out" });
  gsap.from(".animate-cta", { duration: 1, delay: 0.8, scale: 0.8, opacity: 0, ease: "back.out(1.7)" });

  // Animate each skill logo
  document.querySelectorAll(".skills-list li").forEach((el, i) => {
    gsap.from(el, {
      opacity: 0,
      y: 50,
      scale: 0.8,
      delay: 1 + i * 0.1,
      duration: 0.6,
      ease: "back.out(1.7)"
    });
  });
});

// Smooth scroll on nav click
const navLinks = document.querySelectorAll(".navbar a");
navLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth" });
  });
});

// Mouse particle trail animation
const particleContainer = document.createElement('div');
particleContainer.style.position = 'fixed';
particleContainer.style.top = '0';
particleContainer.style.left = '0';
particleContainer.style.width = '100%';
particleContainer.style.height = '100%';
particleContainer.style.pointerEvents = 'none';
particleContainer.style.zIndex = '1';
document.body.appendChild(particleContainer);

document.addEventListener('mousemove', e => {
  const square = document.createElement('div');
  square.style.position = 'absolute';
  square.style.width = '8px';
  square.style.height = '8px';
  square.style.background = '#00adb5';
  square.style.left = `${e.clientX}px`;
  square.style.top = `${e.clientY}px`;
  square.style.opacity = '1';
  square.style.borderRadius = '2px';
  square.style.transform = 'translate(-50%, -50%)';
  particleContainer.appendChild(square);

  gsap.to(square, {
    duration: 0.6,
    opacity: 0,
    scale: 0.3,
    y: -20,
    ease: "power1.out",
    onComplete: () => square.remove()
  });
});
