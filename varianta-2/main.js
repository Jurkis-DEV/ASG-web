// Mobilní menu
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
burger.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});
document.querySelectorAll('#menu a').forEach(a =>
  a.addEventListener('click', () => { nav.classList.remove('open'); burger.setAttribute('aria-expanded', false); })
);

// Stín navigace po odscrollování
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 24);
onScroll();
addEventListener('scroll', onScroll, { passive: true });

// Jezdec před/po
const thermo = document.getElementById('thermo');
const range = document.getElementById('range');
const setPos = v => thermo.style.setProperty('--pos', v + '%');
range.addEventListener('input', e => setPos(e.target.value));

// Při prvním zobrazení jezdec krátce ukáže, že se hýbe
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const io = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting) return;
    io.disconnect();
    const t0 = performance.now();
    const tick = t => {
      const p = (t - t0) / 1800;
      if (p >= 1) { range.value = 50; setPos(50); return; }
      const v = 50 + Math.sin(p * Math.PI * 2) * 30 * (1 - p);
      range.value = v; setPos(v);
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, { threshold: 0.6 });
  io.observe(thermo);
}
