document.addEventListener('DOMContentLoaded', () => {
  // AOS (Animate On Scroll) is initialized directly in index.html after its CDN script,
  // but you can uncomment AOS.init(); here if you prefer managing it solely in script.js,
  // ensuring the AOS CDN is loaded before this script.
  // AOS.init();

  // Get the navigation toggle checkbox
  const navToggle = document.getElementById('nav-toggle');

  // Smooth scroll for all internal anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault(); // Prevent default jump behavior

      // Get the target element using its ID
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Scroll to the target element smoothly
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });

        // --- NEW: Close the mobile menu after clicking a link ---
        // If the navToggle checkbox exists and is checked (meaning the menu is open), uncheck it.
        if (navToggle && navToggle.checked) {
          navToggle.checked = false;
        }
      }
    });
  });

  // --- Back to Top button logic ---
  const backToTopBtn = document.createElement('button');
  backToTopBtn.innerHTML = '<i data-lucide="arrow-up"></i>'; // Using Lucide icon for the arrow
  backToTopBtn.id = 'backToTop';
  document.body.appendChild(backToTopBtn);

  // IMPORTANT: Re-create lucide icons AFTER the button is added to the DOM.
  // This ensures the dynamically added icon is rendered by Lucide.
  // This call depends on the Lucide CDN script being loaded in index.html.
  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    lucide.createIcons();
  }

  // Show/hide button on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) { // Show button after scrolling 300px down
      backToTopBtn.style.display = 'flex'; // Use flex to center the icon as per CSS
    } else {
      backToTopBtn.style.display = 'none';
    }
  });

  // Scroll to top when button is clicked
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scroll to top
    });
  });
});
