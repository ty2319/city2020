<?php

//データベース接続
$conn = "host='pgdb' dbname='westofc' user='westofc' password='ofc0610'";
if(!$db = pg_connect($conn)) {
echo '接続エラー<br>';
exit;
}
//基本情報読み出し
$str_sql = "select * from symbol_score_game;";
$rs = pg_query($db, $str_sql);
$game = pg_fetch_assoc($rs);

if ($game['myself']=="b") {
$jibun = $game['bottom'];
$taisen = $game['top'];
$game_set = "tail";
} else {
$jibun = $game['top'];
$taisen = $game['bottom'];
$game_set = "head";
}

$str_sql1 = "select max(inning) from symbol_score_develop_detail;";
$rs1 = pg_query($db, $str_sql1);
$count_ini = pg_fetch_result($rs1,0,0);

?>

<!DOCTYPE html>
<html>
<head>
<meta charset="euc-jp">
<meta name="viewport" content="width=device-width, initial-scale=1" />
<script src="https://cdn.jsdelivr.net/npm/viewport-extra@1.0.3/dist/viewport-extra.min.js"></script> 
<script>
	new ViewportExtra(370)
</script>
<title>試合経過｜第91回都市対抗野球大会｜NTT西日本</title>
<meta name="keywords" content="NTT西日本,都市対抗,2019,シンボル,試合経過" />
<meta name="description" content="
第91回都市対抗野球大会での、NTT西日本の試合経過です。" />
<meta property="og:type" content="website" />
<meta property="og:title" content="第91回都市対抗野球大会" />
<meta property="og:description" content="社会人野球
第91回都市対抗野球大会での、NTT西日本の試合経過です。" />
<meta property="og:url" content="http://www.ntt-west.co.jp/symbol/hp/baseball/games/2020/city/" />
<meta property="og:site_name" content="第91回都市対抗野球大会" />
<meta property="og:country-name" content="Japan,日本" />
<meta property="og:locality" content="Osaka,大阪" />
<meta property="og:image" content="http://www.ntt-west.co.jp/favicon.ico" />
<link rel="stylesheet" href="css/import.css" />
<link rel="stylesheet" href="css/results.css" media="screen" />
<script src="//ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
<script type="text/javascript" src="js/common2.js"></script>
<script type="text/javascript" src="js/jquery.cookie.js"></script>
<script type="text/javascript" src="js/results2.js"></script>
</head>

<body>

<?php   //　$file_nameファイルの文字コードをSJISからEUC-JPに変換しインクルード
  $string = get_include_contents( "./templates/header-nav.inc" );  // 読み込みファイル
// SJIS("ASCII,JIS,UTF-8,EUC-JP,SJIS")からEUC-JPに変換
  $string_header = mb_convert_encoding($string, "EUC-JP", "auto");

  $string = get_include_contents( "./templates/footer.inc" );
  $string_footer = mb_convert_encoding($string, "EUC-JP", "auto");

  // get_include_contents()関数
  function get_include_contents($filename) {
    if (is_file($filename)) {
    ob_start();
    include $filename;
    $contents = ob_get_contents();
    ob_end_clean();
    return $contents;
    }
    return false;
  }

  echo $string_header;  //　置き換えたテキストを表示

?>
    <h3>Live Broadcasting</h3>
    <p>現在の試合経過</p>
</header>
<article>
  <section class="<?php print $game_set; ?>">
    <header>
      <h4><?php print $game['month']; ?>月<?php print $game['day']; ?>日（<?php print $game['week']; ?>） VS　<?php print $taisen; ?></h4>
      <p>※ このページは1分ごとに更新されますので、ご注意ください。</p>
    </header>

<?php

if ($game['myself'] == "t") {
$str_sql1 = "select lineup,position,name from symbol_score_member where tb='t'";
} else {
$str_sql1 = "select lineup,position,name from symbol_score_member where tb='b'";
}
$rs1 = pg_query($db, $str_sql1);
$count1 = pg_num_rows($rs1);
for($i=0;$i<$count1;$i++){
$mem1[$i] = pg_fetch_assoc($rs1);
}

