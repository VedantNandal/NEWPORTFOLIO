// Portfolio JavaScript - Landing Page Interactions

document.addEventListener('DOMContentLoaded', function() {
  // ========================
  // Navigation scroll effect
  // ========================
  const navbar = document.getElementById('navbar');
  
  function handleScroll() {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Check initial state

  // ========================
  // Mobile menu toggle
  // ========================
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', function() {
      mobileMenu.classList.toggle('open');
      // Update button icon
      const isOpen = mobileMenu.classList.contains('open');
      mobileMenuBtn.innerHTML = isOpen 
        ? '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>'
        : '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>';
    });
  }

  // Close mobile menu function (called from HTML onclick)
  window.closeMobileMenu = function() {
    if (mobileMenu) {
      mobileMenu.classList.remove('open');
      mobileMenuBtn.innerHTML = '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>';
    }
  };

  // ========================
  // Animated roles slider
  // ========================
  const rolesSlider = document.getElementById('rolesSlider');
  
  if (rolesSlider) {
    const roles = rolesSlider.querySelectorAll('.role-item');
    let currentRole = 0;
    
    function rotateRoles() {
      currentRole = (currentRole + 1) % roles.length;
      rolesSlider.style.transform = `translateY(-${currentRole * 4}rem)`;
    }
    
    setInterval(rotateRoles, 3000);
  }

  // ========================
  // Smooth scroll for anchor links
  // ========================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navHeight = navbar.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ========================
  // Intersection Observer for animations
  // ========================
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements that should animate on scroll
  document.querySelectorAll('.skill-card, .project-card, .achievement-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // Add revealed class styles
  const style = document.createElement('style');
  style.textContent = `
    .revealed {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);

  // ========================
  // Project card hover effects
  // ========================
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.01)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
  });

  // ========================
  // Update copyright year
  // ========================
  const copyrightEl = document.querySelector('.footer-copyright');
  if (copyrightEl) {
    const year = new Date().getFullYear();
    copyrightEl.innerHTML = copyrightEl.innerHTML.replace(/\d{4}/, year);
  }

  // ========================
  // Skill tags hover effect
  // ========================
  document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.05)';
    });
    
    tag.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
  });

  // ========================
  // Preloader (optional)
  // ========================
  window.addEventListener('load', function() {
    document.body.classList.add('loaded');
  });

  console.log('Portfolio loaded successfully! 🚀');
});
