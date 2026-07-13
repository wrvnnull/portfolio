document.getElementById('year').textContent = new Date().getFullYear();

/* ===== SAFETY NET (runs first, independent of everything else) ===== */
/* Guarantees reveal-on-scroll content never gets stuck invisible,
   even if a later feature throws in an unsupported browser. */
function forceRevealAll() {
  document.querySelectorAll('[data-reveal]').forEach(el => el.classList.add('in-view'));
}
setTimeout(forceRevealAll, 3500);

/* ===== THEME TOGGLE ===== */
try {
  const html = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');

  function getPreferredTheme() {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  html.setAttribute('data-theme', getPreferredTheme());

  themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
} catch (err) { console.warn('Theme toggle unavailable', err); }

/* ===== MOBILE NAV ===== */
try {
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
} catch (err) { console.warn('Mobile nav unavailable', err); }

/* ===== SCROLL PROGRESS BAR ===== */
try {
  const progressBar = document.getElementById('progressBar');
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + '%';
  }, { passive: true });
} catch (err) { console.warn('Progress bar unavailable', err); }

/* ===== ACTIVE NAV LINK ON SCROLL ===== */
try {
  const sections = document.querySelectorAll('main section[id]');
  const navLinkEls = document.querySelectorAll('.nav-link');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinkEls.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px' });

  sections.forEach(sec => navObserver.observe(sec));
} catch (err) { console.warn('Active nav highlighting unavailable', err); }

/* ===== SCROLL REVEAL ===== */
try {
  const revealEls = document.querySelectorAll('[data-reveal]');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('in-view'), i * 60);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => revealObserver.observe(el));
} catch (err) { console.warn('Scroll reveal unavailable', err); forceRevealAll(); }

/* ===== TYPED ROLE ROTATOR ===== */
try {
  const roles = [
    'Web Developer',
    'Full-Stack Enthusiast',
    'Backend Engineer',
    'Applied Researcher'
  ];
  const typedEl = document.getElementById('typedRole');
  let roleIndex = 0;
  let charIndex = roles[0].length;
  let deleting = false;

  function typeLoop() {
    const current = roles[roleIndex];

    if (!deleting) {
      charIndex++;
      if (charIndex > current.length) {
        deleting = true;
        setTimeout(typeLoop, 1800);
        return;
      }
    } else {
      charIndex--;
      if (charIndex < 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        charIndex = 0;
      }
    }

    typedEl.textContent = current.slice(0, charIndex);
    setTimeout(typeLoop, deleting ? 40 : 80);
  }

  typedEl.textContent = roles[0];
  setTimeout(typeLoop, 1800);
} catch (err) { console.warn('Typed role rotator unavailable', err); }

/* ===== ANIMATED STAT COUNTERS ===== */
try {
  const statNums = document.querySelectorAll('.stat-num');

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'), 10);
        let current = 0;
        const duration = 1200;
        const startTime = performance.now();

        function step(now) {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          current = Math.round(eased * target);
          el.textContent = current;
          if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        countObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNums.forEach(el => countObserver.observe(el));
} catch (err) { console.warn('Stat counters unavailable', err); }

/* ===== BACK TO TOP ===== */
try {
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('show', window.scrollY > 600);
  }, { passive: true });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
} catch (err) { console.warn('Back to top unavailable', err); }

/* ===== CONTACT FORM ===== */
try {
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const btnLabel = submitBtn.querySelector('.btn-label');
  const statusEl = document.getElementById('formStatus');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    submitBtn.disabled = true;
    btnLabel.textContent = 'Sending…';
    statusEl.textContent = '';
    statusEl.className = 'form-status';

    try {
      const formData = new FormData(form);
      const res = await fetch('https://formsubmit.co/ajax/irvaaanfauzi@gmail.com', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData
      });

      if (!res.ok) throw new Error('Request failed');

      btnLabel.textContent = 'Message sent';
      statusEl.textContent = "Thanks! Your message is on its way, I'll get back to you soon.";
      statusEl.className = 'form-status success';
      form.reset();

      setTimeout(() => {
        btnLabel.textContent = 'Send message';
        submitBtn.disabled = false;
      }, 2500);

    } catch (err) {
      console.warn('Contact form submission failed', err);
      btnLabel.textContent = 'Send message';
      submitBtn.disabled = false;
      statusEl.textContent = 'Something went wrong. Please email irvaaanfauzi@gmail.com directly.';
      statusEl.className = 'form-status error';
    }
  });
} catch (err) { console.warn('Contact form unavailable', err); }
