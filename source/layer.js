/* ===== v4 레이어: 원본 골격으로 재배치 ===== */
const REALNOTICE=[[298,"2026년 2차 지회장 선임 공고","2026-09-15"],[297,"2026년 시도복지회장 선임 공고","2026-08-20"],[296,"대의원 최종 확정 명단","2026-06-01"],[295,"(사)한국신체장애인복지회 정기총회 개최 안내","2026-05-29"],[294,"2026년 임시총회 결과 보고 안내","2026-04-28"],[293,"제18대 중앙회장 후보자 등록공고","2026-04-01"],[292,"[재공고] (사)한국신체장애인복지회 임시총회안내","2026-03-20"]];
const REALNEWS=[[1059,"서울시, 초·중·특수학교 ‘무료 공연관람’ 지원","2023-04-24"],[1058,"국민 모두를 위한 ‘공공디자인’ 찾는다","2023-04-19"],[1057,"김예지 의원 “장애인의 전자책 접근성 보장해야”","2023-04-17"],[1056,"장애예술인 오케스트라, 청와대에서 연주 펼친다","2023-04-13"],[1055,"“학대 피해 장애인 ‘고발인 이의신청권’ 되살려야”","2023-04-11"],[1054,"고양특례시장컵 제28회 홀트전국휠체어농구대회 개최","2023-04-10"],[1053,"[복지TV뉴스24] 장애인등록증으로 전국지하철무임태그","2023-04-07"],[1052,"코웨이 휠체어농구단, SK나이츠와 ‘통합농구’ 교류","2023-04-06"],[1051,"복권기금, 교통약자 이동편의 ‘특별교통수단’ 지원 확대","2023-04-04"],[1050,"소비자원 “졸음쉼터 장애인 화장실·주차구역 개선 필요”","2023-04-03"]];
const PHO=[{f:"photos/g01.jpg",t:"2022년도 정기총회 — 참석자 단체 사진"},{f:"photos/g02.jpg",t:"2022년도 정기총회 — 기념 촬영"},{f:"photos/g03.jpg",t:"2022년도 정기총회 — 회원 단체 사진"},{f:"photos/g04.jpg",t:"2022년도 정기총회 — 개회"},{f:"photos/g05.jpg",t:"2022년도 정기총회 — 임원 기념 촬영"},{f:"photos/g06.jpg",t:"2022년도 정기총회 — 회의장"},{f:"photos/g07.jpg",t:"복지회 행사 — 기념 촬영"},{f:"photos/g08.jpg",t:"복지회 행사 — 단체 사진"},{f:"photos/g09.jpg",t:"회장 임명장 수여식 — 기념 촬영"},{f:"photos/g10.jpg",t:"회장 임명장 수여식 — 수여 장면"},{f:"photos/g11.jpg",t:"회장 임명장 수여식 — 단체 사진"},{f:"photos/g12.jpg",t:"회장 임명장 수여식 — 기념 촬영"}];
const REALGAL=["(사)대구광역시신체장애인복지회 회장 임명장 수여식","(사)경남신체장애인복지회 회장 임명장 수여식","(사)전북신체장애인복지회 회장 임명장 수여식","2024년도 정기총회","(사)강원도신체장애인복지회 회장 임명식","2022년 정기총회 개최"];
const LINKS=[["사랑의끈연결 국민운동본부","http://www.lovehelp.or.kr"],["사회복지자원봉사인증센터","http://www.sharingkorea.net"],["복지로","http://www.bokjiro.go.kr"],["129 보건복지콜센터","http://www.129.go.kr"]];
const NEWMENU=[
 {t:"복지회소개",sub:[["회장인사말","about-greeting"],["설립배경·연혁","about-history"],["CI소개","about-ci"],["정관·회칙","about-rules"],["조직도·임원소개","about-org"],["전국시도복지회","map","NEW"],["찾아오시는길","about-map"],["회원정보수정","myedit"]]},
 {t:"주요사업",sub:[["주요사업","business"]]},
 {t:"사회공헌/희망나눔",sub:[["홍보대사","support-amb"],["후원안내","support"],["후원현황","support-status"],["희망나눔","support-hope"]]},
 {t:"참여마당",sub:[["월간주요행사","events"],["복지회소식","news"],["회원검색","membersearch","변경"],["작은소리","voice"]]},
 {t:"커뮤니티",sub:[["공지사항","notice"],["자유게시판","free"],["최신복지뉴스","clips"],["포토갤러리","gallery"],["관련사이트","links"]]},
 {t:"행정실",sub:[["중앙행정실","admin-c"],["지역행정실","login","NEW"],["문서자료실","docs"]]}];
