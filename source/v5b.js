/* ===== v5b: 중앙 사무국 화면 (전국 현황·조직 트리·결재함·공지 발송·권한·자동화·리포트) ===== */
function svgGrid(W,H,L,R,T,B,max,unit){return [0,.25,.5,.75,1].map(f=>{const v=Math.round(max*f),yy=T+(H-T-B)*(1-v/max);return`<line class="gl" x1="${L}" x2="${W-R}" y1="${yy.toFixed(1)}" y2="${yy.toFixed(1)}"/><text x="${L-6}" y="${(yy+4).toFixed(1)}" text-anchor="end">${v}${unit}</text>`}).join("")}
function svgLine(labels,data,unit,label){const W=560,H=220,L=44,R=16,T=14,B=30,max=Math.max(10,Math.ceil(Math.max(...data)/10)*10);
 const x=i=>L+i*(W-L-R)/(data.length-1),y=v=>T+(H-T-B)*(1-v/max),P=data.map((v,i)=>[x(i),y(v)]);
 const path=P.map((p,i)=>(i?"L":"M")+p[0].toFixed(1)+" "+p[1].toFixed(1)).join(" "),area=path+` L${P[P.length-1][0].toFixed(1)} ${y(0).toFixed(1)} L${P[0][0].toFixed(1)} ${y(0).toFixed(1)} Z`;
 return`<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(label)}">${svgGrid(W,H,L,R,T,B,max,unit)}<path class="ar" d="${area}"/><path class="ln" d="${path}"/>${P.map(p=>`<circle class="pt" cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="4"/>`).join("")}${labels.map((l,i)=>`<text x="${x(i).toFixed(1)}" y="${H-8}" text-anchor="middle">${l}</text>`).join("")}<text x="${P[P.length-1][0].toFixed(1)}" y="${(P[P.length-1][1]-10).toFixed(1)}" text-anchor="end" style="font-weight:700;fill:var(--brand)">${data[data.length-1]}${unit}</text></svg>`}
function svgBars(labels,data,unit,label){const W=560,H=200,L=44,R=16,T=18,B=30,max=Math.max(10,Math.ceil(Math.max(...data)/10)*10),step=(W-L-R)/data.length,bw=step*.5,y=v=>T+(H-T-B)*(1-v/max);
 return`<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(label)}">${svgGrid(W,H,L,R,T,B,max,unit)}${data.map((v,i)=>{const cx=L+(i+.5)*step,last=i===data.length-1;return`<rect class="${last?"bar1":"bar2"}" x="${(cx-bw/2).toFixed(1)}" y="${y(v).toFixed(1)}" width="${bw.toFixed(1)}" height="${(y(0)-y(v)).toFixed(1)}" rx="6"/><text x="${cx.toFixed(1)}" y="${(y(v)-5).toFixed(1)}" text-anchor="middle">${v}</text><text x="${cx.toFixed(1)}" y="${H-8}" text-anchor="middle">${labels[i]}</text>`}).join("")}</svg>`}
