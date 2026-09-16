(() => {
  const toggle = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#navigation');
  if (toggle && navigation) {
    document.documentElement.classList.add('js');
    toggle.hidden = false;

    const setOpen = (open) => {
      toggle.setAttribute('aria-expanded', String(open));
      navigation.classList.toggle('is-open', open);
    };

    toggle.addEventListener('click', () => {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    navigation.addEventListener('click', (event) => {
      if (event.target.closest('a')) setOpen(false);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });

    window.matchMedia('(max-width: 760px)').addEventListener('change', () => setOpen(false));
  }

  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const reveals = [...document.querySelectorAll('[data-reveal]')];
  const geometry = document.querySelector('.signature-geometry');
  let observer;

  const show = (element) => {
    element.classList.remove('is-reveal-pending');
    observer?.unobserve(element);
  };

  // Content remains visible when motion is reduced or IntersectionObserver is unavailable.
  if (!motion.matches && 'IntersectionObserver' in window) {
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) show(entry.target);
      });
    }, { threshold: 0.12 });

    reveals.forEach((element) => {
      element.classList.add('is-reveal-pending');
      observer.observe(element);
    });
  }

  if (!motion.matches) geometry?.classList.add('is-drawing');

  document.addEventListener('focusin', (event) => {
    const element = event.target.closest('[data-reveal]');
    if (element) show(element);
  });

  motion.addEventListener('change', (event) => {
    if (!event.matches) return;
    reveals.forEach(show);
    observer?.disconnect();
    geometry?.classList.remove('is-drawing');
  });
})();
