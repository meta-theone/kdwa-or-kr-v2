/* ===== v5a: 역할(중앙 사무국)·알림·빠른 이동·최종 라우터 ===== */
ACCT.push({role:"central",name:"정하늘",title:"중앙 사무국"});
Object.assign(ICON,{bell:I('<path d="M6 9a6 6 0 0112 0c0 5 2 6 2 6H4s2-1 2-6zM10 19a2 2 0 004 0"/>'),heart:I('<path d="M12 20s-8-5-8-11a4.5 4.5 0 018-2.5A4.5 4.5 0 0120 9c0 6-8 11-8 11z"/>'),search:I('<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>'),chart:I('<path d="M4 20V4M4 20h16M8 16v-5M12 16V8M16 16v-8"/>')});
const AFTER={},CROUTES={};
const NOTIFS=[
 {id:1,aud:"all",t:"홈페이지 사용 안내",b:"지부장·지회장 화면에서 할 수 있는 일을 정리했습니다.",time:"10/05 09:00",read:false,go:"notice"},
 {id:2,aud:"branch",bid:"seongnam",t:"가입 신청이 접수되었어요",b:"승인 대기 신청이 있습니다. 3일 안에 처리하면 점수가 올라요.",time:"10/06 14:20",read:false,go:"m-apps"},
 {id:3,aud:"region",t:"2차 승인 대기",b:"지부에서 올라온 가입 신청이 있습니다.",time:"10/06 16:05",read:false,go:"m-r2"},
 {id:4,aud:"central",t:"활동이 적은 지부가 있어요",b:"이번 달 점수가 낮은 지부를 확인하고 연락해 보세요.",time:"10/07 08:30",read:false,go:"c-dash"}];
const notifFor=()=>SESS?NOTIFS.filter(n=>n.aud==="all"||n.aud===SESS.role||(n.bid&&SESS.bid===n.bid)):[];
function pushNotif(aud,t,b,extra){NOTIFS.unshift(Object.assign({id:Date.now()+Math.random(),aud,t,b,time:nowStr(),read:false},extra||{}))}
function whoBox(){const u=$("#util"),base=`<a href="#home">HOME</a><a href="#join">회원가입</a><a href="#myedit">회원정보수정</a>`;
 if(!SESS){u.innerHTML=base+`<a class="adm" href="#login">지부장 로그인</a>`;return}
 const un=notifFor().filter(n=>!n.read).length,home=SESS.role==="central"?"c-dash":"m-dash";
 u.innerHTML=`<span class="whoW"><button class="bell" data-act="bell" aria-label="알림 ${un}건" aria-expanded="false">${ICON.bell}${un?`<span class="n">${un}</span>`:""}</button><a class="adm" href="#${home}">${esc(SESS.title)} ${esc(SESS.name)}님</a><button data-act="logout">로그아웃</button><div class="pop" id="bellpop" hidden></div></span>`}
function renderBell(){const l=notifFor();$("#bellpop").innerHTML=`<h3>알림 <button class="btn sm plain" data-act="readall">모두 읽음</button></h3><ul>${l.slice(0,8).map(n=>`<li class="${n.read?"":"un"}" data-act="readn" data-id="${n.id}"><b>${esc(n.t)}</b><span>${esc(n.b)}</span><span>${n.time}</span></li>`).join("")||"<li><span>새 알림이 없습니다.</span></li>"}</ul>`}
function pubTabs(cur){const mh=SESS?(SESS.role==="central"?"c-dash":"m-dash"):"login";
 const T=[["home","홈","home"],["map","지부 찾기","pin"],["events","행사","cal"],[mh,SESS?"내 업무":"지부장","user"]];
 $("#tabbar").innerHTML=T.map(t=>`<a href="#${t[0]}" ${(cur===t[0]||(t[0]==="map"&&cur.startsWith("room"))||(t[0]===mh&&SESS&&(cur.startsWith("m-")||cur.startsWith("c-"))))?'aria-current="page"':""}>${ICON[t[2]]}${t[1]}</a>`).join("")}
/* 관리 메뉴 */
const MNAV_C=[["c-dash","전국 현황","chart"],["c-tree","조직 관리","tree"],["c-approve","결재함","check"],["c-notice","공지 발송","mail"],["c-report","월간 리포트","doc"],["c-rbac","권한 관리","key"],["c-auto","자동화 규칙","sparkle"],["c-log","활동 기록","list"]];
(function(){const i=MNAV_B.findIndex(x=>x[0]==="m-log");MNAV_B.splice(i,0,["m-report","월간 리포트","doc"]);MNAV_R.splice(MNAV_R.length-1,0,["m-report","월간 리포트","doc"])})();
SUBM.push({n:"장학생 신청서",who:"gunpo",d:"10월 5일",s:"중앙 검토중"},{n:"공적조서",who:"yongin",d:"10월 4일",s:"중앙 검토중"});
const pendingDocs=()=>SUBM.filter(s=>s.s==="중앙 검토중").length;
function cnt(k){if(!SESS)return 0;if(k==="m-apps")return openApps(SESS.bid);if(k==="m-inq")return openInq(SESS.bid);if(k==="m-r2")return regionApps(SESS.sido).length;
 if(k==="c-approve")return APPS.filter(a=>a.stage===3).length+pendingDocs();return 0}