?>


    <table class="member">
      <caption>
      <?php print $jibun; ?> <span>スタメン</span>
      </caption>
      <thead>
        <tr>
          <th scope="col">打順</th>
          <th scope="col">ポジション</th>
          <th scope="col">名前</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row"><?php print $mem1[0]['lineup']; ?></th>
          <td><?php print $mem1[0]['position']; ?></td>
          <td><?php print $mem1[0]['name']; ?></td>
        </tr>
        <tr>
          <th scope="row"><?php print $mem1[1]['lineup']; ?></th>
          <td><?php print $mem1[1]['position']; ?></td>
          <td><?php print $mem1[1]['name']; ?></td>
        </tr>
        <tr>
          <th scope="row"><?php print $mem1[2]['lineup']; ?></th>
          <td><?php print $mem1[2]['position']; ?></td>
          <td><?php print $mem1[2]['name']; ?></td>
        </tr>
        <tr>
          <th scope="row"><?php print $mem1[3]['lineup']; ?></th>
          <td><?php print $mem1[3]['position']; ?></td>
          <td><?php print $mem1[3]['name']; ?></td>
        </tr>
        <tr>
          <th scope="row"><?php print $mem1[4]['lineup']; ?></th>
          <td><?php print $mem1[4]['position']; ?></td>
          <td><?php print $mem1[4]['name']; ?></td>
        </tr>
        <tr>
          <th scope="row"><?php print $mem1[5]['lineup']; ?></th>
          <td><?php print $mem1[5]['position']; ?></td>
          <td><?php print $mem1[5]['name']; ?></td>
        </tr>
        <tr>
          <th scope="row"><?php print $mem1[6]['lineup']; ?></th>
          <td><?php print $mem1[6]['position']; ?></td>
          <td><?php print $mem1[6]['name']; ?></td>
        </tr>
        <tr>
          <th scope="row"><?php print $mem1[7]['lineup']; ?></th>
          <td><?php print $mem1[7]['position']; ?></td>
          <td><?php print $mem1[7]['name']; ?></td>
        </tr>
        <tr>
          <th scope="row"><?php print $mem1[8]['lineup']; ?></th>
          <td><?php print $mem1[8]['position']; ?></td>
          <td><?php print $mem1[8]['name']; ?></td>
        </tr>
        <tr>
          <th scope="row"><?php print $mem1[9]['lineup']; ?></th>
          <td><?php print $mem1[9]['position']; ?></td>
          <td><?php print $mem1[9]['name']; ?></td>
        </tr>
      </tbody>
    </table>

<?php

if ($game['myself'] == "t") {
$str_sql1 = "select lineup,position,name from symbol_score_member where tb='b'";
} else {
$str_sql1 = "select lineup,position,name from symbol_score_member where tb='t'";
}
$rs1 = pg_query($db, $str_sql1);
$count1 = pg_num_rows($rs1);
for($i=0;$i<$count1;$i++){
$mem1[$i] = pg_fetch_assoc($rs1);
}

?>

    <table class="member">
      <caption>
      <?php print $taisen; ?> <span>スタメン</span>
      </caption>
      <thead>
        <tr>
          <th scope="col">打順</th>
          <th scope="col">ポジション</th>
          <th scope="col">名前</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row"><?php print $mem1[0]['lineup']; ?></th>
          <td><?php print $mem1[0]['position']; ?></td>
          <td><?php print $mem1[0]['name']; ?></td>
        </tr>
        <tr>
          <th scope="row"><?php print $mem1[1]['lineup']; ?></th>
          <td><?php print $mem1[1]['position']; ?></td>
          <td><?php print $mem1[1]['name']; ?></td>
        </tr>
        <tr>
          <th scope="row"><?php print $mem1[2]['lineup']; ?></th>
          <td><?php print $mem1[2]['position']; ?></td>
          <td><?php print $mem1[2]['name']; ?></td>
        </tr>
        <tr>
          <th scope="row"><?php print $mem1[3]['lineup']; ?></th>
          <td><?php print $mem1[3]['position']; ?></td>
          <td><?php print $mem1[3]['name']; ?></td>
        </tr>
        <tr>
          <th scope="row"><?php print $mem1[4]['lineup']; ?></th>
          <td><?php print $mem1[4]['position']; ?></td>
          <td><?php print $mem1[4]['name']; ?></td>
        </tr>
        <tr>
          <th scope="row"><?php print $mem1[5]['lineup']; ?></th>
          <td><?php print $mem1[5]['position']; ?></td>
          <td><?php print $mem1[5]['name']; ?></td>
        </tr>
        <tr>
          <th scope="row"><?php print $mem1[6]['lineup']; ?></th>
          <td><?php print $mem1[6]['position']; ?></td>
          <td><?php print $mem1[6]['name']; ?></td>
        </tr>
        <tr>
          <th scope="row"><?php print $mem1[7]['lineup']; ?></th>
          <td><?php print $mem1[7]['position']; ?></td>
          <td><?php print $mem1[7]['name']; ?></td>
        </tr>
        <tr>
          <th scope="row"><?php print $mem1[8]['lineup']; ?></th>
          <td><?php print $mem1[8]['position']; ?></td>
          <td><?php print $mem1[8]['name']; ?></td>
        </tr>
        <tr>
          <th scope="row"><?php print $mem1[9]['lineup']; ?></th>
          <td><?php print $mem1[9]['position']; ?></td>
          <td><?php print $mem1[9]['name']; ?></td>
        </tr>
      </tbody>
    </table>



