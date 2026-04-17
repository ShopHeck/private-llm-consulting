// Heck Holdings AI Consulting
(function () {

  document.documentElement.classList.add('js-loaded');

  const header = document.getElementById('header');
  const toggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  // ── Header dark/light on scroll ──────────────────────────
  if (header) {
    const hasDarkHero = !!document.querySelector('.hero, .page-hero');

    const updateHeader = () => {
      if (!hasDarkHero) return; // inner pages always light
      const hero = document.querySelector('.hero, .page-hero');
      const threshold = hero ? hero.offsetHeight - 10 : 60;
      if (window.scrollY > threshold) {
        header.classList.remove('on-dark');
      } else {
        header.classList.add('on-dark');
      }
    };

    if (!hasDarkHero) header.classList.remove('on-dark');
    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();
  }

  // ── Mobile menu ───────────────────────────────────────────
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', function (e) {
      e.stopPropagation(); // prevent bubbling to document closer
      const isOpen = mobileMenu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      // swap toggle icon
      toggle.innerHTML = isOpen
        ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'
        : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (mobileMenu.classList.contains('open') && !header.contains(e.target)) {
        mobileMenu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
      }
    });

    // Close when a menu link is tapped
    mobileMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
      });
    });
  }

  // ── Scroll reveal ─────────────────────────────────────────
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.06, rootMargin: '0px 0px -30px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('visible'); });
  }

  // ── Active nav ────────────────────────────────────────────
  var page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(function (a) {
    var href = (a.getAttribute('href') || '').split('#')[0];
    a.classList.toggle('active', href === page || (!page && href === 'index.html'));
  });

  // ── Year ──────────────────────────────────────────────────
  document.querySelectorAll('#yr').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  // ── Contact form ──────────────────────────────────────────
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var success = document.getElementById('form-success-msg') || document.getElementById('form-success');
      form.style.display = 'none';
      if (success) { success.style.display = 'block'; success.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
    });
  }

})();
