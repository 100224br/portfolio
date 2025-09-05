// Smooth Click Animation Effect
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', function() {
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
      this.style.transform = 'scale(1)';
    }, 150);
  });
});

// Burger menu functionaliteit
const burger = document.querySelector('.burger');
const nav = document.getElementById('main-nav');
burger.addEventListener('click', function() {
  const expanded = this.getAttribute('aria-expanded') === 'true';
  this.setAttribute('aria-expanded', !expanded);
  nav.classList.toggle('nav-open');
  document.body.classList.toggle('no-scroll', !expanded);
});

// Smooth scroll for navigation links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      // Close mobile menu if open
      nav.classList.remove('nav-open');
      burger.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('no-scroll');
    }
  });
});

// Scroll-triggered animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
      // Clean up will-change after animation completes
      setTimeout(() => {
        entry.target.style.willChange = 'auto';
      }, 800);
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
  // Add animation classes to elements
  const animateElements = document.querySelectorAll('.project-card, .skill-card, .connect-card, .about-content');
  animateElements.forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
  });

  // Header scroll functionality
  const header = document.querySelector('header');
  let lastScrollY = window.scrollY;
  let ticking = false;

  function updateHeader() {
    const scrollY = window.scrollY;
    
    // Add scrolled class when not at top
    if (scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Hide/show header based on scroll direction
    if (scrollY > lastScrollY && scrollY > 100) {
      // Scrolling down - hide header
      header.classList.add('hidden');
      // Reset hover states on navigation links
      const navLinks = header.querySelectorAll('nav a');
      navLinks.forEach(link => {
        link.blur(); // Remove focus
        link.style.pointerEvents = 'none'; // Disable pointer events
      });
    } else {
      // Scrolling up - show header
      header.classList.remove('hidden');
      // Re-enable pointer events on navigation links
      const navLinks = header.querySelectorAll('nav a');
      navLinks.forEach(link => {
        link.style.pointerEvents = 'auto'; // Re-enable pointer events
      });
    }

    lastScrollY = scrollY;
    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }

  window.addEventListener('scroll', requestTick);

  // Add active navigation highlighting
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  function highlightNavigation() {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', highlightNavigation);
  highlightNavigation(); // Initial call

  // Keyboard navigation for project cards
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const downloadLink = this.querySelector('.btn-download, .btn-github');
        if (downloadLink) {
          downloadLink.click();
        }
      }
    });
  });
});
