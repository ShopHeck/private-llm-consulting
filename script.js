// Heck Holdings AI Consulting
(function () {

  // Reveal class enables CSS transitions (content always visible without JS)
  document.documentElement.classList.add('js-loaded');

  // Header — dark when over hero, light when scrolled into white content
  const header = document.getElementById('header');
  if (header) {
    const heroHeight = () => {
      const hero = document.querySelector('.hero, .page-hero');
      return hero ? hero.offsetHeight - 20 : 60;
    };
    const updateHeader = () => {
      const scrolled = window.scrollY > heroHeight();
      if (header.classList.contains('on-dark')) {
        // Started dark — switch to light when past hero
        if (scrolled) {
          header.classList.remove('on-dark');
        }
      } else {
        if (!scrolled) header.classList.add('on-dark');
      }
    };
    // Inner pages without dark hero — always light
    if (!document.querySelector('.hero, .page-hero')) {
      header.classList.remove('on-dark');
    }
    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();
  }

  // Mobile menu
  const toggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      // Mobile menu is always light bg
      if (open) header && header.classList.remove('on-dark');
    });
    document.addEventListener('click', (e) => {
      if (!header.contains(e.target)) {
        mobileMenu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.06, rootMargin: '0px 0px -30px 0px' });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('visible'));
  }

  // Active nav link
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach((a) => {
    const href = (a.getAttribute('href') || '').split('#')[0];
    a.classList.toggle('active', href === page || (!page && href === 'index.html'));
  });

  // Year
  document.querySelectorAll('#yr').forEach(el => el.textContent = new Date().getFullYear());

  // Contact form
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const success = document.getElementById('form-success-msg') || document.getElementById('form-success');
      form.style.display = 'none';
      if (success) { success.style.display = 'block'; success.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
    });
  }

})();
