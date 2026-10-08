
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
  if(header){header.innerHTML='<a class="brand-link" href="index.html?entry=1">侯宇鑫<small>HOU YUXIN</small></a><nav class="global-nav"><a href="index.html#entry-revealed"'+(active==='index'?' class="active"':'')+'>主页</a><a href="theatre.html"'+(active==='theatre'?' class="active"':'')+'>戏剧</a><a href="poetry.html"'+(active==='poetry'?' class="active"':'')+'>诗歌</a><a href="music.html"'+(active==='music'?' class="active"':'')+'>音乐</a><a href="searching.html"'+(active==='searching'?' class="active"':'')+'>寻找自己</a></nav>'}
  if(path!=='index.html'&&header){
    var back=document.createElement('a');back.className='back-link';
    var destination=path.indexOf('work-')===0?'返回戏剧':'返回首页';
    back.href=path.indexOf('work-')===0?'theatre.html':'index.html#entry-revealed';
    back.innerHTML='<span aria-hidden="true">←</span><span>回到来处</span>';
    back.setAttribute('aria-label','回到来处：'+destination);back.title=destination;
    header.classList.add('has-back');document.documentElement.classList.add('has-back-nav');
    header.insertBefore(back,header.querySelector('.global-nav'));
  }
  var vig=document.createElement('div');vig.className='spot-vignette';var pool=document.createElement('div');pool.className='spot-pool';document.body.appendChild(vig);document.body.appendChild(pool);
  // The old script requested animation frames FOREVER, even with no pointer input.
  // Only animate the spotlight while the pointer actually moves.
  var tx=innerWidth/2,ty=innerHeight/2,x=tx,y=ty,spotFrame=null;
  // Avoid invalidating the styles of the whole document on pointer movement.
  // The vignette is static; only move the small light element itself.
  function moveSpot(){
    pool.style.transform='translate3d('+(x-260).toFixed(1)+'px,'+(y-260).toFixed(1)+'px,0)';
  }
  moveSpot();
  function spotStep(){
    spotFrame=null;
    if(document.hidden||document.body.classList.contains('entry-active')||
       document.documentElement.classList.contains('site-fade-leaving')||
       document.documentElement.classList.contains('site-fade-arriving'))return;
    x+=(tx-x)*.22;y+=(ty-y)*.22;
    moveSpot();
    if(Math.abs(tx-x)+Math.abs(ty-y)>1)spotFrame=requestAnimationFrame(spotStep);
  }
  function requestSpot(){
    if(spotFrame===null&&!document.hidden)spotFrame=requestAnimationFrame(spotStep);
  }
  document.addEventListener('mousemove',function(e){
    tx=e.clientX;ty=e.clientY;
    // Do not revive the old radial spotlight over the four-card homepage.
    // The page return is handled solely by the dark fade in navigation.js.
    if(path!=='index.html'&&!document.body.classList.contains('entry-active'))document.body.classList.add('spot-on');
    requestSpot();
  },{passive:true});
  document.documentElement.addEventListener('mouseleave',function(){document.body.classList.remove('spot-on')});
  document.documentElement.addEventListener('mouseenter',function(){
    if(path!=='index.html'&&!document.body.classList.contains('entry-active'))document.body.classList.add('spot-on');
  });
  document.addEventListener('visibilitychange',function(){
    if(document.hidden&&spotFrame!==null){cancelAnimationFrame(spotFrame);spotFrame=null;}
  });
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
