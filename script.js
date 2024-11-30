// Function to display an alert when a project is clicked
function showProjectAlert(projectName) {
    alert("You clicked on: " + projectName);
}

// Function to animate sections on scroll
function animateOnScroll() {
    const sections = document.querySelectorAll('section');
    const windowHeight = window.innerHeight;

    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;

        if (sectionTop < windowHeight - 100) {
            section.classList.add('visible');
        }
    });
}

// Adding event listeners to project items
document.addEventListener('DOMContentLoaded', () => {
    const projectItems = document.querySelectorAll('#projects li');

    projectItems.forEach(item => {
        item.addEventListener('click', () => {
            const projectName = item.querySelector('strong').innerText;
            showProjectAlert(projectName);
        });
    });

    // Animate sections on scroll
    window.addEventListener('scroll', animateOnScroll);
    // Trigger animation for sections that are already in view
    animateOnScroll();
});