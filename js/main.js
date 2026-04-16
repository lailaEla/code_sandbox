/**
 * INVISION PIXELS — Main JavaScript
 * Animations parallaxe, AOS, compteurs, formulaire, navbar
 */

'use strict';

/* =====================================================
   1. PAGE LOADER
   ===================================================== */
// (function initLoader() {
//   const loader = document.createElement('div');
//   loader.className = 'page-loader';
//   loader.innerHTML = `
//     <div class="loader-inner">
//       <div class="loader-logo">IP</div>
//       <div class="loader-bar"><div class="loader-bar-fill"></div></div>
//     </div>`;
//   document.body.prepend(loader);

//   window.addEventListener('load', () => {
//     setTimeout(() => loader.classList.add('hidden'), 800);
//     setTimeout(() => loader.remove(), 1400);
//   });
// })();

/* =====================================================
   2. NAVBAR — scroll behavior & mobile menu
   ===================================================== */
(function initNavbar() {
  const navbar  = document.getElementById('navbar');
  const burger  = document.querySelector('.nav-burger');
  const mobileMenu = document.getElementById('navMobile');
  const mobileLinks = document.querySelectorAll('.nav-mobile-link');

  // Scrolled state
  // const onScroll = () => {
  //   const scrolled = window.scrollY > 60;
  //   navbar.classList.toggle('scrolled', scrolled);
  // };
  // window.addEventListener('scroll', onScroll, { passive: true });
  // onScroll();

  // Mobile toggle
  burger?.addEventListener('click', () => {
    const open = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', String(!open));
    mobileMenu?.classList.toggle('active', !open);
  });

  // Close on link click
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu?.classList.remove('active');
      burger?.setAttribute('aria-expanded', 'false');
    });
  });

  // Highlight active section in nav
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  const highlightNav = () => {
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const id = section.getAttribute('id');
      const link = document.querySelector(`.nav-link[href="#${id}"]`);
      if (link) {
        link.classList.toggle('active', scrollPos >= top && scrollPos < bottom);
      }
    });
  };
  window.addEventListener('scroll', highlightNav, { passive: true });
})();

/* =====================================================
   3. PARALLAX EFFECTS
   ===================================================== */
(function initParallax() {
  const parallaxBgs = document.querySelectorAll('[data-parallax-bg]');
  const heroBg      = document.getElementById('heroBg');
  const heroBlob1   = document.getElementById('heroBlob1');
  const heroBlob2   = document.getElementById('heroBlob2');

  let ticking = false;
  let lastScroll = 0;

  const updateParallax = () => {
    const scrollY = window.scrollY;
    lastScroll = scrollY;
    ticking = false;

    // Hero background
    if (heroBg) {
      heroBg.style.transform = `translateY(${scrollY * 0.4}px)`;
    }
    if (heroBlob1) {
      heroBlob1.style.transform = `translateY(${scrollY * 0.2}px) scale(${1 + scrollY * 0.0002})`;
    }
    if (heroBlob2) {
      heroBlob2.style.transform = `translateY(${-scrollY * 0.15}px)`;
    }

    // Section parallax backgrounds
    parallaxBgs.forEach(bg => {
      const section = bg.closest('section') || bg.parentElement;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const speed = parseFloat(bg.dataset.parallaxBg) || 0.3;
      const offset = (window.innerHeight - rect.top) * speed * 0.4;
      bg.style.transform = `translateY(${-offset}px)`;
    });
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });

  // Mouse parallax on hero
  const hero = document.getElementById('hero');
  if (hero) {
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const cx = (e.clientX - rect.left) / rect.width - 0.5;
      const cy = (e.clientY - rect.top) / rect.height - 0.5;

      if (heroBlob1) {
        heroBlob1.style.transform = `translate(${cx * 30}px, ${cy * 20}px)`;
      }
      if (heroBlob2) {
        heroBlob2.style.transform = `translate(${-cx * 20}px, ${-cy * 15}px)`;
      }

      const card = hero.querySelector('.hero-visual-card');
      if (card) {
        card.style.transform = `translateY(-12px) perspective(800px) rotateY(${cx * 6}deg) rotateX(${-cy * 4}deg)`;
      }
    });

    hero.addEventListener('mouseleave', () => {
      if (heroBlob1) heroBlob1.style.transform = '';
      if (heroBlob2) heroBlob2.style.transform = '';
      const card = hero.querySelector('.hero-visual-card');
      if (card) card.style.transform = '';
    });
  }
})();

