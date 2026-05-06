/**
 * main.js
 * Jasmine Hamouda — Portfolio Site
 *
 * Table of Contents:
 * 1. Scroll Reveal
 * 2. Active Nav Highlight
 * 3. Dark Mode Toggle
 * 4. Contact Form (Formspree)
 * 5. Init
 */


/* ── 1. SCROLL REVEAL ──────────────────────────────────────
   Uses IntersectionObserver to fade elements in as they
   enter the viewport. Adds .visible class which CSS handles.
   Once visible, element is unobserved for performance.
──────────────────────────────────────────────────────────── */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');

  if (!revealElements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Stop watching once revealed — no need to re-trigger
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  revealElements.forEach((el) => observer.observe(el));
}


/* ── 2. ACTIVE NAV HIGHLIGHT ───────────────────────────────
   Watches each section and highlights the matching nav link
   as the user scrolls. Uses IntersectionObserver for
   performance (no scroll event listeners).
──────────────────────────────────────────────────────────── */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Remove active from all links
          navLinks.forEach((link) => link.classList.remove('active'));

          // Add active to the matching link
          const activeLink = document.querySelector(
            `.nav-links a[href="#${entry.target.id}"]`
          );
          if (activeLink) activeLink.classList.add('active');
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach((section) => observer.observe(section));
}


/* ── 3. DARK MODE TOGGLE ───────────────────────────────────
   Toggles .dark class on <html>. Persists preference in
   localStorage so it's remembered on return visits.
   Respects user's OS preference on first visit.
──────────────────────────────────────────────────────────── */
function initDarkMode() {
  const toggle = document.getElementById('dark-toggle');
  if (!toggle) return;

  const html = document.documentElement;

  // Check saved preference, then fall back to OS preference
  const savedPref = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedPref === 'dark' || (!savedPref && prefersDark)) {
    html.classList.add('dark');
    toggle.textContent = '☀️';
    toggle.setAttribute('aria-label', 'Switch to light mode');
  } else {
    toggle.textContent = '🌙';
    toggle.setAttribute('aria-label', 'Switch to dark mode');
  }

  toggle.addEventListener('click', () => {
    const isDark = html.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    toggle.textContent = isDark ? '☀️' : '🌙';
    toggle.setAttribute(
      'aria-label',
      isDark ? 'Switch to light mode' : 'Switch to dark mode'
    );
  });
}


/* ── 4. CONTACT FORM ───────────────────────────────────────
   Submits to Formspree via fetch (no page reload).
   Shows success message on submit.

   To activate:
   1. Sign up at formspree.io (free)
   2. Create a new form
   3. Replace YOUR_FORM_ID below with your Formspree form ID
──────────────────────────────────────────────────────────── */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const successMsg = document.getElementById('form-success');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        form.reset();
        if (successMsg) {
          successMsg.classList.add('visible');
        }
        submitBtn.textContent = 'Sent!';
      } else {
        submitBtn.textContent = 'Error — try again';
        submitBtn.disabled = false;
      }
    } catch {
      submitBtn.textContent = 'Error — try again';
      submitBtn.disabled = false;
    }
  });
}


/* ── 5. INIT ───────────────────────────────────────────────
   Run all initialisers when the DOM is ready.
──────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initActiveNav();
  initDarkMode();
  initContactForm();
});

