// Heck Holdings AI Consulting — interactions
(function () {

  // Mark body so CSS reveal animations activate (content always visible without JS)
  document.documentElement.classList.add('js-loaded');

  // Sticky header
  const header = document.getElementById('header');
  if (header) {
    const tick = () => header.classList.toggle('scrolled', window.scrollY > 10);
    tick();
    window.addEventListener('scroll', tick, { passive: true });
  }

  // Mobile menu
  const toggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    document.addEventListener('click', (e) => {
      if (!header.contains(e.target)) {
        mobileMenu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Scroll reveal — only activates after js-loaded, so content is always visible
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.06, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('visible'));
  }

  // Active nav link
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach((a) => {
    const href = a.getAttribute('href');
    if (href === page || (!page && href === 'index.html')) a.classList.add('active');
    else a.classList.remove('active');
  });

  // Year
  const yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  // Contact form
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const success = document.getElementById('form-success');
      form.style.display = 'none';
      if (success) { success.hidden = false; success.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
    });
  }

})();