function shell(cur,title,sub,inner){const R=SESS.role,nav=R==="central"?MNAV_C:R==="region"?MNAV_R:MNAV_B,who=R==="branch"?br(SESS.bid).nm+" "+SESS.title:SESS.title;
 const link=n=>{const c=cnt(n[0]);return`<a href="#${n[0]}" ${n[0]===cur?'aria-current="page"':""}>${ICON[n[2]]}${n[1]}${c?`<span class="cnt">${c}</span>`:""}</a>`};
 const chipT=R==="central"?"중앙 사무국 전용":R==="region"?"시·도복지회장":esc(SESS.title)+" 전용";
 return`<div class="wrap"><div class="mshell"><aside class="side" aria-label="관리 메뉴"><div class="me"><b>${esc(who)}</b><br><span class="small mut">${esc(SESS.name)}님</span></div>${nav.map(link).join("")}<a href="#home">${ICON.out}홈페이지로</a></aside>
 <div class="stack"><div class="mchips" role="navigation" aria-label="관리 메뉴">${nav.map(n=>{const c=cnt(n[0]);return`<a href="#${n[0]}" ${n[0]===cur?'aria-current="page"':""}>${n[1]}${c?`<span class="cnt">${c}</span>`:""}</a>`}).join("")}</div>
 <div class="topbar"><div><span class="chip">${chipT}</span><h1 class="disp" style="font-size:1.7rem;margin-top:6px">${title}</h1>${sub?`<p class="sub" style="margin:4px 0 0">${sub}</p>`:""}</div><button class="btn sm line" data-act="cmdk" aria-label="빠른 이동 열기">${ICON.search}빠른 이동 <span class="kbd">Ctrl K</span></button></div>${inner}</div></div></div>`}
/* 빠른 이동 */
document.body.insertAdjacentHTML("beforeend",`<div class="cmdk" id="cmdk" role="dialog" aria-modal="true" aria-label="빠른 이동"><div class="box"><input id="cmdq" type="text" placeholder="이동할 곳이나 지부 이름을 입력하세요" autocomplete="off" aria-label="빠른 이동 검색"><ul id="cmdl" role="listbox"></ul><div class="foot"><span>↑↓ 선택</span><span>Enter 이동</span><span>Esc 닫기</span></div></div></div>`);
let CK={sel:0,list:[]};
function cmdItems(){const L=[];[["홈","home"],["월간주요행사","events"],["복지회소식","news"],["우리 지부 찾기","map"],["공지사항","notice"],["포토갤러리","gallery"],["문서자료실","docs"],["회원가입","join"],["후원안내","support"],["주요사업","business"],["관련사이트","links"]].forEach(x=>L.push({t:x[0],k:"페이지",go:x[1]}));
 BR.forEach(b=>L.push({t:b.nm,k:"지부 · "+b.s,go:"room-"+b.id}));
 if(SESS){const nav=SESS.role==="central"?MNAV_C:SESS.role==="region"?MNAV_R:MNAV_B;nav.forEach(n=>L.push({t:n[1],k:"내 업무",go:n[0]}));L.push({t:"로그아웃",k:"계정",act:"logout"})}else L.push({t:"지부장 로그인",k:"계정",go:"login"});
 L.push({t:"글자 크게",k:"보기",act:"fsp"},{t:"화면 밝기 바꾸기",k:"보기",act:"thm"});return L}
function ckRender(){const q=$("#cmdq").value.trim().toLowerCase();CK.list=cmdItems().filter(x=>!q||(x.t+x.k).toLowerCase().includes(q)).slice(0,12);CK.sel=Math.min(CK.sel,Math.max(0,CK.list.length-1));
 $("#cmdl").innerHTML=CK.list.map((x,i)=>`<li role="option" aria-selected="${i===CK.sel}" data-i="${i}"><span>${esc(x.t)}</span><small>${esc(x.k)}</small></li>`).join("")||`<li><span>일치하는 항목이 없어요</span></li>`}
function ckOpen(){$("#cmdk").classList.add("open");$("#cmdq").value="";CK.sel=0;ckRender();$("#cmdq").focus()}
function ckClose(){$("#cmdk").classList.remove("open")}
function ckRun(i){const x=CK.list[i];if(!x)return;ckClose();
 if(x.go)go(x.go);else if(x.act==="logout"){log("로그아웃");SESS=null;toast("로그아웃했어요");go("home")}else if(x.act==="fsp")$("#fsp").click();else if(x.act==="thm")$("#thm").click()}
