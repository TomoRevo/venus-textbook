const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  console.log('PDF生成を開始します...');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  // ローカルHTMLファイルを読み込む
  const htmlPath = 'file://' + path.resolve(__dirname, 'venus_document.html');
  await page.goto(htmlPath, { waitUntil: 'networkidle0', timeout: 30000 });

  // フォント描画を安定させるため少し待機
  await new Promise(r => setTimeout(r, 1000));

  // PDF出力（A4・背景あり・CSSのページ設定を優先）
  const outputPath = path.resolve(__dirname, 'ヴィーナス美顔ヨガ_講座テキスト.pdf');
  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '14mm', bottom: '14mm', left: '15mm', right: '15mm' },
    preferCSSPageSize: false,
  });

  await browser.close();

  console.log('完了！');
  console.log('保存先: ' + outputPath);
})();
