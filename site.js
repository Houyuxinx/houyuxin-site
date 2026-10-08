
(function(){
  // Restrict ordinary copying; public assets remain accessible to the browser.
  ['copy','cut','contextmenu','selectstart','dragstart'].forEach(function(type){
    document.addEventListener(type,function(event){event.preventDefault()},true);
  });
  document.addEventListener('keydown',function(event){
    var key=event.key.toLowerCase();
    if(((event.ctrlKey||event.metaKey)&&['a','c','x','s','p'].indexOf(key)!==-1)||
       (event.ctrlKey&&key==='insert')||(event.shiftKey&&key==='delete'))event.preventDefault();
  },true);
  var path=(location.pathname.split('/').pop()||'index.html');
  var active=path.indexOf('work-')===0?'theatre':path.replace('.html','');
  var header=document.querySelector('.site-head');
  if(header){header.innerHTML='<a class="brand-link" href="index.html?entry=1">侯宇鑫<small>HOU YUXIN</small></a><nav class="global-nav"><a href="theatre.html"'+(active==='theatre'?' class="active"':'')+'>戏剧</a><a href="poetry.html"'+(active==='poetry'?' class="active"':'')+'>诗歌</a><a href="music.html"'+(active==='music'?' class="active"':'')+'>音乐</a><a href="searching.html"'+(active==='searching'?' class="active"':'')+'>寻找自己</a></nav>'}
  if(path!=='index.html'&&header){
    var back=document.createElement('a');back.className='back-link';
    var destination=path.indexOf('work-')===0?'返回戏剧':'返回首页';
    back.href=path.indexOf('work-')===0?'theatre.html':'index.html';
    back.innerHTML='<span aria-hidden="true">←</span><span>回到来处</span>';
    back.setAttribute('aria-label','回到来处：'+destination);back.title=destination;
    header.classList.add('has-back');document.documentElement.classList.add('has-back-nav');
    header.insertBefore(back,header.querySelector('.global-nav'));
  }
  var vig=document.createElement('div');vig.className='spot-vignette';var pool=document.createElement('div');pool.className='spot-pool';document.body.appendChild(vig);document.body.appendChild(pool);
  var tx=innerWidth/2,ty=innerHeight/2,x=tx,y=ty;document.documentElement.style.setProperty('--spot-x',x+'px');document.documentElement.style.setProperty('--spot-y',y+'px');
  function frame(){x+=(tx-x)*.18;y+=(ty-y)*.18;document.documentElement.style.setProperty('--spot-x',x+'px');document.documentElement.style.setProperty('--spot-y',y+'px');requestAnimationFrame(frame)}frame();
  document.addEventListener('mousemove',function(e){tx=e.clientX;ty=e.clientY;document.body.classList.add('spot-on')},{passive:true});
  document.documentElement.addEventListener('mouseleave',function(){document.body.classList.remove('spot-on')});
  document.documentElement.addEventListener('mouseenter',function(){document.body.classList.add('spot-on')});
  var obs=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('is-visible');obs.unobserve(e.target)}})},{threshold:.06,rootMargin:'0px 0px -4% 0px'});document.querySelectorAll('.reveal').forEach(function(el){obs.observe(el)});

  // Enhance every audio player, including the shared music player and work concept tracks.
  document.querySelectorAll('audio').forEach(function(audio){
    if(audio.dataset.loopControlReady)return;
    audio.dataset.loopControlReady='true';
    var controls=document.createElement('div');controls.className='audio-options';
    var button=document.createElement('button');button.type='button';button.className='audio-loop';
    button.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M17 3l4 4-4 4M21 7H7a4 4 0 0 0-4 4M7 21l-4-4 4-4M3 17h14a4 4 0 0 0 4-4"/></svg><span>单曲循环</span>';
    var state=document.createElement('span');state.className='audio-loop-state';state.setAttribute('aria-hidden','true');button.appendChild(state);
    function sync(){
      button.setAttribute('aria-pressed',audio.loop?'true':'false');
      state.textContent=audio.loop?'已开启':'已关闭';
    }
    button.addEventListener('click',function(){audio.loop=!audio.loop;sync()});
    audio.addEventListener('loadedmetadata',sync);
    window.addEventListener('pageshow',sync);
    sync();controls.appendChild(button);audio.insertAdjacentElement('afterend',controls);
  });
})();