MENU.splice(0,MENU.length,...NEWMENU);
pageHead=(t,c)=>`<div class="ptitle"><div class="crumbs2"><a href="#home">홈</a>${c.map(x=>` › ${x[1]?`<a href="#${x[1]}">${x[0]}</a>`:x[0]}`).join("")}</div><h1>${t}</h1></div>`;
subtabs=(items,cur)=>`<div class="subtabs mob" role="navigation" aria-label="하위 메뉴">${items.map(i=>`<a href="#${i[1]}" ${i[1]===cur?'aria-current="page"':""}>${i[0]}</a>`).join("")}</div>`;
const srchForm=(id)=>`<form class="search" data-form="search" role="search"><label class="sr" for="${id}">검색</label><input id="${id}" type="search" placeholder="검색어를 입력하세요"><button type="submit">검색</button></form>`;
function buildNav(){$("#sheetbody").innerHTML=`<div style="margin:14px 0">${srchForm("q2")}</div>`+MENU.map(m=>`<details><summary>${m.t}</summary>${m.sub.map(s=>`<a href="#${s[1]}">${s[0]}${s[2]?`<em class="new">${s[2]}</em>`:""}</a>`).join("")}</details>`).join("")+`<details><summary>바로가기</summary><a href="#join">회원가입</a><a href="#login">지부장·지회장 로그인</a></details>`}
function whoBox(){$("#util").innerHTML=`<a href="#home">HOME</a><a href="#join">회원가입</a><a href="#myedit">회원정보수정</a>`+(SESS?`<a class="adm" href="#m-dash">${esc(SESS.title)} ${esc(SESS.name)}님 · 내 화면</a><button data-act="logout">로그아웃</button>`:`<a class="adm" href="#login">지부장 로그인</a>`)}
/* 달력 */
let CAL={y:2026,m:9};
function calHTML(){const f=new Date(CAL.y,CAL.m,1),n=new Date(CAL.y,CAL.m+1,0).getDate(),w=f.getDay(),ev={};
 EV.forEach(e=>{const[y,m,d]=e.d.split("-").map(Number);if(y===CAL.y&&m-1===CAL.m)ev[d]=(ev[d]||0)+1});
 let cells="";for(let i=0;i<w;i++)cells+="<span></span>";
 for(let d=1;d<=n;d++){const t=CAL.y===2026&&CAL.m===9&&d===7,c=ev[d];cells+=`<a href="#events" class="cd ${t?"t":""} ${c?"e":""}" aria-label="${CAL.m+1}월 ${d}일${t?" 오늘":""}${c?" 행사 "+c+"건":""}">${d}${c?"<i></i>":""}</a>`}
 return`<div class="calh"><button data-act="cal" data-d="-1" aria-label="이전 달">‹</button><b>${CAL.y}년 ${CAL.m+1}월</b><button data-act="cal" data-d="1" aria-label="다음 달">›</button></div><div class="calg"><span>일</span><span>월</span><span>화</span><span>수</span><span>목</span><span>금</span><span>토</span>${cells}</div>`}
