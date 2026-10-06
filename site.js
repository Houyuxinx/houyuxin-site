
(function(){
  var path=(location.pathname.split('/').pop()||'index.html');
  var active=path.indexOf('work-')===0?'theatre':path.replace('.html','');
  var header=document.querySelector('.site-head');
  if(header){header.innerHTML='<a class="brand-link" href="index.html">侯宇鑫<small>HOU YUXIN</small></a><nav class="global-nav"><a href="theatre.html"'+(active==='theatre'?' class="active"':'')+'>戏剧</a><a href="poetry.html"'+(active==='poetry'?' class="active"':'')+'>诗歌</a><a href="music.html"'+(active==='music'?' class="active"':'')+'>音乐</a><a href="searching.html"'+(active==='searching'?' class="active"':'')+'>寻找自己</a></nav>'}
  if(path!=='index.html'){
    var back=document.createElement('a');back.className='back-link';
    if(path.indexOf('work-')===0){back.href='theatre.html';back.textContent='← 返回戏剧'}else{back.href='index.html';back.textContent='← 返回主页'}
    document.body.appendChild(back);
  }
  var vig=document.createElement('div');vig.className='spot-vignette';var pool=document.createElement('div');pool.className='spot-pool';document.body.appendChild(vig);document.body.appendChild(pool);
  var tx=innerWidth/2,ty=innerHeight/2,x=tx,y=ty;document.documentElement.style.setProperty('--spot-x',x+'px');document.documentElement.style.setProperty('--spot-y',y+'px');
  function frame(){x+=(tx-x)*.18;y+=(ty-y)*.18;document.documentElement.style.setProperty('--spot-x',x+'px');document.documentElement.style.setProperty('--spot-y',y+'px');requestAnimationFrame(frame)}frame();
  document.addEventListener('mousemove',function(e){tx=e.clientX;ty=e.clientY;document.body.classList.add('spot-on')},{passive:true});
  document.documentElement.addEventListener('mouseleave',function(){document.body.classList.remove('spot-on')});
  document.documentElement.addEventListener('mouseenter',function(){document.body.classList.add('spot-on')});
  var obs=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('is-visible');obs.unobserve(e.target)}})},{threshold:.06,rootMargin:'0px 0px -4% 0px'});document.querySelectorAll('.reveal').forEach(function(el){obs.observe(el)});
})();
