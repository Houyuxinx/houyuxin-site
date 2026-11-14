/* ECHYOX — visitor-controlled appearance; no navigation or reload. */
(function(){
 'use strict';
 var root=document.documentElement,key='echyox-theme',buttons=[];
 function read(){
  try{return localStorage.getItem(key)==='dark'?'dark':'light'}catch(_){return null}
 }
 root.setAttribute('data-theme',read()||'light');
 var sun='<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
 var moon='<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M20.5 15.2A9 9 0 0 1 8.8 3.5 9 9 0 1 0 20.5 15.2Z"/></svg>';
 function apply(theme,persist){
  root.setAttribute('data-theme',theme);
  if(persist){try{localStorage.setItem(key,theme)}catch(_){}}
  var light=theme==='light',en=root.lang.toLowerCase().indexOf('en')===0;
  buttons.forEach(function(b){
   b.innerHTML=light?moon:sun;
   b.setAttribute('aria-pressed',String(light));
   b.setAttribute('aria-label',en?'Light mode':'白天模式');
   b.title=light?(en?'Switch to dark mode':'切换至黑夜模式'):(en?'Switch to light mode':'切换至白天模式');
  });
 }
 function create(parent,cls,language){
  if(!parent||parent.querySelector('.theme-switch'))return;
  var controls=document.createElement('div');controls.className=cls;
  var button=document.createElement('button');button.type='button';button.className='theme-switch';
  button.addEventListener('click',function(){apply(root.getAttribute('data-theme')==='light'?'dark':'light',true)});
  parent.appendChild(controls);
  if(language)controls.appendChild(language);
  controls.appendChild(button);buttons.push(button);
 }
 function mount(){
  var header=document.querySelector('.site-head'),gate=document.getElementById('entryGate');
  if(header)create(header,'header-theme-controls',header.querySelector('.header-language-switch'));
  if(gate)create(gate,'entry-theme-controls',gate.querySelector('.entry-language-switch'));
  apply(root.getAttribute('data-theme')||'light',false);
 }
 document.addEventListener('DOMContentLoaded',mount,{once:true});
 window.addEventListener('pageshow',function(){var theme=read();if(theme)apply(theme,false)});
 window.addEventListener('storage',function(e){if(e.key===key||e.key===null){var theme=read();if(theme)apply(theme,false)}});
})();
