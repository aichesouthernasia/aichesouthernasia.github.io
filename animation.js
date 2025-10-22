// Handles fade-in animation for sections & staggered organizer appearance
document.addEventListener('DOMContentLoaded', () => {
  const revealSection = el => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    observer.observe(el);
  };

  // Animate each section
  document.querySelectorAll('section').forEach(revealSection);

  // Stagger organizers
  const grid = document.getElementById('organizer-grid');
  if (grid) {
    const organizers = grid.querySelectorAll('.organizer');
    const orgObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          organizers.forEach((org, i) => {
            setTimeout(() => {
              org.classList.add('in-view');
            }, i * 150); // 150ms stagger
          });
          orgObserver.unobserve(grid);
        }
      });
    }, { threshold: 0.15 });
    orgObserver.observe(grid);
  }
});