const MONTHS=["4월","5월","6월","7월","8월","9월","10월"];
function cDash(){const tot=BR.reduce((a,b)=>a+b.mem,0),act=BR.filter(b=>pts(b.id)>=90).length,actP=Math.round(act/BR.length*100);
 const pend=APPS.filter(a=>a.stage>=1&&a.stage<=3).length,inqOpen=BR.reduce((a,b)=>a+openInq(b.id),0),evM=EV.filter(e=>e.d.startsWith("2026-10")).length;
 const stg=[["접수",APPS.length],["지부 승인",APPS.filter(a=>a.stage>=2).length],["시·도 승인",APPS.filter(a=>a.stage>=3).length],["중앙 확정",APPS.filter(a=>a.stage>=4).length]],mx=Math.max(1,stg[0][1]);
 const lvl={},cn={};BR.forEach(b=>{lvl[b.s]=Math.max(lvl[b.s]||0,lv(pts(b.id)));cn[b.s]=(cn[b.s]||0)+1});
 let heat="";for(let yy=1;yy<=5;yy++)for(let xx=1;xx<=4;xx++){const t=SIDO.find(z=>z[1]===xx&&z[2]===yy);heat+=t?`<button class="h${lvl[t[0]]||0}" data-act="tree-s" data-sd="${t[0]}" aria-label="${t[0]} 지부 ${cn[t[0]]||0}곳, 활동 ${lvl[t[0]]||0}단계. 눌러서 조직 관리로 이동">${t[0]}<small>${cn[t[0]]?cn[t[0]]+"곳":"준비중"}</small></button>`:`<button class="hx" tabindex="-1" aria-hidden="true"></button>`}
 const warn=BR.map(b=>({b,why:[pts(b.id)<100?"활동 점수 "+pts(b.id)+"점":"",openApps(b.id)>=3?"가입 대기 "+openApps(b.id)+"건":"",openInq(b.id)>=2?"문의 "+openInq(b.id)+"건 대기":""].filter(Boolean)})).filter(x=>x.why.length).sort((a,c)=>pts(a.b.id)-pts(c.b.id)).slice(0,6);
 return shell("c-dash","전국 현황","시·도복지회와 지부의 활동, 승인 흐름, 주의가 필요한 곳을 한눈에 봅니다.",
 `<div class="mk"><a href="#c-tree"><b class="num">${tot.toLocaleString()}</b><span>전체 회원(예시)</span><br><span class="up">▲ 신규 가입 꾸준(예시)</span></a><a href="#c-tree"><b class="num">${actP}%</b><span>활동 중인 지부</span><br><span class="${actP>=60?"up":"dn"}">${act}/${BR.length}곳이 90점 이상</span></a><a href="#c-approve"><b class="num">${pend}</b><span>승인 대기</span><br><span>${APPS.filter(a=>a.stage===3).length}건은 중앙 확정 차례</span></a><a href="#c-log"><b class="num">${evM}</b><span>이번 달 행사</span><br><span>답변 대기 문의 ${inqOpen}건</span></a></div>
 <div class="two"><div class="card lift"><h3 style="margin-bottom:2px">활동 지부 비율 추이</h3><p class="small mut" style="margin:0 0 8px">지난달까지는 예시 값, 이번 달은 현재 데이터</p>${svgLine(MONTHS,[38,41,45,47,52,58,actP],"%","월별 활동 지부 비율 꺾은선 그래프")}<h3 style="margin:18px 0 2px">월별 가입 신청</h3><p class="small mut" style="margin:0 0 8px">이번 달은 현재 접수 건수</p>${svgBars(MONTHS,[18,22,25,31,29,38,APPS.length],"","월별 가입 신청 막대 그래프")}</div>
 <div class="stack"><div class="card lift"><h3 style="margin-bottom:8px">시·도별 활동</h3><div class="heat">${heat}</div><div class="legend2"><span><i style="background:var(--brand-soft)"></i>없음</span><span><i style="background:var(--t1)"></i>1</span><span><i style="background:var(--t2)"></i>2</span><span><i style="background:var(--t3)"></i>3</span><span><i style="background:var(--t4)"></i>4단계</span></div></div>
 <div class="card lift"><h3 style="margin-bottom:10px">가입 승인 흐름</h3><div class="funnel">${stg.map(s=>`<div class="fr"><span>${s[0]}</span><div class="fb"><i style="width:${Math.round(s[1]/mx*100)}%"></i></div><b class="num">${s[1]}</b></div>`).join("")}</div><p class="small mut" style="margin:10px 0 0">단계마다 줄어드는 곳이 병목입니다. 3일 넘게 머무는 신청은 자동화 규칙으로 알립니다.</p></div></div></div>
 <div class="two"><div class="card lift"><h3 style="margin-bottom:6px">주의가 필요한 지부</h3>${warn.length?`<ul class="list">${warn.map(x=>`<li><span><b>${esc(x.b.nm)}</b> <span class="small mut">${esc(x.b.s)}</span><br><span class="small mut">${x.why.join(" · ")}</span></span><button class="btn sm line" data-act="node" data-id="${x.b.id}">살펴보기</button></li>`).join("")}</ul>`:`<p class="mut" style="margin:0">지금은 주의가 필요한 지부가 없습니다.</p>`}</div>
 <div class="card lift"><h3 style="margin-bottom:6px">최근 활동 기록</h3>${auditList(5)}</div></div>`)}
