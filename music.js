
(function(){
  var d=window.TRACKS,list=document.getElementById('trackList'),view=document.getElementById('playerView'),title=document.getElementById('songTitle'),meta=document.getElementById('songMeta'),credit=document.getElementById('songCredit'),lyrics=document.getElementById('songLyrics'),audio=document.getElementById('songAudio'),back=document.querySelector('.site-head .back-link');
  var lyricsLabel=document.getElementById('lyricsLabel'),lyricsHint=document.getElementById('lyricsHint');
  function updateReturn(){
    if(!back)return;
    var destination=view.hidden?'返回首页':'返回曲目列表';
    back.href=view.hidden?'index.html':'#trackList';
    back.setAttribute('aria-label','回到来处：'+destination);back.title=destination;
  }
  function open(k){
    var t=d[k];if(!t)return;
    list.hidden=true;view.hidden=false;document.documentElement.classList.add('music-open');document.body.classList.add('music-open');
    title.textContent=t.title;meta.textContent=t.meta;credit.textContent=t.credit;audio.src=t.src;
    lyrics.textContent=t.lyrics||'器乐作品 · 无歌词';lyrics.className=t.lyrics?'lyrics':'lyrics no-lyrics';lyrics.scrollTop=0;lyrics.tabIndex=t.lyrics?0:-1;
    lyrics.setAttribute('aria-label',t.lyrics?'歌词，可单独上下滚动':'器乐作品，无歌词');lyricsLabel.textContent=t.lyrics?'歌词':'器乐';lyricsHint.hidden=!t.lyrics;
    updateReturn();audio.play().catch(function(){});
  }
  document.querySelectorAll('[data-track]').forEach(function(b){b.addEventListener('click',function(){open(b.getAttribute('data-track'))})});
  if(back)back.addEventListener('click',function(event){
    if(view.hidden||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
    event.preventDefault();audio.pause();view.hidden=true;list.hidden=false;document.documentElement.classList.remove('music-open');document.body.classList.remove('music-open');updateReturn();window.scrollTo({top:0,behavior:'smooth'});
  });
  updateReturn();
})();
