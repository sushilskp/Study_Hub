// Mobile navigation toggle
(function(){
  const btn = document.querySelector('.nav-toggle');
  const nav = document.getElementById('primary-navigation');
  if(!btn || !nav) return;
  btn.addEventListener('click', ()=>{
    const visible = nav.getAttribute('data-visible') === 'true';
    nav.setAttribute('data-visible', String(!visible));
    btn.setAttribute('aria-expanded', String(!visible));
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      const href = a.getAttribute('href');
      if(href.length>1){
        e.preventDefault();
        const target = document.querySelector(href);
        if(target) target.scrollIntoView({behavior:'smooth',block:'start'});
      }
    });
  });

  // Simple contact form handling
  const form = document.getElementById('contact-form');
  if(form){
    form.addEventListener('submit', e=>{
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      if(!name||!email||!message){
        alert('Please fill all fields');
        return;
      }
      // Simulate submission
      form.reset();
      alert('Thanks! Your message was sent.');
    });
  }

  // Reduced motion respect
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(prefersReduced) return;

  // Subtle reveal on scroll
  const io = new IntersectionObserver((entries)=>{
    for(const e of entries){
      if(e.isIntersecting) e.target.style.transform = 'translateY(0)';
    }
  },{threshold:0.12});

  document.querySelectorAll('.feature, .course-card, .price-card, .hero-media').forEach(el=>{
    el.style.transform = 'translateY(18px)';
    io.observe(el);
  });
})();