/* 조직 관리 */
let TQ="";
function treeHTML(){const q=TQ.trim();return SIDO.map(s=>s[0]).sort((a,b)=>a.localeCompare(b,"ko")).map(sd=>{const bs=BR.filter(b=>b.s===sd),hit=!q||(sd+"복지회").includes(q)||bs.some(b=>(b.nm+b.d).includes(q));if(!hit)return"";
  const mem=bs.reduce((a,b)=>a+b.mem,0),avg=bs.length?Math.round(bs.reduce((a,b)=>a+pts(b.id),0)/bs.length):0;
  return`<details ${q&&bs.length?"open":""}><summary><b>${sd}복지회</b>${bs.length?`<span class="chip m">지부 ${bs.length}곳</span><span class="chip">회원 ${mem.toLocaleString()}명</span><span class="sp"></span><span class="chip ${avg>=160?"o":"m"}">평균 ${avg}점</span>`:`<span class="chip m">지부 명단 준비중</span>`}</summary>${bs.length?`<div class="kids">${bs.filter(b=>!q||(sd+"복지회").includes(q)||(b.nm+b.d).includes(q)).map(b=>`<button class="leaf" data-act="node" data-id="${b.id}"><b>${esc(b.nm)}</b><span class="chip m">${b.lg}</span><span class="sp"></span><span class="small mut">회원 ${b.mem}명</span><span class="chip ${lv(pts(b.id))>=3?"o":"m"}">${pts(b.id)}점</span>${openApps(b.id)?`<span class="chip r">승인 ${openApps(b.id)}</span>`:""}</button>`).join("")}</div>`:`<div class="kids"><p class="small mut" style="margin:0">지부 명단을 확보하면 이곳에 표시됩니다. 지부장 지정은 중앙 사무국이 도와드립니다.</p></div>`}</details>`}).join("")||`<div class="card">일치하는 조직이 없습니다.</div>`}
function cTree(){return shell("c-tree","조직 관리","중앙 → 시·도복지회 → 지부·지회 구조를 펼쳐 보고, 지부를 눌러 상태를 확인합니다. 원본 기준 시·도 17곳, 지부 223곳입니다.",
 `<div class="card lift"><div class="toolbar"><input id="tq" type="search" placeholder="시·도 또는 지부 이름 검색" value="${esc(TQ)}" aria-label="조직 검색"></div><div class="otree" id="tree">${treeHTML()}</div><p class="small mut" style="margin:10px 0 0">지부·지회 223곳 중 이 시안에는 ${BR.length}곳만 예시로 들어 있습니다.</p></div>`)}
/* 결재함 */
let APTAB="join";
const HAND=[{id:"h1",b:"gwangju-g",old:"오○○",nw:"윤○○",d:"10월 3일",s:0}];
function cApprove(){const j=APPS.filter(a=>a.stage===3),d=SUBM.map((s,i)=>({s,i})).filter(x=>x.s.s==="중앙 검토중"),h=HAND.filter(x=>x.s===0);
 const tabs=[["join","가입 확정",j.length],["docs","서류",d.length],["hand","지부장 교체",h.length]];
 const body=APTAB==="join"?(j.map(a=>`<div class="msg"><div><b>${esc(a.nm)}</b> <span class="small mut">· ${esc(br(a.b).nm)} · ${a.d} 접수</span></div>${stepBar(3)}<div class="row"><button class="btn sm ok" data-act="c-ok" data-id="${a.id}">가입 확정</button><button class="btn sm no" data-act="c-no" data-id="${a.id}">반려</button></div></div>`).join("")||`<p class="mut" style="margin:0">확정을 기다리는 가입 신청이 없습니다.</p>`)
 :APTAB==="docs"?(d.map(x=>`<div class="msg"><div><b>${esc(x.s.n)}</b> <span class="small mut">· ${esc(br(x.s.who).nm)} · ${x.s.d} 제출</span></div><div class="row"><button class="btn sm ok" data-act="d-ok" data-i="${x.i}">승인</button><button class="btn sm no" data-act="d-no" data-i="${x.i}">반려</button></div></div>`).join("")||`<p class="mut" style="margin:0">검토할 서류가 없습니다.</p>`)
 :(h.map(x=>`<div class="msg"><div><b>${esc(br(x.b).nm)}</b> <span class="small mut">· ${x.d} 요청</span></div><p style="margin:0">전임 ${x.old} → 신임 ${x.nw}</p><p class="small mut" style="margin:0">서류(위촉장·본인확인)가 접수되었습니다. 승인하면 전임자 계정이 정지되고 신임자에게 안내가 갑니다.</p><div class="row"><button class="btn sm ok" data-act="h-ok" data-id="${x.id}">승인</button></div></div>`).join("")||`<p class="mut" style="margin:0">교체 요청이 없습니다.</p>`);
 return shell("c-approve","결재함","가입 확정, 서류, 지부장 교체를 한곳에서 처리합니다. 반려는 사유를 남깁니다.",`<div class="card lift"><div class="seg2" role="group" aria-label="결재 종류">${tabs.map(t=>`<button data-act="aptab" data-k="${t[0]}" aria-pressed="${APTAB===t[0]}">${t[1]} ${t[2]}</button>`).join("")}</div><div class="stack" style="margin-top:12px">${body}</div></div>`)}
