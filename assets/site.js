
const menuBtn=document.querySelector('.menu-btn');
const navLinks=document.querySelector('.nav-links');
if(menuBtn&&navLinks){
 menuBtn.addEventListener('click',()=>{
   const open=navLinks.dataset.open==='1';
   navLinks.dataset.open=open?'0':'1';
   if(open){navLinks.removeAttribute('style')}
   else{Object.assign(navLinks.style,{display:'flex',position:'absolute',top:'82px',left:'14px',right:'14px',background:'#F7F5F0',padding:'18px',border:'1px solid #D9DDD8',borderRadius:'12px',flexDirection:'column',alignItems:'flex-start',boxShadow:'0 20px 45px rgba(13,32,56,.10)'})}
 })
}
document.querySelectorAll('.section,.theme-card,.publication-card,.engagement-tile').forEach(el=>el.classList.add('fade-up'));
const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.08});
document.querySelectorAll('.fade-up').forEach(el=>io.observe(el));

const search=document.querySelector('#pubSearch');
const buttons=[...document.querySelectorAll('[data-filter]')];
const cards=[...document.querySelectorAll('.publication-card')];
let active='all';
function applyFilters(){
 const q=(search?.value||'').toLowerCase().trim();
 cards.forEach(c=>{
   const text=c.innerText.toLowerCase();
   const tags=(c.dataset.tags||'').toLowerCase();
   const okFilter=active==='all'||tags.includes(active);
   const okSearch=!q||text.includes(q)||tags.includes(q);
   c.style.display=(okFilter&&okSearch)?'grid':'none';
 });
}
buttons.forEach(b=>b.addEventListener('click',()=>{buttons.forEach(x=>x.classList.remove('active'));b.classList.add('active');active=b.dataset.filter;applyFilters()}));
search?.addEventListener('input',applyFilters);

document.querySelectorAll('a[target="_blank"]').forEach(a=>{
  a.rel='noopener noreferrer';
});
const visibleCount=document.querySelector('#pubVisibleCount');
function updateVisiblePubCount(){
  if(!visibleCount) return;
  const visible=[...document.querySelectorAll('.publication-card')].filter(x=>x.style.display!=='none').length;
  visibleCount.textContent=visible;
}
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>setTimeout(updateVisiblePubCount,0)));
document.querySelector('#pubSearch')?.addEventListener('input',()=>setTimeout(updateVisiblePubCount,0));
updateVisiblePubCount();