<?php

$str_sql1 = "select * from symbol_score_board where tb='t'";
$rs1 = pg_query($db, $str_sql1);
$brd_t = pg_fetch_assoc($rs1);

if (!($brd_t['i20']=="")) {
	$inning = 20;
	$width = 18;
} else if (!($brd_t['i19']=="")) {
	$inning = 19;
	$width = 18;
} else if (!($brd_t['i18']=="")) {
	$inning = 18;
	$width = 18; 
} else if (!($brd_t['i17']=="")) {
	$inning = 17;
	$width = 18;
} else if (!($brd_t['i16']=="")) {
	$inning = 16;
	$width = 20;
} else if (!($brd_t['i15']=="")) {
	$inning = 15;
	$width = 20;
} else if (!($brd_t['i14']=="")) {
	$inning = 14;
	$width = 20;
} else if (!($brd_t['i13']=="")) {
	$inning = 13;
	$width = 22;	
} else if (!($brd_t['i12']=="")) {
	$inning = 12;
	$width = 24;	
} else if (!($brd_t['i11']=="")) {
	$inning = 11;
	$width = 26;
} else if (!($brd_t['i10']=="")) {
	$inning = 10;
	$width = 28;
} else {
	$inning = 9;
	$width = 30;
}

$str_sql1 = "select * from symbol_score_board where tb='b'";
$rs1 = pg_query($db, $str_sql1);
$brd_b = pg_fetch_assoc($rs1);

?>

    <section>
      <h5>スコア</h5>
      <p class="zerofive">※ 各イニングのスコアをクリックすると、下にその回の内容を表示します。</p>
      <table class="score">
        <thead>
          <tr>

<?php

//1行目
print "<th scope=\"col\">TEAM</th>\n";

for ($i=1;$i<=$inning;$i++) {
print "<th scope=\"col\" width=\"". $width ."\">". $i ."</th>\n";
}

print "<th scope=\"col\">計</th>\n";
print "</tr></thead>\n";

//2行目
print "<tbody><tr>\n";

print "<th scope=\"row\">". $game['top'] ."</th>\n";

$section_id = 1;
for ($i=1;$i<=$inning;$i++) {
print "<td><a href=\"#". $section_id ."\">". $brd_t["i{$i}"] ."</a></td>\n";
$section_id = $section_id +2 ;
}

print"<td>". $brd_t['total'] ."</td>\n";
print "</tr>\n";

//3行目
print "<tr>\n";

print "<th scope=\"row\">". $game['bottom'] ."</th>\n";

$section_id = 2;
for ($i=1;$i<=$inning;$i++) {
print "<td><a href=\"#". $section_id ."\">". $brd_b["i{$i}"] ."</a></td>\n";
$section_id = $section_id +2 ;
}

print"<td>". $brd_b['total'] ."</td>";

?>
          </tr>
        </tbody>
      </table>

      <table class="battery">

<?php

print "<tr>\n";
print "<th scope=\"row\">" .$game['top']. "</th>\n";
print "<td>" .$brd_t['battery']. "</td>\n";
print "</tr>\n";
print "<tr>\n";
print "<th scope=\"row\">" .$game['bottom']. "</th>\n";
print"<td>" .$brd_b['battery']. "</td>\n";
print "</tr>\n";

