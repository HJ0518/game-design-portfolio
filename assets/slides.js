'use strict';
for(const deck of document.querySelectorAll('[data-deck]')){
 const slides=[...deck.querySelectorAll('.deck-slide')];
 const controls=deck.querySelector('[data-controls]');
 const previous=deck.querySelector('[data-prev]'),next=deck.querySelector('[data-next]');
 const jump=deck.querySelector('[data-jump]'),counter=deck.querySelector('[data-counter]');
 if(!slides.length||!controls||!previous||!next||!jump||!counter) continue;
 let current=0;
 function show(requested){
  if(!Number.isInteger(requested)) return;
  current=Math.min(slides.length-1,Math.max(0,requested));
  slides.forEach((slide,i)=>{slide.hidden=i!==current});
  slides[current].querySelector('img').loading='eager';
  jump.value=String(current);
  counter.textContent=(current+1)+' / '+slides.length;
  const focus=document.activeElement;
  previous.disabled=current===0;
  next.disabled=current===slides.length-1;
  if(focus===previous&&previous.disabled) next.focus();
  if(focus===next&&next.disabled) previous.focus();
 }
 previous.addEventListener('click',()=>show(current-1));
 next.addEventListener('click',()=>show(current+1));
 jump.addEventListener('change',()=>show(Number(jump.value)));
 deck.addEventListener('keydown',event=>{
  if(event.target===jump||event.ctrlKey||event.altKey||event.metaKey) return;
  if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();show(current+(event.key==='ArrowLeft'?-1:1));}
 });
 controls.hidden=false;
 show(0);
}