/* 공지 발송 */
const SENT=[{t:"지부장·지회장 홈페이지 사용 안내",d:"10/05 09:00",scope:"all",ch:["홈페이지","알림톡"],seed:7},{t:"회원 정보 보호 안내",d:"10/04 10:30",scope:"all",ch:["홈페이지"],seed:3}];
const scopeBr=sc=>sc==="all"?BR:BR.filter(b=>b.s===sc.slice(2)),scopeName=sc=>sc==="all"?"전국 모든 지부장":sc.slice(2)+"복지회 소속 지부";
function sentCard(s,i){const bs=scopeBr(s.scope),r=rng(s.seed*977+i*13),rt=bs.map(b=>({b,p:Math.round(35+r()*65)})),avg=Math.round(rt.reduce((a,x)=>a+x.p,0)/rt.length),un=rt.filter(x=>x.p<60);
 return`<div class="msg"><div class="row" style="justify-content:space-between"><b>${esc(s.t)}</b><span class="small mut">${s.d}</span></div><div class="row"><span class="chip m">${scopeName(s.scope)}</span>${s.ch.map(c=>`<span class="chip">${c}</span>`).join("")}</div><div class="readbar"><span>평균 읽음률</span><div class="bar"><i style="width:${avg}%"></i></div><b class="num">${avg}%</b></div><details><summary class="small" style="cursor:pointer">지부별 읽음 현황</summary>${rt.map(x=>`<div class="readbar"><span>${esc(x.b.nm)}</span><div class="bar"><i style="width:${x.p}%;background:${x.p<60?"var(--accent)":"var(--green)"}"></i></div><span class="num">${x.p}%</span></div>`).join("")}</details>${un.length?`<button class="btn sm line" data-act="resend" data-i="${i}" style="justify-self:start">읽지 않은 ${un.length}곳에 다시 알리기</button>`:""}</div>`}
function cNotice(){const ss=[...new Set(BR.map(b=>b.s))];
 return shell("c-notice","공지 발송","대상을 고르고 보내면, 지부별로 읽었는지 확인할 수 있습니다. 읽지 않은 곳에는 다시 알릴 수 있어요.",
 `<div class="two"><div class="card lift"><h3 style="margin-bottom:10px">새 공지</h3><form class="form" data-form="cnotice"><label for="ntT">제목<input id="ntT" type="text" required placeholder="예: 11월 지부장 온라인 교육 안내"></label>
 <label for="ntB">내용<textarea id="ntB" required placeholder="전달할 내용을 입력하세요"></textarea></label><button type="button" class="btn sm line" data-act="ai-notice" style="justify-self:start">AI로 다듬기 (시안)</button>
 <label for="ntS">보낼 대상<select id="ntS"><option value="all">전국 모든 지부장 (${BR.length}곳)</option>${ss.map(s=>`<option value="s:${s}">${s}복지회 소속 지부 (${BR.filter(b=>b.s===s).length}곳)</option>`).join("")}</select></label>
 <div class="pillbar" role="group" aria-label="보내는 방법" style="margin:0"><label class="switch"><input type="checkbox" id="chH" checked disabled> 홈페이지 공지</label><label class="switch"><input type="checkbox" id="chT" checked> 알림톡</label><label class="switch"><input type="checkbox" id="chS"> 문자</label></div>
 <p class="small mut" style="margin:0">알림톡·문자는 건당 비용이 듭니다(시안). 개인정보가 들어 있는 내용은 보내지 마세요.</p><button class="btn" type="submit">공지 보내기</button></form></div>
 <div class="card lift"><h3 style="margin-bottom:10px">보낸 공지와 읽음 현황</h3><div class="stack" id="sentList">${SENT.map(sentCard).join("")}</div></div></div>`)}
