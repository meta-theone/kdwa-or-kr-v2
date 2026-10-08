/* v7: 실제 행사 사진(복지회 공식 홈페이지 게시분)을 갤러리 맨 앞에 */
function renderGallery(){const s=($("#gS")||{}).value||"전체";let h="";
 if(s==="전체")PHO.forEach(p=>{h+=`<a href="#gallery" class="ph real"><img alt="${esc(p.t)}" loading="lazy" src="${p.f}"><span class="tag">${esc(p.t)}</span></a>`});
 BR.filter(b=>s==="전체"||b.s===s).forEach(b=>{(UPIMGS[b.id]||[]).forEach(u=>{h+=`<a href="#room-${b.id}" class="ph"><img alt="${esc(b.nm)} 행사 사진" src="${u}"><span class="tag">${esc(b.nm)}</span></a>`});for(let i=0;i<Math.min(PHBASE[b.id]||0,3);i++)h+=`<a href="#room-${b.id}" class="ph"><img alt="예시 사진" src="${scene(b.mem+i)}"><span class="tag">${esc(b.nm)} · 예시</span></a>`});
 $("#gList").innerHTML=(s==="전체"?`<p class="small mut" style="grid-column:1/-1;margin:0">앞쪽 ${PHO.length}장은 복지회 공식 홈페이지에 게시된 실제 행사 사진입니다. 지부·지회 방의 "예시" 그림은 지부장이 사진을 올리면 교체됩니다.</p>`:"")+(h||`<div class="card" style="grid-column:1/-1">해당 지역의 사진이 없습니다.</div>`)}