/* 왼쪽·오른쪽 열 */
function leftCol(r){const c2=r.startsWith("room-")?"map":r;
 const lg=SESS?`<div class="lbox"><b>${esc(SESS.title)} ${esc(SESS.name)}님</b><div class="row" style="margin-top:6px"><a class="btn sm" href="#m-dash">내 화면</a><button class="btn sm line" data-act="logout">로그아웃</button></div></div>`
 :`<form class="lbox login" data-form="boxlogin"><label class="small" for="bid">아이디</label><input id="bid" type="text" autocomplete="off"><label class="small" for="bpw">비밀번호</label><input id="bpw" type="password" autocomplete="off"><button class="btn sm" type="submit" style="margin-top:4px">로그인</button><div class="links small"><a href="#join">회원가입</a><span class="mut">·</span><a href="#login">아이디/비밀번호 찾기</a></div></form>`;
 const menu=MENU.map(m=>{const open=m.sub.some(s=>s[1]===c2);return`<div class="g ${open?"open":""}"><a class="gt" href="#${m.sub[0][1]}" ${open?'aria-expanded="true"':'aria-expanded="false"'}>${m.t}<span aria-hidden="true">${open?"−":"+"}</span></a>${open?`<ul>${m.sub.map(s=>`<li><a href="#${s[1]}" ${s[1]===c2?'aria-current="page"':""}><span>${s[0]}</span>${s[2]?`<em class="new">${s[2]}</em>`:""}</a></li>`).join("")}</ul>`:""}</div>`}).join("");
 return lg+`<nav class="vmenu" aria-label="메뉴">${menu}</nav><a class="lbox coop" href="#links">협력기관·관련사이트 <span aria-hidden="true">›</span></a>`}
const rightCol=()=>`<div class="cal" id="cal">${calHTML()}</div><div class="coops">${LINKS.map(l=>`<a href="${l[1]}" target="_blank" rel="noopener">${l[0]}<span aria-hidden="true">›</span></a>`).join("")}</div><a class="poster" href="#notice"><img alt="2026 제1기 디지털자산관리사 온라인 교육과정 모집 포스터" src="__POSTER__"></a>`;
const frame=(r,inner)=>{const h=r==="home";return`<div class="wrap frame ${h?"r3":""}"><aside class="lcol" aria-label="왼쪽 메뉴">${leftCol(r)}</aside><div class="ccol">${inner}</div>${h?`<aside class="rcol">${rightCol()}</aside>`:""}</div>`};
/* 홈 (원본 순서: 배너 → 공지사항 → 최신복지뉴스 → 포토갤러리, 그 아래에 새 기능) */
function vHome2(){const up=[...EV].filter(e=>e.d>=TODAY).sort((a,b)=>a.d.localeCompare(b.d));
 const top=["소형","중형","대형"].map(l=>BR.filter(b=>b.lg===l).sort((a,b)=>pts(b.id)-pts(a.id))[0]);const ss=[...new Set(BR.map(b=>b.s))];
 return`<div class="stack"><div class="banner"><h2>복지회의 <b>새로운 얼굴</b></h2><p>새옷을 갈아입고 새로운 모습으로 여러분께 다가갑니다. 가까운 지부의 행사와 소식을 한곳에서 만나보세요.</p></div>
 <form class="find" data-form="finder"><b>내 지역 찾기<em class="new">NEW</em></b><select id="selSido" aria-label="시도">${ss.map(s=>`<option>${s}</option>`).join("")}</select><select id="selBr" aria-label="지부"></select><button class="btn sm" type="submit">지부 방 들어가기</button></form>
 <section><div class="sech"><h2><b>공지</b>사항</h2><a href="#notice">더보기 +</a></div><div class="blk"><ul class="list">${REALNOTICE.map(x=>`<li><a href="#notice">${esc(x[1])}</a><span class="src">${x[2]}</span></li>`).join("")}</ul></div></section>
 <section><div class="sech"><h2><b>최신복지</b>뉴스</h2><a href="#clips">더보기 +</a></div><div class="blk"><ul class="list">${REALNEWS.slice(0,5).map(x=>`<li><a href="#clips">${esc(x[1])}</a><span class="src">${x[2]}</span></li>`).join("")}</ul></div></section>
 <section><div class="sech"><h2><b>포토</b>갤러리</h2><a href="#gallery">더보기 +</a></div><div class="blk"><div class="gal">${REALGAL.slice(0,4).map((c,i)=>`<a href="#gallery"><span class="ph"><img alt="" src="${PHO[i].f}" loading="lazy"></span><span>${esc(PHO[i].t)}</span></a>`).join("")}</div><p class="small mut" style="margin:8px 0 0">복지회 공식 홈페이지 포토갤러리에 게시된 사진입니다.</p></div></section>
 <section><div class="sech"><h2><b>우리 지부</b> 활동<em class="new">NEW</em></h2><a href="#map">전국시도복지회 +</a></div><div class="blk">${top.map(b=>`<a class="brrow" href="#room-${b.id}"><span><b>${esc(b.nm)}</b> <span class="chip o">${b.lg} 리그 1위</span><br><span class="small mut">${esc(b.s)} · 회원 ${b.mem}명(예시) · ${b.st}개월 연속 활동</span></span><b class="num">${pts(b.id)}점</b><div class="bar"><i style="width:${pts(b.id)/3}%"></i></div></a>`).join("")}</div></section>
 <section><div class="sech"><h2><b>다가오는</b> 지부 행사<em class="new">NEW</em></h2><a href="#events">월간주요행사 +</a></div><div class="blk"><div class="evgrid" style="padding-top:10px">${up.slice(0,4).map(evCard).join("")}</div></div></section></div>`}
