/* Music list/player uses the same full-screen dark curtain as page navigation.
   All track metadata, lyrics, audio source paths and native controls are unchanged. */
(function(){
  'use strict';
  var tracks=window.TRACKS;
  var list=document.getElementById('trackList');
  var view=document.getElementById('playerView');
  var title=document.getElementById('songTitle');
  var meta=document.getElementById('songMeta');
  var credit=document.getElementById('songCredit');
  var lyrics=document.getElementById('songLyrics');
  var audio=document.getElementById('songAudio');
  var back=document.querySelector('.site-head .back-link');
  var lyricsLabel=document.getElementById('lyricsLabel');
  var lyricsHint=document.getElementById('lyricsHint');
  var busy=false;
  if(!tracks||!list||!view||!audio)return;

  // An idle lyric pane should not show a scrollbar. The scrollbar thumb
  // becomes visible during a real scroll, then disappears shortly after.
  var lyricScrollTimer=null;
  function resetLyricScrollbar(){
    if(lyricScrollTimer!==null){
      clearTimeout(lyricScrollTimer);
      lyricScrollTimer=null;
    }
    lyrics.classList.remove('is-scrolling');
  }
  lyrics.addEventListener('scroll',function(){
    if(view.hidden||lyrics.classList.contains('no-lyrics'))return;
    lyrics.classList.add('is-scrolling');
    if(lyricScrollTimer!==null)clearTimeout(lyricScrollTimer);
    lyricScrollTimer=setTimeout(function(){
      lyricScrollTimer=null;
      lyrics.classList.remove('is-scrolling');
    },1100);
  },{passive:true});

  function updateReturn(){
    if(!back)return;
    var destination=view.hidden?'返回首页':'返回曲目列表';
    back.href=view.hidden?'index.html#entry-revealed':'#trackList';
    back.setAttribute('aria-label','回到来处：'+destination);
    back.title=destination;
  }
  function fade(swap){
    if(window.ECHYOXFade && typeof window.ECHYOXFade.transitionInside==='function'){
      return window.ECHYOXFade.transitionInside(swap);
    }
    swap();return true;
  }
  function showTrack(track){
    resetLyricScrollbar();
    list.hidden=true;
    view.hidden=false;
    document.documentElement.classList.add('music-open');
    document.body.classList.add('music-open');
    title.textContent=track.title;
    title.classList.toggle('long-title',track.title.length>14);
    meta.textContent=track.meta;
    credit.textContent=track.credit;
    lyrics.textContent=track.lyrics||'器乐作品 · 无歌词';
    lyrics.className=track.lyrics?'lyrics':'lyrics no-lyrics';
    lyrics.scrollTop=0;
    lyrics.tabIndex=track.lyrics?0:-1;
    lyrics.setAttribute('aria-label',track.lyrics?'歌词，可单独上下滚动':'器乐作品，无歌词');
    lyricsLabel.textContent=track.lyrics?'歌词':'器乐';
    lyricsHint.hidden=!track.lyrics;
    updateReturn();
  }
  function openTrack(key){
    var track=tracks[key];
    if(!track||busy)return;
    busy=true;
    // Start audio inside the user's click gesture for Safari autoplay rules.
    // Never play automatically when a song is selected.
    // Set the source at the dark midpoint; the user must press native Play.
    audio.pause();
    if(!fade(function(){
      audio.autoplay=false;
      audio.removeAttribute('autoplay');
      audio.src=track.src;
      audio.load();
      showTrack(track);
      busy=false;
    }))busy=false;
  }
  function showList(){
    resetLyricScrollbar();
    audio.pause();
    view.hidden=true;
    list.hidden=false;
    document.documentElement.classList.remove('music-open');
    document.body.classList.remove('music-open');
    if(back)back.removeAttribute('aria-busy');
    updateReturn();
    window.scrollTo({top:0,behavior:'instant'});
    busy=false;
  }
  function returnToList(){
    if(busy||view.hidden)return;
    busy=true;
    audio.pause();
    if(back)back.setAttribute('aria-busy','true');
    if(!fade(showList)){busy=false;if(back)back.removeAttribute('aria-busy');}
  }
  document.querySelectorAll('[data-track]').forEach(function(button){
    button.addEventListener('click',function(){openTrack(button.getAttribute('data-track'));});
  });
  if(back)back.addEventListener('click',function(event){
    if(view.hidden||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
    event.preventDefault();
    returnToList();
  });
  updateReturn();
})();