$("#cmdq").addEventListener("input",()=>{CK.sel=0;ckRender()});
$("#cmdq").addEventListener("keydown",e=>{if(e.key==="ArrowDown"){e.preventDefault();CK.sel=Math.min(CK.list.length-1,CK.sel+1);ckRender()}
 else if(e.key==="ArrowUp"){e.preventDefault();CK.sel=Math.max(0,CK.sel-1);ckRender()}else if(e.key==="Enter"){e.preventDefault();ckRun(CK.sel)}});
$("#cmdl").addEventListener("click",e=>{const li=e.target.closest("li[data-i]");if(li)ckRun(+li.dataset.i)});
$("#cmdk").addEventListener("click",e=>{if(e.target.id==="cmdk")ckClose()});
document.addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();ckOpen()}else if(e.key==="Escape"){ckClose();const p=$("#bellpop");if(p)p.hidden=true}});
/* 알림·배너 동작 */
document.addEventListener("click",e=>{const t=e.target.closest("[data-act]");
 if(!t){const p=$("#bellpop");if(p&&!e.target.closest(".whoW"))p.hidden=true;return}
 const A=t.dataset.act;
 if(A==="bell"){const p=$("#bellpop");const open=p.hidden;if(open)renderBell();p.hidden=!open;t.setAttribute("aria-expanded",String(open));return}
 if(A==="readall"){notifFor().forEach(n=>n.read=true);whoBox();return}
 if(A==="readn"){const n=NOTIFS.find(x=>String(x.id)===t.dataset.id);if(n){n.read=true;const g=n.go;whoBox();if(g)go(g)}return}
 if(A==="cmdk"){ckOpen();return}});
/* 최종 라우터 */
function go(r){r=r||"home";let html=null,framed=true;const central=SESS&&SESS.role==="central";
 if(r.startsWith("c-")){framed=false;if(!SESS){toast("로그인이 필요해요");return go("login")}if(!central)return go("m-dash");html=(CROUTES[r]||CROUTES["c-dash"])()}
 else if(r.startsWith("m-")){framed=false;if(!SESS){toast("로그인이 필요해요");return go("login")}if(central)return go("c-dash");
  if(SESS.role==="region"&&!["m-dash","m-r2","m-branches","m-report","m-log"].includes(r))return go("m-dash");
  if(SESS.role==="branch"&&["m-r2","m-branches"].includes(r))return go("m-dash");html=(MROUTES[r]||mDash)()}
 else if(r.startsWith("about"))html=vAbout(ABOUTS.includes(r)?r:"about-greeting");
 else if(r.startsWith("support"))html=vSupport(SUPS.includes(r)?r:"support");
 else if(r.startsWith("room-")){html=vRoom(r.slice(5));if(html==null){toast("없는 지부예요");return go("map")}}
 else{if(r==="login"&&SESS)return go(central?"c-dash":"m-dash");html=(PROUTES[r]||PROUTES.home)()}
 cur=r;$("#app").innerHTML=framed?frame(r,html):html;$("#sheet").classList.remove("open");
 document.body.classList.toggle("mgr",!framed);pubTabs(r);whoBox();after(r);
 try{if(location.hash.slice(1)!==r)location.hash=r}catch(e){}scrollTo(0,0)}
function after(r){
 if(r==="home")fillSel("selSido","selBr");
 if(r==="join"&&$("#jS"))fillSel("jS","jB");
 if(r==="map")fillMap();
 if(r==="events"){renderEvList();$("#evS").onchange=renderEvList}
 if(r==="gallery"){renderGallery();$("#gS").onchange=renderGallery}
 if(r==="m-members"){$("#mf").value=MF;renderMembers()}
 if(r==="m-profile"){$("#pprev").innerHTML=profPrev()}
 if(AFTER[r])AFTER[r]()}
function vLogin2(){const lab=a=>a.role==="branch"?br(a.bid).nm+" "+a.title:a.title,desc=a=>a.role==="central"?"전국 현황·결재·공지 발송·권한 관리":a.role==="region"?"소속 지부 승인과 현황":"본인 지부 회원·행사·사진 관리";
 return pageHead("행정실 로그인",[["행정실"],["로그인"]])+`<div class="sec"><div class="two"><div class="card lift"><h3>로그인</h3><p class="mut small">실제 서비스에서는 휴대폰 본인확인으로 로그인합니다. 이 시안에서는 오른쪽 계정을 눌러 체험할 수 있습니다.</p>
 <form class="form" data-form="fakelogin"><label for="lid">아이디<input id="lid" type="text" value="seongnam-chief" autocomplete="off"></label><label for="lpw">비밀번호<input id="lpw" type="password" value="sample1234" autocomplete="off"></label><button class="btn" type="submit">로그인</button></form></div>
 <div class="card acct"><h3>체험 계정 선택</h3><p class="mut small">역할마다 보이는 화면이 다릅니다.</p><div class="stack">${ACCT.map((a,i)=>`<button class="card" data-act="login" data-i="${i}"><b>${esc(lab(a))}</b><span class="small mut">${esc(a.name)}님 · ${desc(a)}</span></button>`).join("")}</div></div></div></div>`}
PROUTES.login=vLogin2;