/* 권한 관리 */
const RB_ROLES=["중앙 사무국","시·도복지회장","지부장·지회장","간사","일반 회원"];
const RB=[["회원 명단 열람",[1,2,2,0,0]],["회원 연락처 열람 (기록 남음)",[1,0,2,0,0]],["가입 1차 승인",[0,0,2,0,0]],["가입 2차 승인",[0,2,0,0,0]],["가입 최종 확정",[1,0,0,0,0]],["행사 등록",[1,2,2,2,0]],["사진 승인·게시",[1,0,2,2,0]],["전국 공지 발송",[1,0,0,0,0]],["서류 제출",[0,2,2,0,0]],["서류 승인",[1,0,0,0,0]],["권한 변경",[1,0,0,0,0]],["활동 기록 열람",[1,2,2,0,0]]];
const RBSYM=["○","●","△"],RBCLS=["","on","sc"];
function cRbac(){const hist=AUDIT.filter(a=>a.a.startsWith("권한 변경")).slice(0,5);
 return shell("c-rbac","권한 관리","역할마다 할 수 있는 일을 정합니다. 필요한 만큼만 열어 두는 것이 원칙입니다.",
 `<div class="card lift"><div class="pillbar" style="margin-bottom:6px"><span class="chip g">● 허용</span><span class="chip">△ 본인 범위만</span><span class="chip m">○ 불가</span></div><div class="tblwrap"><table class="tbl matrix" id="rbm"><thead><tr><th>할 수 있는 일</th>${RB_ROLES.map(r=>`<th>${r}</th>`).join("")}</tr></thead><tbody>${RB.map((f,fi)=>`<tr><td data-l="기능"><b>${f[0]}</b></td>${f[1].map((v,ri)=>{const lock=ri===0||f[0]==="권한 변경";return`<td data-l="${RB_ROLES[ri]}"><button class="cellb ${RBCLS[v]} ${lock?"lk":""}" ${lock?"disabled":`data-act="rb" data-f="${fi}" data-r="${ri}"`} aria-label="${f[0]}, ${RB_ROLES[ri]}: ${["불가","허용","본인 범위만"][v]}">${RBSYM[v]}</button></td>`}).join("")}</tr>`).join("")}</tbody></table></div><p class="small mut" style="margin:10px 0 0">중앙 사무국 열과 '권한 변경' 줄은 잠겨 있습니다. 칸을 누르면 불가 → 본인 범위 → 허용 순서로 바뀝니다.</p></div>
 <div class="card"><h3 style="margin-bottom:6px">최근 권한 변경</h3>${hist.length?`<ul class="tl">${hist.map(a=>`<li><time>${a.t}</time><span>${esc(a.a)}</span></li>`).join("")}</ul>`:`<p class="mut small" style="margin:0">아직 변경 기록이 없습니다.</p>`}</div>`)}
/* 자동화 규칙 */
function daysOld(a){const m=/(\d+)일/.exec(a.d);return m?7-(+m[1]):0}
const AUTO=[
 {id:"a1",on:true,t:"가입 신청이 3일 넘게 머물면 시·도복지회장에게 알림",d:"병목을 줄입니다.",n:()=>APPS.filter(a=>a.stage===1&&daysOld(a)>=3).length,u:"건"},
 {id:"a2",on:true,t:"문의에 24시간 넘게 답이 없으면 지부장에게 알림톡",d:"응답 속도를 지킵니다.",n:()=>BR.reduce((s,b)=>s+inquiries(b.id).filter(q=>!q.done&&q.ago>=18).length,0),u:"건"},
 {id:"a3",on:false,t:"회비를 30일 넘게 내지 않은 회원에게 안내 문자",d:"지부장 확인 후 발송합니다(시안).",n:()=>BR.reduce((s,b)=>s+members(b.id).filter(m=>m.dues==="미납"&&m.st==="정상").length,0),u:"명"},
 {id:"a4",on:true,t:"활동 기록이 한 달 없으면 시·도복지회장과 중앙에 알림",d:"조용한 지부를 먼저 찾습니다.",n:()=>BR.filter(b=>pts(b.id)<=60).length,u:"곳"},
 {id:"a5",on:true,t:"휴면 회원 정보 파기 예정 안내",d:"개인정보 보유기간 관리를 돕습니다.",n:()=>BR.reduce((s,b)=>s+members(b.id).filter(m=>m.st==="휴면").length,0),u:"명"},
 {id:"a6",on:true,t:"행사가 끝나면 지부장에게 사진·후기 올리기 안내",d:"행사 후 72시간 안에 올리면 점수가 오릅니다.",n:()=>EV.filter(e=>e.d<TODAY&&e.att==null).length,u:"건"}];
