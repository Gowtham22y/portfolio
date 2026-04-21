/* PRELOADER */
window.addEventListener('load',()=>setTimeout(()=>document.getElementById('preloader').classList.add('hide'),800));

/* YEAR */
document.getElementById('year').textContent=new Date().getFullYear();

/* CURSOR */
const cO=document.getElementById('cO'),cI=document.getElementById('cI');
let mx=0,my=0,ox=0,oy=0;
if(window.matchMedia('(pointer:fine)').matches){
  document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cI.style.left=mx+'px';cI.style.top=my+'px';});
  (function loop(){ox+=(mx-ox)*0.12;oy+=(my-oy)*0.12;cO.style.left=ox+'px';cO.style.top=oy+'px';requestAnimationFrame(loop);})();
  const attachCH=()=>document.querySelectorAll('a,button,.proj-card,.tg,.tool-pill,.c-link,.exp-block').forEach(el=>{
    if(el._ch)return;el._ch=true;
    el.addEventListener('mouseenter',()=>document.body.classList.add('ch'));
    el.addEventListener('mouseleave',()=>document.body.classList.remove('ch'));
  });
  attachCH();
}

/* SCROLL PROGRESS */
window.addEventListener('scroll',()=>{
  const d=document.documentElement;
  document.getElementById('spg').style.width=((d.scrollTop/(d.scrollHeight-d.clientHeight))*100||0)+'%';
},{passive:true});

/* SCROLL TO TOP */
const topBtn=document.getElementById('scrollTopBtn');
window.addEventListener('scroll',()=>topBtn.classList.toggle('visible',window.scrollY>300),{passive:true});
topBtn.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

/* THEME TOGGLE */
const themeToggle=document.getElementById('themeToggle');
const themeIcon=document.getElementById('themeIcon');
let isDark=document.documentElement.getAttribute('data-theme')==='dark';
themeIcon.className=isDark?'fa-solid fa-moon':'fa-solid fa-sun';
themeToggle.addEventListener('click',()=>{
  isDark=!isDark;
  document.documentElement.setAttribute('data-theme',isDark?'dark':'light');
  themeIcon.className=isDark?'fa-solid fa-moon':'fa-solid fa-sun';
});

/* MOBILE MENU */
const menuToggle=document.getElementById('menuToggle');
const mobSidebar=document.getElementById('mobSidebar');
const mobOverlay=document.getElementById('mobOverlay');
const mobClose=document.getElementById('mobClose');
const openMenu=()=>{mobSidebar.classList.add('open');mobOverlay.classList.add('open');menuToggle.classList.add('open');document.body.style.overflow='hidden';};
const closeMenu=()=>{mobSidebar.classList.remove('open');mobOverlay.classList.remove('open');menuToggle.classList.remove('open');document.body.style.overflow='';};
menuToggle.addEventListener('click',()=>mobSidebar.classList.contains('open')?closeMenu():openMenu());
mobClose.addEventListener('click',closeMenu);
mobOverlay.addEventListener('click',closeMenu);
document.querySelectorAll('.mob-nav a,.mob-hire').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});

/* ACTIVE NAV ON SCROLL */
const sections=document.querySelectorAll('section[id]');
const navLinks=document.querySelectorAll('.nav-menu a');
const mobLinks=document.querySelectorAll('.mob-nav a');
function setActive(){
  let cur='';
  sections.forEach(s=>{if(window.scrollY>=s.offsetTop-100)cur=s.id;});
  navLinks.forEach(a=>{a.classList.toggle('active',a.getAttribute('href')==='#'+cur);});
  mobLinks.forEach(a=>{a.classList.toggle('active-mob',a.getAttribute('href')==='#'+cur);});
  document.querySelectorAll('.nav-menu li').forEach(li=>li.classList.toggle('active-li',!!li.querySelector('a.active')));
}
window.addEventListener('scroll',setActive,{passive:true});
setActive();

/* AOS SCROLL REVEAL */
const aosEls=document.querySelectorAll('.afu,.afr,.afl');
const obs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('anim');obs.unobserve(e.target);}});
},{threshold:0.1});
aosEls.forEach(el=>obs.observe(el));

/* SKILL BARS — trigger on scroll */
const barObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(!e.isIntersecting)return;
    e.target.querySelectorAll('.tf').forEach(b=>{b.style.width=b.dataset.w+'%';});
    barObs.unobserve(e.target);
  });
},{threshold:0.25});
document.querySelectorAll('.sbl,.skills-bars-wrap').forEach(el=>barObs.observe(el));