/* 새로 채운 페이지들 */
const tbl=(head,rows)=>`<div class="card" style="padding:6px 14px"><div class="tblwrap"><table class="tbl"><thead><tr>${head.map(h=>`<th>${h}</th>`).join("")}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map((c,i)=>`<td data-l="${head[i]}">${c}</td>`).join("")}</tr>`).join("")}</tbody></table></div></div>`;
function vNotice2(){return pageHead("공지사항",[["커뮤니티"],["공지사항"]])+`<div class="sec">${tbl(["번호","제목","작성자","날짜"],[["<span class='chip o'>공지</span>","2026 제1기 디지털자산관리사 온라인 교육과정 모집","복지회 사무국","2026-10-01"]].concat(REALNOTICE.map(x=>[x[0],esc(x[1]),"(사)한국신체장애인복지회",x[2]])))}<p class="small mut" style="margin-top:10px">원본 게시글 목록 중 최근 글입니다. 게시글 본문과 첨부는 원본에서 그대로 이전합니다.</p></div>`}
function vClips2(){return pageHead("최신복지뉴스",[["커뮤니티"],["최신복지뉴스"]])+`<div class="sec">${tbl(["번호","제목","출처","날짜"],REALNEWS.map(x=>[x[0],esc(x[1]),"(kdwa)",x[2]]))}<p class="small mut" style="margin-top:10px">원본의 기사 목록입니다. 새 홈페이지에서는 지역명으로 자동 분류해 각 지부 방에도 보여 줍니다(기사 전문은 복사하지 않고 원문 링크만 연결).</p></div>`}
function vFree(){return pageHead("자유게시판",[["커뮤니티"],["자유게시판"]])+`<div class="sec">${tbl(["번호","제목","작성자","날짜"],[[5,"지부 행사 사진은 어디에 올리나요? (예시)","김○○","10.06"],[4,"가입 신청 결과는 언제 나오나요? (예시)","박○○","10.04"],[3,"겨울 나눔 행사 같이 해요 (예시)","이○○","10.01"]])}<p style="margin-top:12px"><button class="btn sm" data-act="soon">글쓰기</button></p></div>`}
function vLinks(){return pageHead("관련사이트",[["커뮤니티"],["관련사이트"]])+`<div class="sec"><div class="coops">${LINKS.concat([["복지회 관련 사이트","https://kdwa.co.kr/"]]).map(l=>`<a href="${l[1]}" target="_blank" rel="noopener"><span><b>${l[0]}</b><br><span class="small mut">${l[1]}</span></span><span aria-hidden="true">›</span></a>`).join("")}</div><p class="small mut" style="margin-top:10px">원본 사이트의 협력기관 링크입니다. 새 창으로 열립니다.</p></div>`}
function vAdminC(){return pageHead("중앙행정실",[["행정실"],["중앙행정실"]])+`<div class="sec"><div class="card stack"><h3>중앙 사무국 전용 공간입니다</h3><p class="mut" style="margin:0">전국 공지, 양식 배포, 가입 최종 확정, 지부 현황 통계를 다룹니다. 이 시안에는 지부장·지회장과 시·도복지회장 화면이 들어 있습니다.</p><div class="row"><a class="btn sm" href="#login">지역행정실(지부장·지회장) 로그인</a></div></div></div>`}
function vMemSearch(){return pageHead("회원검색",[["참여마당"],["회원검색"]])+`<div class="sec"><div class="card stack"><span class="chip o">변경 안내</span><h3>회원 명부는 더 이상 공개하지 않습니다</h3><p class="mut" style="margin:0">기존 회원검색은 이름과 연락처가 누구에게나 보였습니다. 개인정보 보호를 위해 새 홈페이지에서는 공개하지 않고, 소속 지부를 찾아 문의하도록 바꿨습니다. 지부장은 로그인 후 본인 지부 회원만 볼 수 있습니다.</p><div class="row"><a class="btn sm" href="#map">우리 지부 찾기</a><a class="btn sm line" href="#join">회원가입 신청</a></div></div></div>`}
function vMyEdit(){return pageHead("회원정보수정",[["복지회소개"],["회원정보수정"]])+`<div class="sec"><div class="card stack"><p class="mut small" style="margin:0">실제 서비스에서는 휴대폰 본인확인 뒤에 수정합니다. 장애 유형·등급 같은 민감한 정보는 입력받지 않습니다.</p><form class="form" data-form="myedit"><label for="eN">이름<input id="eN" type="text" value="홍길동(예시)"></label><label for="eP">휴대폰<input id="eP" type="text" value="010-0000-0000"></label><label for="eB">소속 지부<select id="eB">${BR.map(b=>`<option>${b.nm}</option>`).join("")}</select></label><button class="btn" type="submit">저장하기</button></form></div></div>`}
let JOINED=null,SQ="";
function vJoin(){if(JOINED){const b=br(JOINED.b);return pageHead("회원가입",[["회원가입"]])+`<div class="sec"><div class="card lift stack"><span class="chip g">신청 접수</span><h3>${esc(JOINED.n)}님, 가입 신청이 접수되었어요</h3><p class="mut" style="margin:0">${esc(b.nm)} 지부장이 먼저 검토하고, 시·도와 중앙의 확인을 거쳐 가입이 확정됩니다. 결과는 입력하신 연락처로 안내드립니다.</p>${stepBar(1)}<p class="small mut" style="margin:0">체험 안내: 지부장 계정으로 로그인하면 '가입 승인'에 이 신청이 보입니다.</p><div class="row"><a class="btn sm" href="#login">지부장 화면에서 확인</a><a class="btn sm line" href="#home" data-act="joinreset">홈으로</a></div></div></div>`}
 const ss=[...new Set(BR.map(b=>b.s))];
 return pageHead("회원가입",[["회원가입"]])+`<div class="sec"><div class="card lift"><p class="mut small" style="margin:0 0 12px">가까운 지부를 고르면 그 지부의 지부장에게 신청이 전달됩니다. 이름·연락처·소속 지부만 받으며, 장애 유형·등급 같은 정보는 입력받지 않습니다. 지부 명단이 확보되면 모든 지역이 열립니다.</p><form class="form" data-form="join"><label for="jS">지역<select id="jS">${ss.map(s=>`<option>${s}</option>`).join("")}</select></label><label for="jB">소속 지부<select id="jB"></select></label><label for="jN">이름<input id="jN" type="text" required></label><label for="jP">휴대폰<input id="jP" type="text" required placeholder="010-0000-0000"></label>
 <label class="consent" for="jC"><input id="jC" type="checkbox"><span><b>개인정보 수집·이용에 동의합니다.</b><br><span class="small">이름·연락처·소속 지부를 가입 심사와 안내에만 사용합니다. (시안 문구)</span></span></label><button class="btn" type="submit">가입 신청하기</button></form></div></div>`}
function vSearch(){const q=SQ.toLowerCase(),hit=s=>q&&s.toLowerCase().includes(q);
 const n=REALNOTICE.filter(x=>hit(x[1])),w=REALNEWS.filter(x=>hit(x[1])),b=BR.filter(x=>hit(x.nm+x.s+x.d)),e=EV.filter(x=>hit(x.t+(x.p||"")+br(x.b).nm));
 const sec=(t,a)=>a.length?`<div class="card" style="margin-top:12px"><h3>${t} ${a.length}건</h3><ul class="list">${a.join("")}</ul></div>`:"";
 return pageHead("검색 결과",[["검색"]])+`<div class="sec"><p class="mut">${q?`‘${esc(SQ)}’ 검색 결과입니다.`:"검색어를 입력해 주세요."}</p>`
 +sec("지부·지회",b.map(x=>`<li><a href="#room-${x.id}">${esc(x.nm)}</a><span class="src">${esc(x.s)}</span></li>`))
 +sec("행사",e.map(x=>`<li><a href="#room-${x.b}">${esc(x.t)}</a><span class="src">${x.d.slice(5).replace("-",".")}</span></li>`))
 +sec("공지사항",n.map(x=>`<li><a href="#notice">${esc(x[1])}</a><span class="src">${x[2]}</span></li>`))
 +sec("최신복지뉴스",w.map(x=>`<li><a href="#clips">${esc(x[1])}</a><span class="src">${x[2]}</span></li>`))
 +(q&&!(n.length+w.length+b.length+e.length)?`<div class="card" style="margin-top:12px">검색 결과가 없습니다. 다른 낱말로 찾아 보세요.</div>`:"")+`</div>`}
const _vAbout=vAbout;vAbout=function(tab){
 if(tab==="about-ci")return pageHead("CI소개",[["복지회소개"],["CI소개"]])+`<div class="sec"><div class="card stack" style="justify-items:start"><img alt="(사)한국신체장애인복지회 로고, KDWA" src="${document.querySelector(".logo img").src}" style="max-width:100%;height:auto;border-radius:10px;background:#fff"><p class="mut" style="margin:0">로고와 영문 표기(KDWA, Korea Disabled Welfare Association)를 그대로 사용합니다. CI 이미지와 내려받기 파일은 원본에서 이전합니다.</p></div></div>`;
 if(tab==="about-rules")return pageHead("정관·회칙",[["복지회소개"],["정관·회칙"]])+`<div class="sec"><div class="card stack"><p class="mut" style="margin:0">정관과 회칙 원문은 이전한 뒤 이곳에 연결합니다. 새 홈페이지의 권한과 승인 절차는 정관·회칙이 정한 절차를 따라 설정합니다.</p><a class="btn sm line" href="#docs" style="justify-self:start">문서자료실 보기</a></div></div>`;
 return _vAbout(tab)};
const _vSupport=vSupport;vSupport=function(tab){
 if(tab==="support-status")return pageHead("후원현황",[["사회공헌/희망나눔"],["후원현황"]])+`<div class="sec">${tbl(["후원자","구분","일자"],[["김○○","일반후원","10.05"],["박○○","물품후원","10.03"],["(주)○○","특별후원","09.28"]])}<p class="small mut" style="margin-top:10px">후원자 이름은 가려서 공개합니다. 위 표는 예시입니다.</p></div>`;
 return _vSupport(tab)};
Object.assign(PROUTES,{home:vHome2,notice:vNotice2,clips:vClips2,free:vFree,links:vLinks,"admin-c":vAdminC,membersearch:vMemSearch,myedit:vMyEdit,join:vJoin,search:vSearch});
const ABOUTS=["about-greeting","about-history","about-ci","about-rules","about-org","about-map"],SUPS=["support","support-hope","support-amb","support-status"];
function fillSel(a,b){const f=()=>{$("#"+b).innerHTML=BR.filter(x=>x.s===$("#"+a).value).map(x=>`<option value="${x.id}">${x.nm}</option>`).join("")};$("#"+a).onchange=f;f()}
function go(r){r=r||"home";let html=null,framed=true;
 if(r.startsWith("m-")){framed=false;if(!SESS){toast("로그인이 필요해요");return go("login")}
  if(SESS.role==="region"&&!["m-dash","m-r2","m-branches","m-log"].includes(r))return go("m-dash");
  if(SESS.role==="branch"&&["m-r2","m-branches"].includes(r))return go("m-dash");
  html=(MROUTES[r]||mDash)()}
 else if(r.startsWith("about"))html=vAbout(ABOUTS.includes(r)?r:"about-greeting");
 else if(r.startsWith("support"))html=vSupport(SUPS.includes(r)?r:"support");
 else if(r.startsWith("room-")){html=vRoom(r.slice(5));if(html==null){toast("없는 지부예요");return go("map")}}
 else{if(r==="login"&&SESS)return go("m-dash");html=(PROUTES[r]||vHome2)()}
 cur=r;$("#app").innerHTML=framed?frame(r,html):html;$("#sheet").classList.remove("open");
 document.body.classList.toggle("mgr",!framed);
 pubTabs(r);whoBox();after(r);
 try{if(location.hash.slice(1)!==r)location.hash=r}catch(e){}
 scrollTo(0,0)}
function after(r){
 if(r==="home")fillSel("selSido","selBr");
 if(r==="join"&&$("#jS"))fillSel("jS","jB");
 if(r==="map")fillMap();
 if(r==="events"){renderEvList();$("#evS").onchange=renderEvList}
 if(r==="gallery"){renderGallery();$("#gS").onchange=renderGallery}
 if(r==="m-members"){$("#mf").value=MF;renderMembers()}
 if(r==="m-profile"){$("#pprev").innerHTML=profPrev()}}
document.addEventListener("submit",e=>{const f=e.target.closest("[data-form]");if(!f)return;const k=f.dataset.form;
 if(k==="search"){e.preventDefault();SQ=f.querySelector("input").value.trim();go("search")}
 if(k==="boxlogin"){e.preventDefault();toast("시안입니다. 체험 계정을 선택해 주세요");go("login")}
 if(k==="join"){e.preventDefault();if(!$("#jC").checked){toast("개인정보 수집·이용에 동의해 주세요");return}const b=$("#jB").value,n=$("#jN").value.trim();APPS.push({id:"join-"+Date.now(),b,nm:n,d:"방금",stage:1,note:""});JOINED={n,b};toast("가입 신청이 접수되었어요");go("join")}
 if(k==="myedit"){e.preventDefault();toast("저장했어요(시안)")}});
document.addEventListener("click",e=>{const t=e.target.closest("[data-act]");if(!t)return;
 if(t.dataset.act==="cal"){CAL.m+=+t.dataset.d;if(CAL.m<0){CAL.m=11;CAL.y--}if(CAL.m>11){CAL.m=0;CAL.y++}$("#cal").innerHTML=calHTML()}
 if(t.dataset.act==="joinreset")JOINED=null});