function cAuto(){return shell("c-auto","자동화 규칙","반복되는 확인을 규칙으로 맡깁니다. 켜고 끄는 기록이 남습니다.",
 `<div class="card lift"><div class="row" style="justify-content:space-between;margin-bottom:6px"><h3>규칙 ${AUTO.filter(r=>r.on).length}/${AUTO.length}개 켜짐</h3><button class="btn sm line" data-act="rule-run">오늘 실행하면 어떻게 될까요</button></div>${AUTO.map(r=>`<div class="rule"><b>${r.t}</b><label class="tog" aria-label="${r.t} 켜기/끄기"><input type="checkbox" data-act="rule" data-id="${r.id}" ${r.on?"checked":""}><span></span></label><small>${r.d} 오늘 대상 ${r.n()}${r.u}</small></div>`).join("")}</div>`)}
/* 월간 리포트 */
const scopeBranches=sc=>sc==="all"?BR:sc.startsWith("s:")?BR.filter(b=>b.s===sc.slice(2)):BR.filter(b=>b.id===sc.slice(2));
const scopeLabel=sc=>sc==="all"?"전국":sc.startsWith("s:")?sc.slice(2)+"복지회":br(sc.slice(2)).nm;
function reportData(sc){const bs=scopeBranches(sc),ids=bs.map(b=>b.id),A=a=>ids.includes(a.b);
 return{bs,evs:EV.filter(e=>ids.includes(e.b)&&e.d.startsWith("2026-10")).length,ph:bs.reduce((a,b)=>a+phn(b.id),0),mem:bs.reduce((a,b)=>a+b.mem,0),avg:Math.round(bs.reduce((a,b)=>a+pts(b.id),0)/bs.length),
 wait:APPS.filter(a=>A(a)&&a.stage===1).length,mid:APPS.filter(a=>A(a)&&(a.stage===2||a.stage===3)).length,done:APPS.filter(a=>A(a)&&a.stage===4).length,inq:bs.reduce((a,b)=>a+openInq(b.id),0),
 top:[...bs].sort((a,c)=>pts(c.id)-pts(a.id))[0],low:[...bs].sort((a,c)=>pts(a.id)-pts(c.id))[0]}}
function reportText(sc){const d=reportData(sc),L=[`행사 ${d.evs}건, 사진 ${d.ph}장이 등록되었고 회원은 ${d.mem.toLocaleString()}명, 평균 활동 점수는 ${d.avg}점입니다.`];
 if(d.bs.length>1)L.push(`활동 점수가 가장 높은 곳은 ${d.top.nm}(${pts(d.top.id)}점), 가장 낮은 곳은 ${d.low.nm}(${pts(d.low.id)}점)입니다.`);
 L.push(`가입 신청은 지부 검토 ${d.wait}건, 시·도·중앙 검토 ${d.mid}건, 확정 ${d.done}건이고, 답변 대기 문의는 ${d.inq}건입니다.`);
 const R=[];if(d.wait>0)R.push(`지부 검토 대기 ${d.wait}건을 3일 안에 처리하세요.`);if(d.inq>0)R.push(`답변 대기 문의 ${d.inq}건을 24시간 안에 답하세요.`);if(d.avg<150)R.push("행사 후 72시간 안에 사진과 후기를 올리면 점수가 오릅니다.");if(!R.length)R.push("지금 처리할 일이 없습니다. 지금처럼 유지하세요.");
 return{L,R}}
function reportCard(sc){const t=reportText(sc),d=reportData(sc);
 return`<div class="card lift report" id="rcard"><h3>${esc(scopeLabel(sc))} · 2026년 10월</h3><div class="mk" style="margin:10px 0"><div><b class="num">${d.evs}</b><span>행사</span></div><div><b class="num">${d.ph}</b><span>사진</span></div><div><b class="num">${d.avg}</b><span>평균 점수</span></div><div><b class="num">${d.wait+d.mid}</b><span>진행 중 가입 신청</span></div></div>
 <h4>요약</h4>${t.L.map(p=>`<p>${esc(p)}</p>`).join("")}<h4>이번 달 권고</h4><ul>${t.R.map(p=>`<li>${esc(p)}</li>`).join("")}</ul><div class="row" style="margin-top:12px"><button class="btn sm" data-act="rpt-copy" data-sc="${sc}">리포트 글 복사</button><span class="small mut">회의 자료나 시·도 보고에 붙여 넣어 쓰세요.</span></div></div>`}
