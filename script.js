const $=s=>document.querySelector(s);
/* start + menu */
$('#go').onclick=()=>$('#start').classList.add('gone');
$('#mb').onclick=e=>{e.stopPropagation();const o=$('#menu').classList.toggle('open');$('#mb').textContent=o?'✕':'☰'};
document.addEventListener('click',e=>{if(!e.target.closest('.nav')){$('#menu').classList.remove('open');$('#mb').textContent='☰'}});
document.querySelectorAll('#menu a').forEach(a=>a.onclick=()=>{$('#menu').classList.remove('open');$('#mb').textContent='☰'});
/* typing */
const roles=['Full Stack Python Web Developer','Web Developer','AI Engineer','Backend Developer','Problem Solver','Computer Science Engineer'];
let ri=0,ci=0,dl=false;
(function t(){const w=roles[ri];$('#ty').textContent=w.slice(0,ci);let d=dl?35:75;
if(!dl&&ci===w.length){dl=true;d=1500}else if(dl&&ci===0){dl=false;ri=(ri+1)%roles.length;d=350}else ci+=dl?-1:1;setTimeout(t,d)})();
/* progress + level */
const secs=[$('#home'),...document.querySelectorAll('section[data-lv]')];
secs[0].dataset.lv='Start';
const links=[...document.querySelectorAll('#menu a')];
function prog(){const h=document.documentElement.scrollHeight-innerHeight;$('#bar').style.width=Math.min(100,scrollY/h*100)+'%';
let i=0;secs.forEach((s,k)=>{if(s.getBoundingClientRect().top<innerHeight*.5)i=k});
links.forEach(a=>a.classList.toggle('act',a.getAttribute('href')==='#'+secs[i].id))}
addEventListener('scroll',prog,{passive:true});prog();
/* reveal */
const io=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.1});
document.querySelectorAll('.rv').forEach(e=>io.observe(e));
/* project reveal */
document.querySelectorAll('.proj').forEach(p=>p.onclick=()=>{p.classList.toggle('open');p.setAttribute('aria-expanded',p.classList.contains('open'))});
document.querySelectorAll('.flip').forEach(f=>f.onclick=()=>f.classList.toggle('on'));
/* particles */
const cv=$('#fx'),cx=cv.getContext('2d');let W,H,P=[],B=[],M={x:-999,y:-999};
const cols=['94,225,255','47,123,255','124,108,255'];
function rs(){const r=devicePixelRatio||1;W=innerWidth;H=innerHeight;cv.width=W*r;cv.height=H*r;cx.setTransform(r,0,0,r,0,0);
const n=Math.min(90,Math.floor(W*H/14000));P=Array.from({length:n},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.45,vy:(Math.random()-.5)*.45,r:Math.random()*1.8+.6,c:cols[Math.floor(Math.random()*3)]}))}
rs();addEventListener('resize',rs);
addEventListener('pointermove',e=>{M.x=e.clientX;M.y=e.clientY});
function burst(x,y){for(let i=0;i<22;i++){const a=Math.random()*6.28,s=Math.random()*3+1;B.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,l:1,c:cols[i%3]})}}
function fr(){cx.clearRect(0,0,W,H);
for(const p of P){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;
const dx=p.x-M.x,dy=p.y-M.y,d=Math.hypot(dx,dy);if(d<110){p.x+=dx/d*1.2;p.y+=dy/d*1.2}
cx.beginPath();cx.arc(p.x,p.y,p.r,0,6.28);cx.fillStyle='rgba('+p.c+',.85)';cx.shadowBlur=8;cx.shadowColor='rgba('+p.c+',1)';cx.fill()}
cx.shadowBlur=0;
for(let i=0;i<P.length;i++)for(let j=i+1;j<P.length;j++){const d=Math.hypot(P[i].x-P[j].x,P[i].y-P[j].y);if(d<115){cx.strokeStyle='rgba(90,162,255,'+(.22*(1-d/115))+')';cx.lineWidth=.7;cx.beginPath();cx.moveTo(P[i].x,P[i].y);cx.lineTo(P[j].x,P[j].y);cx.stroke()}}
B=B.filter(b=>b.l>0);for(const b of B){b.x+=b.vx;b.y+=b.vy;b.vx*=.96;b.vy*=.96;b.l-=.025;cx.beginPath();cx.arc(b.x,b.y,2,0,6.28);cx.fillStyle='rgba('+b.c+','+b.l+')';cx.fill()}
requestAnimationFrame(fr)}
if(!matchMedia('(prefers-reduced-motion:reduce)').matches)fr();
/* glowing skill chips */
document.querySelectorAll('.chip').forEach(c=>c.addEventListener('click',e=>{
c.classList.toggle('on');const r=c.getBoundingClientRect(),s=Math.max(r.width,r.height)*2,rp=document.createElement('span');
rp.className='rp';rp.style.cssText='width:'+s+'px;height:'+s+'px;left:'+(e.clientX-r.left-s/2)+'px;top:'+(e.clientY-r.top-s/2)+'px';c.appendChild(rp);setTimeout(()=>rp.remove(),650);
if(c.classList.contains('on'))burst(r.left+r.width/2,r.top+r.height/2)}));
