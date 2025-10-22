// Handles fade-in animation for sections & staggered organizer appearance
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section');
  const organizers = document.querySelectorAll('.organizer');
  const grid = document.getElementById('organizer-grid');

  // --- Reveal sections ---
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        sectionObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  sections.forEach(section => sectionObserver.observe(section));

  // --- Reveal organizers with staggered animation ---
  if (grid && organizers.length > 0) {
    const orgObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          organizers.forEach((org, index) => {
            setTimeout(() => {
              org.classList.add('in-view');
            }, index * 180); // Stagger timing (ms)
          });
          orgObserver.unobserve(grid);
        }
      });
    }, { threshold: 0.1 });

    orgObserver.observe(grid);
  }

  // --- Fallback: if organizers are already in view on load (short pages) ---
  function fallbackReveal() {
    organizers.forEach((org, i) => {
      setTimeout(() => org.classList.add('in-view'), i * 180);
    });
  }

  // Trigger fallback after 1s if no intersection occurred (for short pages)
  setTimeout(() => {
    const anyVisible = [...organizers].some(org => org.classList.contains('in-view'));
    if (!anyVisible) fallbackReveal();
  }, 1000);
});