let RSC="all";
function cReport(){const ss=[...new Set(BR.map(b=>b.s))];return shell("c-report","월간 리포트","데이터로 자동 작성한 요약입니다. 범위를 바꾸면 바로 다시 만들어집니다.",
 `<div class="card"><label class="small mut" for="rsc">범위</label><select id="rsc" style="min-height:46px;border-radius:12px;border:1.5px solid var(--line);padding:0 12px;background:var(--surface);width:100%;margin-top:4px"><option value="all">전국</option>${ss.map(s=>`<option value="s:${s}">${s}복지회</option>`).join("")}${BR.map(b=>`<option value="b:${b.id}">${b.nm}</option>`).join("")}</select></div><div id="rwrap">${reportCard(RSC)}</div>`)}
function mReport(){const sc=SESS.role==="region"?"s:"+SESS.sido:"b:"+SESS.bid;return shell("m-report","월간 리포트","이번 달 활동을 자동으로 정리했습니다. 복사해서 회의 자료나 보고에 쓰세요.",reportCard(sc))}
let LOGQ="전체";
function cLog(){const f=LOGQ==="전체"?AUDIT:AUDIT.filter(a=>a.a.includes(LOGQ));return shell("c-log","활동 기록","누가 언제 무엇을 했는지 남습니다. 연락처 열람, 명단 내려받기, 권한 변경, 공지 발송도 기록됩니다.",
 `<div class="card lift"><div class="seg2" role="group" aria-label="기록 종류" style="margin-bottom:10px">${["전체","승인","열람","발송","권한"].map(k=>`<button data-act="logf" data-k="${k}" aria-pressed="${LOGQ===k}">${k}</button>`).join("")}</div>${f.length?`<ul class="tl">${f.slice(0,40).map(a=>`<li><time>${a.t}</time><span><b>${esc(a.who)}</b> ${esc(a.a)}</span></li>`).join("")}</ul>`:`<p class="mut small" style="margin:0">해당하는 기록이 없습니다.</p>`}</div>`)}
