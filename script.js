document.addEventListener('DOMContentLoaded', () => {
    // --- Initialize Third-Party Libraries ---
    // AOS (Animate On Scroll) initialization
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100
        });
    }

    // Lucide icons initialization
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
        lucide.createIcons();
    }

    // --- Smooth Scrolling Functionality ---
    /**
     * Smoothly scrolls to a target element.
     * @param {HTMLElement} targetElement The element to scroll to.
     * @param {number} duration The duration of the scroll animation in milliseconds.
     */
    function smoothScrollTo(targetElement, duration = 800) {
        const targetPosition = targetElement.offsetTop - 80; // Offset for fixed navbar
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }

    // Smooth scroll for all internal anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                smoothScrollTo(targetElement);

                // Close the mobile menu after clicking a link
                const navToggle = document.getElementById('nav-toggle');
                if (navToggle && navToggle.checked) {
                    navToggle.checked = false;
                }

                // Update URL without triggering scroll
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                }
            }
        });
    });

    // Handle browser back/forward buttons
    window.addEventListener('popstate', () => {
        if (window.location.hash) {
            const targetElement = document.querySelector(window.location.hash);
            if (targetElement) {
                // A small delay to ensure the page has re-rendered
                setTimeout(() => {
                    smoothScrollTo(targetElement);
                }, 100);
            }
        }
    });

    // --- Back to Top Button Logic ---
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i data-lucide="arrow-up"></i>';
    backToTopBtn.id = 'backToTop';
    backToTopBtn.setAttribute('aria-label', 'Zurück nach oben');
    document.body.appendChild(backToTopBtn);

    // Re-create lucide icons for the new button
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
        lucide.createIcons();
    }

    // Show/hide back to top button on scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'flex';
            backToTopBtn.style.opacity = '1';
        } else {
            backToTopBtn.style.opacity = '0';
            setTimeout(() => {
                if (window.pageYOffset <= 300) {
                    backToTopBtn.style.display = 'none';
                }
            }, 300);
        }
    });

    // Smooth scroll to top when button is clicked
    backToTopBtn.addEventListener('click', () => {
        smoothScrollTo(document.body, 600);
    });

    // --- Animate Progress Bars ---
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach((bar, index) => {
        // A small delay for a staggered animation effect
        setTimeout(() => {
            const progress = bar.getAttribute('data-progress');
            bar.style.width = progress + '%';
        }, 300 + (index * 200));
    });

    // --- Mobile Menu Toggle Logic ---
    const navToggle = document.getElementById('nav-toggle');
    document.addEventListener('click', function(e) {
        const navbar = document.querySelector('.navbar');
        if (navbar && navToggle && !navbar.contains(e.target) && navToggle.checked) {
            navToggle.checked = false;
        }
    });
});
