// GSAP animations
window.addEventListener('load', () => {
    gsap.from(".animate-title", { duration: 1, y: -50, opacity: 0, ease: "power2.out" });
    gsap.from(".animate-subtitle", { duration: 1, delay: 0.5, y: 30, opacity: 0, ease: "power2.out" });
    gsap.from(".animate-cta", { duration: 1, delay: 1, scale: 0.8, opacity: 0, ease: "back.out(1.7)" });
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
  
