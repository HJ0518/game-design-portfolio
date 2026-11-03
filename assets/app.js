const config = window.PORTFOLIO || {profile:{},projects:{}};
function safeURL(value, email=false) {
  if (!value) return null;
  try { const u=new URL(value,location.href); return ['https:','http:','file:'].includes(u.protocol)||(email&&u.protocol==='mailto:') ? u.href : null; } catch {return null;}
}
function link(text,url){const a=document.createElement('a');a.textContent=text;a.href=url;if(new URL(url).origin!==location.origin && !url.startsWith('mailto:')){a.target='_blank';a.rel='noopener noreferrer';}return a;}
document.querySelectorAll('[data-profile="name"]').forEach(el=>{if(config.profile.name)el.textContent=config.profile.name;});
const contact=document.querySelector('#contact-links');
if(contact){if(config.profile.email)contact.append(link('이메일로 연락하기 ↗',safeURL('mailto:'+config.profile.email,true)));const resume=safeURL(config.profile.resume);if(resume)contact.append(link('이력서 보기 ↗',resume));}
document.querySelectorAll('[data-resources]').forEach(el=>{const data=config.projects[el.dataset.resources]||{};for(const [key,title] of [['document','상세 기획서'],['video','플레이·작품 영상'],['github','프로젝트 저장소']]){const url=safeURL(data[key]);if(url)el.append(link(title+' ↗',url));else{const slot=document.createElement('div');slot.className='resource-empty';slot.textContent=title+' / Placeholder · 등록 예정';el.append(slot);}}});
document.querySelectorAll('[data-image]').forEach(el=>{const data=config.projects[el.dataset.image]||{};const url=safeURL(data.image);if(!url)return;const img=document.createElement('img');img.src=url;img.alt=data.imageAlt||'프로젝트 이미지';img.loading='lazy';img.addEventListener('load',()=>el.replaceChildren(img));});
const select=document.querySelector('#order');
if(select)select.addEventListener('change',()=>{const extra=Number(select.value);document.querySelector('#order-result').textContent=`기본 1 + 추가 ${extra} = 요구 수량 ${Math.min(4,1+extra)}`;});
