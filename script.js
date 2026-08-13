// Florida Tropical Pressure Washing, small, framework-free enhancements (mockup build)

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// Highlight the current page in the nav
const currentPage = (location.pathname.split('/').pop() || 'index.html');
document.querySelectorAll('.nav__links a').forEach((link) => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('is-active');
  }
});

// Scroll reveal, progressive enhancement, content is fully visible without JS
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('is-visible'));
}

// One-time review popup, bottom-right, shows once per browser ever (localStorage),
// regardless of whether it's manually closed or the visitor just navigates away.
// The mobile sticky CTA bar stays hidden until the popup has been shown
// and dismissed, so the two never stack up and clutter the bottom of the screen,
// unless the popup has already been seen on a prior visit, in which case the
// bar is free to show right away since the popup won't appear again.
const promoToast = document.getElementById('promoToast');
const promoClose = document.getElementById('promoToastClose');
const stickyCall = document.querySelector('.sticky-call');

function revealStickyCall() {
  if (stickyCall) stickyCall.classList.add('show');
  document.body.classList.add('sticky-call-visible');
}

if (promoToast) {
  const seenKey = 'ftpwPromoSeen';
  if (!localStorage.getItem(seenKey)) {
    localStorage.setItem(seenKey, '1');
    setTimeout(() => promoToast.classList.add('show'), 3200);
  } else {
    revealStickyCall();
  }
  if (promoClose) {
    promoClose.addEventListener('click', () => {
      promoToast.classList.remove('show');
      revealStickyCall();
    });
  }
} else {
  revealStickyCall();
}