/* =====================================================
   4. PARTICLES — canvas on hero
   ===================================================== */
(function initParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;

  const canvas  = document.createElement('canvas');
  const ctx     = canvas.getContext('2d');
  container.appendChild(canvas);

  canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;';

  let W, H, particles = [];
  const PARTICLE_COUNT = 60;
  const COLORS = ['rgba(28,200,160,', 'rgba(11,92,97,', 'rgba(255,255,255,'];

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x     = Math.random() * W;
      this.y     = Math.random() * H;
      this.vx    = (Math.random() - 0.5) * 0.4;
      this.vy    = -Math.random() * 0.6 - 0.2;
      this.size  = Math.random() * 2 + 0.5;
      this.alpha = Math.random() * 0.5 + 0.1;
      this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      this.life  = 0;
      this.maxLife = Math.random() * 200 + 100;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.life++;
      if (this.life > this.maxLife || this.y < -10 || this.x < -10 || this.x > W + 10) {
        this.reset();
        this.y = H + 10;
      }
    }
    draw() {
      const progress = this.life / this.maxLife;
      const fade = progress < 0.1 ? progress * 10 : progress > 0.8 ? (1 - progress) * 5 : 1;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `${this.color}${this.alpha * fade})`;
      ctx.fill();
    }
  }

  const resize = () => {
    W = canvas.width  = container.offsetWidth;
    H = canvas.height = container.offsetHeight;
  };

  const animate = () => {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(28,200,160,${0.06 * (1 - dist / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  };

  resize();
  particles = Array.from({ length: PARTICLE_COUNT }, () => {
    const p = new Particle();
    p.y = Math.random() * H;
    p.life = Math.random() * p.maxLife;
    return p;
  });

  window.addEventListener('resize', resize, { passive: true });
  animate();
})();

/* =====================================================
   5. AOS — Animate on Scroll (custom, lightweight)
   ===================================================== */
(function initAOS() {
  const elements = document.querySelectorAll('[data-aos]');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el    = entry.target;
        const delay = parseInt(el.dataset.aosDelay) || 0;
        setTimeout(() => {
          el.classList.add('aos-animate');
        }, delay);
        observer.unobserve(el);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
  });

  elements.forEach(el => observer.observe(el));
})();

/* =====================================================
   6. COUNTER ANIMATIONS
   ===================================================== */
