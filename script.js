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
