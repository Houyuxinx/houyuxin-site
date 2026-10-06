
(function(){
  var d=window.TRACKS,list=document.getElementById('trackList'),view=document.getElementById('playerView'),title=document.getElementById('songTitle'),meta=document.getElementById('songMeta'),credit=document.getElementById('songCredit'),lyrics=document.getElementById('songLyrics'),audio=document.getElementById('songAudio'),back=document.querySelector('.site-head .back-link');
  var lyricsLabel=document.getElementById('lyricsLabel'),lyricsHint=document.getElementById('lyricsHint');
  var busy=false,operation=0;
  function updateReturn(){
    if(!back)return;
    var destination=view.hidden?'返回首页':'返回曲目列表';
    back.href=view.hidden?'index.html':'#trackList';
    back.setAttribute('aria-label','回到来处：'+destination);back.title=destination;
  }
  function once(callback){
    var called=false;
    return function(){
      if(called)return;
      called=true;callback();
    };
  }
  function release(id){
    if(id!==operation)return;
    busy=false;
    if(back)back.removeAttribute('aria-busy');
  }
  function swapLocal(options){
    if(busy)return Promise.resolve(false);
    busy=true;
    var id=++operation;
    var beforeExit=once(options.beforeExit||function(){});
    var swap=once(options.swap||function(){});
    var afterEnter=once(options.afterEnter||function(){});
    var request={kind:options.kind,outgoing:options.outgoing,incoming:options.incoming,beforeExit:beforeExit,swap:swap,afterEnter:afterEnter};
    var result;
    try{
      if(window.SiteTransitions&&typeof window.SiteTransitions.swapLocal==='function'){
        result=window.SiteTransitions.swapLocal(request);
      }else{
        beforeExit();swap();afterEnter();result=true;
      }
    }catch(error){
      beforeExit();swap();afterEnter();result=true;
    }
    return Promise.resolve(result).then(function(completed){
      release(id);return completed;
    },function(){
      if(id===operation){beforeExit();swap();afterEnter();}
      release(id);return true;
    });
  }
  function populate(t){
    title.textContent=t.title;title.classList.toggle('long-title',t.title.length>14);meta.textContent=t.meta;credit.textContent=t.credit;audio.src=t.src;
    lyrics.textContent=t.lyrics||'器乐作品 · 无歌词';lyrics.className=t.lyrics?'lyrics':'lyrics no-lyrics';lyrics.scrollTop=0;lyrics.tabIndex=t.lyrics?0:-1;
    lyrics.setAttribute('aria-label',t.lyrics?'歌词，可单独上下滚动':'器乐作品，无歌词');lyricsLabel.textContent=t.lyrics?'歌词':'器乐';lyricsHint.hidden=!t.lyrics;
  }
  function open(k){
    var t=d[k];if(!t)return;
    swapLocal({
      kind:'music-open',outgoing:list,incoming:view,
      beforeExit:function(){populate(t);audio.play().catch(function(){});},
      swap:function(){
        list.hidden=true;view.hidden=false;
        document.documentElement.classList.add('music-open');document.body.classList.add('music-open');
        updateReturn();
      }
    });
  }
  function returnToList(){
    swapLocal({
      kind:'music-return',outgoing:view,incoming:list,
      beforeExit:function(){audio.pause();if(back)back.setAttribute('aria-busy','true');},
      swap:function(){
        view.hidden=true;list.hidden=false;
        document.documentElement.classList.remove('music-open');document.body.classList.remove('music-open');
        updateReturn();window.scrollTo({top:0,behavior:'instant'});
      },
      afterEnter:function(){if(back)back.removeAttribute('aria-busy');}
    });
  }
  document.querySelectorAll('[data-track]').forEach(function(b){b.addEventListener('click',function(){open(b.getAttribute('data-track'))})});
  if(back)back.addEventListener('click',function(event){
    if(view.hidden||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
    event.preventDefault();returnToList();
  });
  window.addEventListener('pagehide',function(){
    operation+=1;busy=false;audio.pause();if(back)back.removeAttribute('aria-busy');
  });
  updateReturn();
})();
