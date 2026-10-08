$sp = "C:\Users\강광원\AppData\Local\Temp\claude\C--Users-----OneDrive------\3ca6d4e8-229d-405e-999f-31c1354ac7ba\scratchpad"
$t = [IO.File]::ReadAllText("$sp\src_v3_backup.html",[Text.Encoding]::UTF8)
$css = [IO.File]::ReadAllText("$sp\layer.css",[Text.Encoding]::UTF8) + "`n" + [IO.File]::ReadAllText("$sp\v5.css",[Text.Encoding]::UTF8) + "`n" + [IO.File]::ReadAllText("$sp\v6.css",[Text.Encoding]::UTF8)
$js = ("layer.js","v5a.js","v5b.js","v5c.js","v5d.js","v6data.js","v6.js","v7.js" | ForEach-Object { [IO.File]::ReadAllText("$sp\$_",[Text.Encoding]::UTF8) }) -join "`n"
$miss=@()
function rep($a,$b){ if($script:t.Contains($a)){ $script:t=$script:t.Replace($a,$b) } else { $script:miss += $a.Substring(0,[Math]::Min(50,$a.Length)) } }
rep "const pageHead=" "let pageHead="; rep "const subtabs=" "let subtabs="
rep '<header class="top"><div class="wrap">' '<header class="top"><div class="wrap hd">'
rep 'family=Black+Han+Sans&family=Noto+Sans+KR:wght@400;500;700&display=swap' 'family=Noto+Sans+KR:wght@400;500;700;800&display=swap'
$t = [regex]::Replace($t,'<nav class="main" id="mainnav"[^>]*></nav>\s*<div class="who" id="who"></div>','<div class="hr"><div class="util" id="util"></div><form class="search" data-form="search" role="search"><label class="sr" for="q">검색</label><input id="q" type="search" placeholder="검색어를 입력하세요"><button type="submit">검색</button></form></div>')
rep "</style></head>" ($css + "`n</style></head>")
$i = $t.IndexOf("buildNav();`nlet start="); if($i -lt 0){ $i = $t.IndexOf("buildNav();`r`nlet start=") }
if($i -lt 0){ $miss += "insert-point" } else { $t = $t.Substring(0,$i) + $js + "`n" + $t.Substring($i) }
[IO.File]::WriteAllText("$sp\src.html",$t,(New-Object Text.UTF8Encoding $false))
"patch missing: " + $miss.Count; $miss