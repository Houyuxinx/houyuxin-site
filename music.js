
(function(){
  var d=window.TRACKS,list=document.getElementById('trackList'),view=document.getElementById('playerView'),title=document.getElementById('songTitle'),meta=document.getElementById('songMeta'),credit=document.getElementById('songCredit'),lyrics=document.getElementById('songLyrics'),audio=document.getElementById('songAudio'),back=document.querySelector('.site-head .back-link');
  function updateReturn(){
    if(!back)return;
    var destination=view.hidden?'返回首页':'返回曲目列表';
    back.href=view.hidden?'index.html':'#trackList';
    back.setAttribute('aria-label','回到来处：'+destination);back.title=destination;
  }
  function open(k){
    var t=d[k];list.hidden=true;view.hidden=false;title.textContent=t.title;meta.textContent=t.meta;credit.textContent=t.credit;audio.src=t.src;lyrics.textContent=t.lyrics||'无歌词。';lyrics.className=t.lyrics?'lyrics':'lyrics no-lyrics';updateReturn();window.scrollTo({top:0,behavior:'smooth'});audio.play().catch(function(){});
  }
  document.querySelectorAll('[data-track]').forEach(function(b){b.addEventListener('click',function(){open(b.getAttribute('data-track'))})});
  if(back)back.addEventListener('click',function(event){
    if(view.hidden||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
    event.preventDefault();audio.pause();view.hidden=true;list.hidden=false;updateReturn();window.scrollTo({top:0,behavior:'smooth'});
  });
  updateReturn();
})();