(function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const easeOut = t => 1 - Math.pow(1 - t, 3);

  const animateCounter = (el) => {
    const target   = parseInt(el.dataset.count);
    const duration = 1800;
    const start    = performance.now();

    const update = (now) => {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const current  = Math.round(easeOut(progress) * target);
      el.textContent = current.toLocaleString('fr-FR');
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
})();

/* =====================================================
   7. CONTACT FORM
   ===================================================== */
(function initForm() {
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  const btn     = document.getElementById('submitBtn');
  if (!form) return;

  // Smooth focus effect
  const inputs = form.querySelectorAll('input, select, textarea');
  inputs.forEach(input => {
    const group = input.closest('.form-group');
    input.addEventListener('focus', () => group?.classList.add('focused'));
    input.addEventListener('blur',  () => group?.classList.remove('focused'));
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Basic validation
    let valid = true;
    inputs.forEach(input => {
      if (input.required && !input.value.trim()) {
        input.style.borderColor = '#ef4444';
        valid = false;
        setTimeout(() => input.style.borderColor = '', 2500);
      }
    });
    if (!valid) {
      // Shake animation
      form.style.animation = 'shake 0.4s ease';
      setTimeout(() => form.style.animation = '', 500);
      return;
    }

    // Loading state
    const btnText = btn.querySelector('.btn-text');
    const original = btnText?.textContent;
    btn.disabled = true;
    if (btnText) btnText.textContent = 'Envoi en cours...';

    // Collect form data
    const data = {
      firstName: form.firstName?.value,
      lastName:  form.lastName?.value,
      email:     form.email?.value,
      company:   form.company?.value,
      service:   form.service?.value,
      message:   form.message?.value,
    };

    try {
      // Save to table API
      await fetch('tables/contact_submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
    } catch (err) {
      // Silently fail if API not available in preview
      console.log('API not available, form submitted locally');
    }

    // Simulate response delay
    await new Promise(r => setTimeout(r, 1000));

    // Show success
    form.style.display = 'none';
    success.hidden = false;
    success.style.animation = 'fadeInUp 0.5s ease forwards';
  });
})();

/* =====================================================
   8. BACK TO TOP
   ===================================================== */
(function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* =====================================================
   9. SMOOTH SCROLL for anchor links
   ===================================================== */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

/* =====================================================
   10. HOVER TILT on service cards
   ===================================================== */
(function initTiltCards() {
  const cards = document.querySelectorAll('.service-card, .why-card, .testimonial-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const cx   = (e.clientX - rect.left) / rect.width  - 0.5;
      const cy   = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `translateY(-6px) perspective(800px) rotateY(${cx * 5}deg) rotateX(${-cy * 3}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();

/* =====================================================
   11. SCROLL PROGRESS BAR
   ===================================================== */
(function initScrollProgress() {
  const bar = document.createElement('div');
  bar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    width: 0%;
    background: linear-gradient(90deg, #1CC8A0, #0B5C61);
    z-index: 9999;
    transition: width 0.1s;
    pointer-events: none;
  `;
  document.body.appendChild(bar);

  window.addEventListener('scroll', () => {
    const total  = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / total) * 100;
    bar.style.width = `${progress}%`;
  }, { passive: true });
})();

/* =====================================================
   12. CSS SHAKE ANIMATION (injected)
   ===================================================== */
(function injectShake() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes shake {
      0%,100% { transform: translateX(0); }
      20%,60% { transform: translateX(-8px); }
      40%,80% { transform: translateX(8px); }
    }
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .nav-link.active {
      color: var(--accent) !important;
    }
    .form-group.focused label {
      color: var(--accent);
    }
  `;
  document.head.appendChild(style);
})();

/* =====================================================
   13. TYPED TEXT EFFECT in hero badge
   ===================================================== */
(function initTypeEffect() {
  const badge = document.querySelector('.hero-badge');
  if (!badge) return;

  const texts = [
    'Tech Talent. Handpicked.',
    'Your Growth Partner in Tech.',
    'Make Your Vision to Reality.',
    '500+ Développeurs d\'élite.'
  ];
  let index = 0;
  let charIndex = 0;
  let isDeleting = false;
  let current = texts[0];

  const type = () => {
    const text = texts[index];
    if (!isDeleting) {
      current = text.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex >= text.length) {
        isDeleting = true;
        setTimeout(type, 2500);
        return;
      }
    } else {
      current = text.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex <= 0) {
        isDeleting = false;
        index = (index + 1) % texts.length;
        setTimeout(type, 300);
        return;
      }
    }
    // Keep the dot + update text
    badge.innerHTML = `<span class="badge-dot"></span>${current}`;
    setTimeout(type, isDeleting ? 35 : 65);
  };

  // Start after hero enters
  setTimeout(type, 2000);
})();

/* =====================================================
   14. SECTION ENTRANCE reveal (extra polish)
   ===================================================== */
(function initSectionReveal() {
  const sectionHeaders = document.querySelectorAll('.section-header, .why-left');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  const style = document.createElement('style');
  style.textContent = `
    .section-header, .why-left {
      transition: opacity 0.9s ease, transform 0.9s ease;
    }
    .section-header:not(.revealed), .why-left:not(.revealed) {
      opacity: 0;
      transform: translateY(30px);
    }
    .section-header.revealed, .why-left.revealed {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);

  sectionHeaders.forEach(el => observer.observe(el));
})();

console.log('%c Invision Pixels ✨ ', 'background: linear-gradient(135deg, #1CC8A0, #0B5C61); color: white; padding: 6px 12px; border-radius: 6px; font-weight: bold;');
