// ---- Navbar scroll behavior ----
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('back-to-top');
const navLinkEls = document.querySelectorAll('#nav-links a');
const sectionEls = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  navbar.classList.toggle('scrolled', y > 50);
  backToTop.classList.toggle('visible', y > 400);
  highlightNav();
});

function highlightNav() {
  let current = '';
  sectionEls.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinkEls.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}

// ---- Hamburger / Mobile menu ----
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

hamburger.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    hamburger.click();
  }
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// Close mobile menu on outside click
document.addEventListener('click', e => {
  if (!navbar.contains(e.target) && !mobileMenu.contains(e.target)) {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  }
});

// ---- Scroll reveal ----
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObserver.observe(el));

// ---- Gallery Lightbox ----
function openLightbox(src, alt) {
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  img.src = src;
  img.alt = alt || '';
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

function closeLightboxBg(e) {
  if (e.target === document.getElementById('lightbox')) closeLightbox();
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});

// ---- Contact form ----
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    if (!name || !email || !message) {
      showFormError('Please fill in all required fields (Name, Email, Message).');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showFormError('Please enter a valid email address.');
      return;
    }

    // Simulate successful submission
    const submitBtn = document.getElementById('contact-submit');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';

    setTimeout(() => {
      contactForm.style.display = 'none';
      formSuccess.style.display = 'block';
    }, 1200);
  });
}

function showFormError(msg) {
  const existing = document.getElementById('form-error-msg');
  if (existing) existing.remove();
  const err = document.createElement('div');
  err.id = 'form-error-msg';
  err.style.cssText = 'background:#fce4ec;border:2px solid #e91e8c;border-radius:10px;padding:12px 16px;font-size:0.88rem;color:#880e4f;margin-bottom:16px;font-weight:500;';
  err.textContent = msg;
  contactForm.prepend(err);
  setTimeout(() => err.remove(), 4000);
}

// ---- Smooth scroll for all internal anchor links ----
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const offset = 80; // navbar height offset
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ---- Back to top button ----
if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ---- Initial navbar state ----
if (window.scrollY > 50) navbar.classList.add('scrolled');
