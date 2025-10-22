// animation.js
// Robust reveal + staggered organizers. Works on short pages and fast loads.

document.addEventListener('DOMContentLoaded', () => {
  const sections = Array.from(document.querySelectorAll('section'));
  const grid = document.getElementById('organizer-grid');
  const organizers = grid ? Array.from(grid.querySelectorAll('.organizer')) : [];

  // Utility: add class with optional delay
  function addClassDelayed(el, cls, delay = 0) {
    if (delay > 0) {
      setTimeout(() => el.classList.add(cls), delay);
    } else {
      el.classList.add(cls);
    }
  }

  // Reveal sections via IntersectionObserver
  if ('IntersectionObserver' in window) {
    const sectionObs = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    sections.forEach(s => sectionObs.observe(s));
  } else {
    // Fallback: reveal all
    sections.forEach(s => s.classList.add('in-view'));
  }

  // Reveal organizers when grid becomes visible, staggered
  function revealOrganizers() {
    if (!organizers.length) return;
    organizers.forEach((org, i) => {
      addClassDelayed(org, 'in-view', i * 160);
    });
  }

  if (grid && 'IntersectionObserver' in window) {
    const gridObs = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          revealOrganizers();
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.10, rootMargin: '0px 0px -12% 0px' });

    gridObs.observe(grid);

    // Also handle the case where grid is already in view on load:
    // check immediately and reveal if visible
    const rect = grid.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top >= 0 && rect.bottom <= vh) {
      // fully visible
      revealOrganizers();
      gridObs.disconnect();
    } else if (rect.top < vh && rect.bottom > 0 && rect.top < vh * 0.9) {
      // partially visible => reveal
      revealOrganizers();
      gridObs.disconnect();
    } else {
      // final fallback: after short timeout reveal anyway (for very short pages)
      setTimeout(() => {
        const any = organizers.some(o => o.classList.contains('in-view'));
        if (!any) revealOrganizers();
      }, 900);
    }
  } else {
    // No IntersectionObserver support: reveal with stagger
    revealOrganizers();
  }
});
