// このJSファイルをブラウザで直接開くと、document.writeでHTMLを生成し、Pongゲームが自動実行されます。
// 注意: document.writeはページロード時にしか使えません。リロードで再実行。

document.write('<!DOCTYPE html>');
document.write('<html lang="ja">');
document.write('<head>');
document.write('    <meta charset="UTF-8">');
document.write('    <meta name="viewport" content="width=device-width, initial-scale=1.0">');
document.write('    <title>Pong Game</title>');
document.write('</head>');
document.write('<body style="margin:0; padding:20px; background-color:#f0f0f0; font-family:Arial, sans-serif; text-align:center;">');
document.write('    <script>');

// ここからゲームのJSコード（前のものをそのまま）
document.write(`
    // PongゲームをJavaScriptだけで実装（DOM操作とインラインスタイル）
    // PC: W/Sキーまたは矢印キー↑↓で左パドル制御
    // スマホ: タッチで左パドル制御
    // 右パドルはシンプルAI

    // ゲーム変数
    let canvas, ctx;
    let ball = { x: 0, y: 0, dx: 5, dy: 3, radius: 10 };
    let paddle1 = { x: 20, y: 150, width: 10, height: 80, dy: 0 }; // 左パドル (プレイヤー)
    let paddle2 = { x: 570, y: 150, width: 10, height: 80, dy: 0 }; // 右パドル (AI)
    let score1 = 0, score2 = 0;
    let keys = {};
    let touchY = 0;
    let gameRunning = true;

    // キャンバス作成とスタイル設定
    function init() {
        canvas = document.createElement('canvas');
        canvas.width = 600;
        canvas.height = 400;
        canvas.style.border = '2px solid #000';
        canvas.style.display = 'block';
        canvas.style.margin = '0 auto';
        canvas.style.backgroundColor = '#000';
        canvas.style.touchAction = 'none'; // タッチスクロール防止
        document.body.appendChild(canvas);
        document.body.style.margin = '0';
        document.body.style.padding = '20px';
        document.body.style.backgroundColor = '#f0f0f0';
        document.body.style.fontFamily = 'Arial, sans-serif';
        document.body.style.textAlign = 'center';

        ctx = canvas.getContext('2d');

        // キーボードイベント
        document.addEventListener('keydown', (e) => {
            keys[e.key.toLowerCase()] = true;
        });
        document.addEventListener('keyup', (e) => {
            keys[e.key.toLowerCase()] = false;
        });

        // タッチイベント (スマホ対応)
        canvas.addEventListener('touchstart', handleTouch);
        canvas.addEventListener('touchmove', handleTouch);
        canvas.addEventListener('touchend', () => { touchY = 0; });

        function handleTouch(e) {
            e.preventDefault();
            const touch = e.touches[0];
            const rect = canvas.getBoundingClientRect();
            touchY = touch.clientY - rect.top;
        }

        // 初期位置設定
        resetBall();

        // ゲームループ開始
        gameLoop();
    }

    // ボールリセット
    function resetBall() {
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.dx = ball.dx > 0 ? 5 : -5;
        ball.dy = (Math.random() - 0.5) * 6;
    }

    // パドル移動 (プレイヤー)
    function updatePaddle1() {
        // キーボード制御
        if (keys['w'] || keys['arrowup']) {
            paddle1.dy = -6;
        } else if (keys['s'] || keys['arrowdown']) {
            paddle1.dy = 6;
        } else {
            paddle1.dy *= 0.9; // 慣性減衰
        }

        // タッチ制御 (優先)
        if (touchY > 0) {
            const targetY = touchY - paddle1.height / 2;
            paddle1.dy = (targetY - paddle1.y) * 0.1;
        }

        paddle1.y += paddle1.dy;
        paddle1.y = Math.max(0, Math.min(canvas.height - paddle1.height, paddle1.y));
    }

    // AIパドル移動 (シンプル: ボールを追う)
    function updatePaddle2() {
        const targetY = ball.y - paddle2.height / 2;
        paddle2.dy = (targetY - paddle2.y) * 0.08;
        paddle2.y += paddle2.dy;
        paddle2.y = Math.max(0, Math.min(canvas.height - paddle2.height, paddle2.y));
    }

    // 衝突検出
    function checkCollisions() {
        // 壁衝突
        if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
            ball.dy = -ball.dy;
        }

        // パドル1衝突
        if (ball.x - ball.radius < paddle1.x + paddle1.width &&
            ball.y > paddle1.y && ball.y < paddle1.y + paddle1.height) {
            ball.dx = -ball.dx;
            ball.dy += (ball.y - (paddle1.y + paddle1.height / 2)) * 0.2;
        }

        // パドル2衝突
        if (ball.x + ball.radius > paddle2.x &&
            ball.y > paddle2.y && ball.y < paddle2.y + paddle2.height) {
            ball.dx = -ball.dx;
            ball.dy += (ball.y - (paddle2.y + paddle2.height / 2)) * 0.2;
        }

        // 得点
        if (ball.x < 0) {
            score2++;
            resetBall();
        } else if (ball.x > canvas.width) {
            score1++;
            resetBall();
        }
    }

    // 描画
    function draw() {
        // クリア
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // ボール
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fill();

        // パドル
        ctx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
        ctx.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);

        // 中央線
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, 0);
        ctx.lineTo(canvas.width / 2, canvas.height);
        ctx.strokeStyle = '#fff';
        ctx.stroke();
        ctx.setLineDash([]);

        // スコア
        ctx.fillStyle = '#fff';
        ctx.font = '30px Arial';
        ctx.fillText(score1, canvas.width / 4, 50);
        ctx.fillText(score2, (3 * canvas.width) / 4, 50);
    }

    // ゲームループ
    function gameLoop() {
        if (!gameRunning) return;

        updatePaddle1();
        updatePaddle2();
        ball.x += ball.dx;
        ball.y += ball.dy;
        checkCollisions();
        draw();

        requestAnimationFrame(gameLoop);
    }

    // 初期化実行
    init();
`);

// スクリプト終了
document.write('    </script>');
document.write('</body>');
document.write('</html>');

// ページを閉じる（document.writeの後）
document.close();