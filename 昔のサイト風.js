// script.js

(function() {
    // --- スタイルシートを読み込む ---
    const css_url = '---ここに style.css のRaw URLを貼り付け---'; 
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = css_url;
    document.head.appendChild(link);

    // --- ページに注入するHTMLコンテンツを定義 ---
    const retro_html_content = `
      <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td align="center" valign="top">
            <div id="main-contents">
              <p class="title">†漆黒の堕天使†が支配するAbyss Gateへようこそ…</p>
              <marquee behavior="scroll" direction="left" scrollamount="5">
                ††† Welcome to my Homepage!! ††† このサイトは闇の盟約により守られています…キリ番【10000】踏んだ方はBBSにカキコよろしく！相互リンクも募集中だょ☆彡
              </marquee>
              <div class="center-align" style="margin-top: 20px;">
                <img src="https://i.gifer.com/embedded/download/4Kb.gif" alt="キラキラGIF" width="50" height="50">
                <img src="https://i.gifer.com/embedded/download/XVo6.gif" alt="キラキラGIF" width="50" height="50">
                <img src="https://i.gifer.com/embedded/download/4Kb.gif" alt="キラキラGIF" width="50" height="50">
              </div>
              <p class="section-title">† 我が聖域の案内 †</p>
              <div class="links">
                <ul>
                  <li><a href="javascript:void(0)">◆ 闇の日記 (DIARY) ◆</a></li>
                  <li><a href="javascript:void(0)">◆ 禁断の画廊 (ILLUST) ◆</a></li>
                  <li><a href="javascript:void(0)">◆ 魂の掲示板 (BBS) ◆</a></li>
                  <li><a href="javascript:void(0)">◆ 血の盟友 (LINK) ◆</a></li>
                </ul>
              </div>
              <p class="section-title">† 我がプロフ †</p>
              <div class="profile">
                <dl>
                  <dt>†NAME†</dt><dd>夜兎 (YATO)</dd>
                  <dt>†LIKE†</dt><dd>月夜、十字架、黒猫、退廃的な音楽、深淵を覗くこと…</dd>
                  <dt>†DON'T LIKE†</dt><dd>光、偽善者、秩序という名の束縛…</dd>
                  <dt>†DREAM†</dt><dd>いつか、この穢れた世界を浄化する聖戦(ラグナロク)を…</dd>
                </dl>
              </div>
              <div class="center-align" style="margin-top: 30px;"><img src="https://cdn.donmai.us/original/f1/a0/__uruha_rushia_hololive_and_1_more_drawn_by_negima_pan__f1a0e66e632b733790117282b9921c5f.gif" class="icon" alt="回転するアイコン" width="100" height="100"></div>
              <div class="kiriban">キリ番GETしたらBBSに報告してネ！<br>荒らし、誹謗中傷は闇の力で削除します。</div>
              <div class="center-align" style="margin-top: 20px;">
                <p style="color: #ccc;">あなたは悠久の時から数えて</p>
                <img src="https://www.akacom.jp/counter/free/img/d_01/0.gif" alt="0"><img src="https://www.akacom.jp/counter/free/img/d_01/0.gif" alt="0"><img src="https://www.akacom.jp/counter/free/img/d_01/8.gif" alt="8"><img src="https://www.akacom.jp/counter/free/img/d_01/1.gif" alt="1"><img src="https://www.akacom.jp/counter/free/img/d_01/6.gif" alt="6"><img src="https://www.akacom.jp/counter/free/img/d_01/2.gif" alt="2">
                <p style="color: #ccc;">番目のお客様です。</p>
              </div>
              <hr style="border: 1px dashed #00FFFF; margin-top: 20px;">
              <div class="center-align" style="margin-top: 20px;">
                 <a href="javascript:void(0)"><img src="https://i.pinimg.com/originals/94/91/2d/94912de5f5f4a7c036329e46a596071f.gif" alt="工事中" class="construction-gif"></a>
                 <p style="color: #aaa; font-size: 12px !important;">(C) 2003-2025 Abyss Gate. All rights reserved.</p>
              </div>
            </div>
          </td>
        </tr>
      </table>
    `;

    // --- ページ乗っ取り用のコンテナを作成し、HTMLを流し込む ---
    const chaosGate = document.createElement('div');
    chaosGate.id = 'chaos-gate';
    chaosGate.innerHTML = retro_html_content;
    document.body.appendChild(chaosGate);

})(); // 即時実行
