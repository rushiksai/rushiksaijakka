document.addEventListener('DOMContentLoaded', () => {
  // AOS (Animate On Scroll) is initialized directly in index.html after its CDN script
  // AOS.init();

  // Get the navigation toggle checkbox
  const navToggle = document.getElementById('nav-toggle');

  // Enhanced smooth scroll function
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

    // Easing function for smooth animation
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
      e.preventDefault(); // Prevent default jump behavior

      // Get the target element using its ID
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Use custom smooth scroll function
        smoothScrollTo(targetElement);

        // Close the mobile menu after clicking a link
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

  // Close mobile menu when clicking outside
  document.addEventListener('click', function(e) {
    const navbar = document.querySelector('.navbar');
    if (navbar && navToggle && !navbar.contains(e.target) && navToggle.checked) {
      navToggle.checked = false;
    }
  });

  // Back to Top button logic
  const backToTopBtn = document.createElement('button');
  backToTopBtn.innerHTML = '<i data-lucide="arrow-up"></i>';
  backToTopBtn.id = 'backToTop';
  backToTopBtn.setAttribute('aria-label', 'Zurück nach oben');
  document.body.appendChild(backToTopBtn);

  // Re-create lucide icons after the button is added
  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    lucide.createIcons();
  }

  // Show/hide back to top button on scroll
  let isScrolling = false;
  window.addEventListener('scroll', () => {
    if (!isScrolling) {
      window.requestAnimationFrame(() => {
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
        isScrolling = false;
      });
      isScrolling = true;
    }
  });

  // Smooth scroll to top when button is clicked
  backToTopBtn.addEventListener('click', () => {
    smoothScrollTo(document.body, 600);
  });

  // Handle browser back/forward buttons
  window.addEventListener('popstate', (e) => {
    if (window.location.hash) {
      const targetElement = document.querySelector(window.location.hash);
      if (targetElement) {
        setTimeout(() => {
          smoothScrollTo(targetElement);
        }, 100);
      }
    }
  });
});
