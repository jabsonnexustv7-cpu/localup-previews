(() => {
  const toggle = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#navigation');
  if (!toggle || !navigation) return;

  document.documentElement.classList.add('js');
  toggle.hidden = false;

  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.querySelector('span').textContent = open ? '−' : '+';
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
})();
