(function(){
  var top=document.getElementById('top'),bg=document.getElementById('burger');
  function sc(){top.classList.toggle('sc',window.scrollY>8)}
  window.addEventListener('scroll',sc,{passive:true});sc();
  bg.addEventListener('click',function(){var o=top.classList.toggle('open');bg.setAttribute('aria-expanded',o);bg.setAttribute('aria-label',o?'Zamknij menu':'Otwórz menu')});
  document.querySelectorAll('.menu a').forEach(function(a){a.addEventListener('click',function(){top.classList.remove('open');bg.setAttribute('aria-expanded','false')})});
  var links=[].slice.call(document.querySelectorAll('.menu a[href^="#"]'));
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){links.forEach(function(l){l.classList.toggle('on',l.getAttribute('href')==='#'+e.target.id)})}})},{rootMargin:'-45% 0px -50% 0px'});
    links.forEach(function(l){var t=document.querySelector(l.getAttribute('href'));if(t)io.observe(t)});
  }
  var sel=document.getElementById('pakiet');
  document.querySelectorAll('[data-pakiet]').forEach(function(a){a.addEventListener('click',function(){if(!sel)return;for(var i=0;i<sel.options.length;i++){if(sel.options[i].text===a.dataset.pakiet){sel.selectedIndex=i;break}}})});
  var f=document.getElementById('form');
  if(f){f.addEventListener('submit',function(e){e.preventDefault();document.getElementById('ok').textContent='To wersja robocza strony - formularz zacznie wysyłać zamówienia po podłączeniu skrzynki.'})}
  var ad=document.getElementById('adr');
  if(ad){ad.addEventListener('submit',function(e){e.preventDefault();var u=ad.ulica.value.trim(),n=ad.numer.value.trim(),fa=document.querySelector('#form [name=adres]');if(!u){ad.ulica.focus();return}if(fa){fa.value='ul. '+u+(n?' '+n:'')+', Wrocław'}var z=document.getElementById('zamow');if(z)z.scrollIntoView({behavior:'smooth'});var im=document.querySelector('#form [name=imie]');if(im)setTimeout(function(){im.focus({preventScroll:true})},600)})}
  var m=document.getElementById('mapa');
  function load(){if(m.dataset.ok)return;m.dataset.ok=1;var fr=document.createElement('iframe');fr.src=m.dataset.src;fr.title=m.querySelector('.ph').textContent;fr.loading='lazy';fr.referrerPolicy='no-referrer-when-downgrade';m.appendChild(fr)}
  if(m){if('IntersectionObserver' in window){var mo=new IntersectionObserver(function(es){if(es[0].isIntersecting){load();mo.disconnect()}},{rootMargin:'300px'});mo.observe(m)}else load()}
})();