Object.assign(CROUTES,{"c-dash":cDash,"c-tree":cTree,"c-approve":cApprove,"c-notice":cNotice,"c-rbac":cRbac,"c-auto":cAuto,"c-report":cReport,"c-log":cLog});MROUTES["m-report"]=mReport;
AFTER["c-tree"]=()=>{};
/* 동작 */
const AI_OPEN="안녕하세요, 한국신체장애인복지회 사무국입니다.";
document.addEventListener("click",e=>{const t=e.target.closest("[data-act]");if(!t)return;const A=t.dataset.act,id=t.dataset.id;
 if(A==="tree-s"){TQ=t.dataset.sd;go("c-tree");return}
 if(A==="node"){const b=br(id);openModal({title:b.nm,body:`<ul class="list"><li><span class="mut">소속</span><b>${esc(b.s)} · ${b.lg} 리그</b></li><li><span class="mut">회원</span><b>${b.mem}명(예시)</b></li><li><span class="mut">이번 달 점수</span><b>${pts(id)}점 · ${b.st}개월 연속</b></li><li><span class="mut">승인 대기</span><b>${openApps(id)}건</b></li><li><span class="mut">답변 대기 문의</span><b>${openInq(id)}건</b></li></ul>`,ok:"공개 화면 보기",onOk:()=>go("room-"+id)});return}
 if(A==="aptab"){APTAB=t.dataset.k;go("c-approve");return}
 if(A==="c-ok"){const a=APPS.find(x=>x.id===id);a.stage=4;log("가입 최종 확정: "+a.nm+" ("+br(a.b).nm+")");pushNotif("branch","가입이 확정되었어요",a.nm+"님의 가입이 확정되었습니다.",{bid:a.b,go:"m-apps"});toast(a.nm+"님 가입을 확정했어요");go("c-approve");return}
 if(A==="c-no"){const a=APPS.find(x=>x.id===id);openModal({title:"가입 신청 반려",body:`<div class="form"><label for="why">사유 (지부와 신청자에게 전달됩니다)<textarea id="why" placeholder="예: 동의서가 확인되지 않아요."></textarea></label></div>`,ok:"반려하기",cls:"no",onOk:()=>{a.note=($("#why")||{}).value||"사유 미입력";a.stage=0;log("가입 반려(중앙): "+a.nm);toast("반려했어요");go("c-approve")}});return}
 if(A==="d-ok"||A==="d-no"){const s=SUBM[+t.dataset.i];s.s=A==="d-ok"?"처리 완료":"반려";log((A==="d-ok"?"서류 승인: ":"서류 반려: ")+s.n+" ("+br(s.who).nm+")");toast(A==="d-ok"?"승인했어요":"반려했어요");go("c-approve");return}
 if(A==="h-ok"){const h=HAND.find(x=>x.id===id);h.s=1;log("지부장 교체 승인: "+br(h.b).nm);toast("승인했어요. 전임자 계정이 정지됩니다(시안)");go("c-approve");return}
 if(A==="ai-notice"){const T=$("#ntT").value.trim()||"안내",B=$("#ntB").value.trim();if(!B){toast("내용을 먼저 적어 주세요");return}const first=B.split(/[.\n]/)[0].trim();$("#ntB").value=`${AI_OPEN}\n\n[${T}]\n- 핵심: ${first}\n- 자세한 내용: ${B}\n\n문의는 복지회 사무국(02-852-4775)으로 연락해 주세요. 감사합니다.`;toast("AI 초안을 넣었어요(시안). 내용을 꼭 확인하세요");return}
 if(A==="resend"){const s=SENT[+t.dataset.i];log("공지 재알림 발송: "+s.t);toast("읽지 않은 지부에 다시 알렸어요");return}
 if(A==="rb"){const f=RB[+t.dataset.f],r=+t.dataset.r,n=({0:2,2:1,1:0})[f[1][r]];f[1][r]=n;log("권한 변경: "+RB_ROLES[r]+"의 '"+f[0]+"' → "+["불가","허용","본인 범위만"][n]);toast("권한을 바꿨어요");go("c-rbac");return}
 if(A==="rule-run"){const on=AUTO.filter(r=>r.on);openModal({title:"오늘 실행하면",body:`<ul class="list">${on.map(r=>`<li><span>${r.t}</span><b>${r.n()}${r.u}</b></li>`).join("")}</ul><p class="small mut" style="margin:10px 0 0">미리보기이며 실제로 보내지 않습니다.</p>`,ok:"확인"});return}
 if(A==="rpt-copy"){const sc=t.dataset.sc,x=reportText(sc),txt=`${scopeLabel(sc)} 10월 활동 리포트\n${x.L.join("\n")}\n[권고]\n${x.R.map(s=>"- "+s).join("\n")}`;
  (navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(txt):Promise.reject()).then(()=>toast("리포트 글을 복사했어요")).catch(()=>toast("복사하지 못했어요. 화면의 글을 직접 선택해 주세요"));return}
 if(A==="logf"){LOGQ=t.dataset.k;go("c-log");return}});
document.addEventListener("input",e=>{if(e.target.id==="tq"){TQ=e.target.value;$("#tree").innerHTML=treeHTML()}});
document.addEventListener("change",e=>{const t=e.target;
 if(t.dataset&&t.dataset.act==="rule"){const r=AUTO.find(x=>x.id===t.dataset.id);r.on=t.checked;log("자동화 규칙 "+(r.on?"켬":"끔")+": "+r.t);go("c-auto")}
 if(t.id==="rsc"){RSC=t.value;$("#rwrap").innerHTML=reportCard(RSC)}});
document.addEventListener("submit",e=>{const f=e.target.closest('[data-form="cnotice"]');if(!f)return;e.preventDefault();
 const ch=["홈페이지"];if($("#chT").checked)ch.push("알림톡");if($("#chS").checked)ch.push("문자");const sc=$("#ntS").value,tt=$("#ntT").value.trim();
 SENT.unshift({t:tt,d:nowStr(),scope:sc,ch,seed:Math.floor(Math.random()*90)+10});log("공지 발송: "+tt+" ("+scopeName(sc)+", "+ch.join("·")+")");pushNotif("all","새 공지: "+tt,scopeName(sc)+"에 보낸 공지입니다.",{go:"notice"});toast("공지를 보냈어요");go("c-notice")});
