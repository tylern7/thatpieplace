(function(){
  var d=document,root=d.documentElement,h=d.querySelector('.site-header'),t=d.querySelector('.nav-toggle'),n=d.getElementById('nav');
  root.classList.remove('no-js');root.classList.add('js');
  var still=window.matchMedia('(prefers-reduced-motion: reduce)');
  function close(){n.classList.remove('open');t.setAttribute('aria-expanded','false');t.setAttribute('aria-label','Open menu');d.body.style.overflow='';}
  t.addEventListener('click',function(){var o=t.getAttribute('aria-expanded')==='true';if(o){close();}else{n.classList.add('open');t.setAttribute('aria-expanded','true');t.setAttribute('aria-label','Close menu');d.body.style.overflow='hidden';}});
  n.querySelectorAll('a').forEach(function(a){a.addEventListener('click',close);});
  d.addEventListener('keydown',function(e){if(e.key==='Escape')close();});
  window.addEventListener('resize',function(){if(window.innerWidth>1020)close();});
  function onScroll(){h.classList.toggle('scrolled',window.scrollY>8);}
  window.addEventListener('scroll',onScroll,{passive:true});onScroll();
  var els=d.querySelectorAll('.reveal');
  if('IntersectionObserver' in window && !still.matches){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{rootMargin:'0px 0px -8% 0px',threshold:.08});
    els.forEach(function(el){io.observe(el);});
  } else { els.forEach(function(el){el.classList.add('in');}); }
  // highlight today's hours (shop time zone: Toronto)
  try{
    var day=new Date().toLocaleDateString('en-CA',{weekday:'short',timeZone:'America/Toronto'});
    var idx=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].indexOf(day.slice(0,3));
    var row=d.querySelector('.hours tr[data-d="'+idx+'"]');if(row)row.classList.add('today');
  }catch(e){}
  // contact form -> pre-filled email to info@thatpieplace.com (same fields as the old Squarespace form)
  var f=d.getElementById('contact-form'),note=f.querySelector('.form-note');
  f.addEventListener('submit',function(e){
    e.preventDefault();
    var v=function(k){return (f.elements[k].value||'').trim();};
    var miss=['name','email','message'].filter(function(k){return !v(k);});
    var badEmail=v('email')&&!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v('email'));
    if(miss.length||badEmail){note.textContent='Please fill in your name, a valid email address and a message.';note.classList.add('err');f.elements[miss[0]||'email'].focus();return;}
    note.classList.remove('err');
    var body='Name: '+v('name')+'\nEmail: '+v('email')+'\n\n'+v('message');
    location.href='mailto:info@thatpieplace.com?subject='+encodeURIComponent('Website question from '+v('name'))+'&body='+encodeURIComponent(body);
    note.textContent='Thank you! Your email app should open with your message ready to send.';
  });
  var y=d.getElementById('yr');if(y)y.textContent=new Date().getFullYear();
})();