?>

  </table>

      <hr>

  <h5>試合展開</h5>

<div>

<?php

$section_id =1 ; 
for($i=1;$i<=$count_ini;$i++){

$str_sql2 = "select * from symbol_score_develop where inning = '". $i ."';";
$rs2 = pg_query($db, $str_sql2);
$dev[$i] = pg_fetch_assoc($rs2);

$str_sql3 = "select * from symbol_score_develop_detail where inning = '". $i ."' and tb = 't';";
$rs3 = pg_query($db, $str_sql3);
$count3 = pg_num_rows($rs3);

print "<section id=\"". $section_id ."\">\n";
print "<h6>" .$dev[$i]['inning']. "回表＜" .$game['top']. "＞</h6>\n";
print "<p>" .$dev[$i]['comment_t']. "</p>\n";
print "<table><thead><tr><th scope=\"col\">打順</th><th scope=\"col\">打者</th><th scope=\"col\">打席内容</th><th scope=\"col\">アウトカウント</th><th scope=\"col\">ランナー</th></tr></thead><tbody>";

for($l=1;$l<=$count3;$l++){

$str_sql4 = "select * from symbol_score_develop_detail where inning = '" .$i."' and number = '". $l . "' and tb = 't';";
$rs4 = pg_query($db, $str_sql4);
$dtl[$l] = pg_fetch_assoc($rs4);

print "<tr>\n";
print "<th scope=\"row\">" .$dtl[$l]['lineup']. "</th>\n";
print "<th scope=\"row\">" .$dtl[$l]['name']. "</th>\n";
print "<td>" .$dtl[$l]['result']. "</td>\n";
print "<td>" .$dtl[$l]['out']. "</td>\n";
print "<td>" .$dtl[$l]['base']. "</td>\n";
print "</tr>\n";
}

print "</tbody></table>\n";
print "<p>" .$dev[$i]['memo_t']. "</p>\n";
print "</section>";

$section_id = $section_id + 1 ;

$str_sql3 = "select * from symbol_score_develop_detail where inning = '". $i ."' and tb = 'b';";
$rs3 = pg_query($db, $str_sql3);
$count3 = pg_num_rows($rs3);

print "<section id=\"". $section_id ."\">\n";
print "<h6>" .$dev[$i]['inning']. "回裏＜" .$game['bottom']. "＞</h6>\n";
print "<p>" .$dev[$i]['comment_b']. "</p>\n";

print "<table><thead><tr><th scope=\"col\">打順</th><th scope=\"col\">打者</th><th scope=\"col\">打席内容</th><th scope=\"col\">アウトカウント</th><th scope=\"col\">ランナー</th></tr></thead><tbody>";

for($l=1;$l<=$count3;$l++){

$str_sql4 = "select * from symbol_score_develop_detail where inning = '" .$i."' and number = '". $l . "' and tb = 'b';";
$rs4 = pg_query($db, $str_sql4);
$dtl[$l] = pg_fetch_assoc($rs4);

print "<tr>\n";
print "<th scope=\"row\">" .$dtl[$l]['lineup']. "</th>\n";
print "<th scope=\"row\">" .$dtl[$l]['name']. "</th>\n";
print "<td>" .$dtl[$l]['result']. "</td>\n";
print "<td>" .$dtl[$l]['out']. "</td>\n";
print "<td>" .$dtl[$l]['base']. "</td>\n";
print "</tr>\n";
}

print "</tbody></table>\n";
print "<p>" .$dev[$i]['memo_b']. "</p>\n";
print "</section>";

$section_id = $section_id + 1 ;
}

?>

      </div>

      <ul>
        <li class="prev"><a href="#"><span class="fa fa-angle-left fa-5x"></span></a></li>
        <li class="next"><a href="#"><span class="fa fa-angle-right fa-5x"></span></a></li>
      </ul>
    </section>




  </section>
  <p id="pan">第91回都市対抗野球大会 ≫ 試合経過</p>
</article>
</main>
<?php
  echo $string_footer;  //　置き換えたテキストを表示
?>

</body>
</html>
