# Storage Field Lab｜2026 儲存實戰學院

正式網站：https://hellopages.github.io/storage/

這是 HelloPages 旗下的免費靜態教育訓練示範站，並非 Samsung 官方核可站點。

## 六款選品

9100 PRO、990 SSD、P9 USB4、P7 USB4、T9 microSD、T7 microSD；以 Samsung 台灣官方產品頁與新聞稿的指定容量資料為基準，不冒稱銷售排行榜。產品與官方來源在 `products.json`，官方圖片及原始連結在 `assets/sources.json`。

## 本次視覺升級

- 三類儲存產品的原創 SVG 動態資料流圖，真正可點選切換；可暫停／播放動畫並支援鍵盤箭頭操作與偏好減少動態效果。
- 隨分類變更的同類產品速度圖表，數字來自官方指定條件最高連續讀取（不同類型不直接比）。
- 黑色產品照移到淺色照片舞台，維持原始官方比例、底座與外觀，不以 AI 重畫。
- 每張產品卡增加 3 個圖像化銷售優勢，詳細話術及現場示範可展開，另有全部展開切換。
- 保留六組需求推薦、三類選購比較、六項觀念、十題正向銷售情境測驗（即時解析、結果、重新挑戰），沒有姓名、登入、成績上傳或付費 API。

## 免費架構與資料

純 HTML/CSS/JavaScript/JSON，不需綁信用卡。公開 GitHub Pages（Free Organization HelloPages）發佈，來源 Repository：https://github.com/HelloPages/storage。

首頁由 HelloPages.github.io 索引導向本網站；原其他個人 Repository 不因建立本網站而變更或搬遷。

## 正確性與公開原則

- 使用官方商品圖片，保留 `assets/sources.json` 註明原始圖片 URL、正式產品頁與 SHA。
- 官方指定容量上市建議售價不等於當前門市售價；不同容量／產品相容性請參考正式頁。
- 不包含私人 Samsung Lettermark PDF、私人帳號資料、金鑰或 Cookies；不自行生成 Lettermark。
- 網站使用原創教學圖示，不代表產品原廠實測結果或受 Samsung 品牌 VI 正式核可。

## 修改與驗收

網站上線檔案：`index.html`、`style.css`、`visual-lab.css`、`app.js`、`visual-lab.js`、`products.json`、`questions.json`、`assets/` 和 `.nojekyll`。

QA 腳本 `qa_site.py`、`qa_graphics.py` 只留本機，不上傳公開 Repo。

本機測試：`py qa_site.py`、`py qa_graphics.py`。若要實測正式網站，可設定 `STORAGE_QA_URL=https://hellopages.github.io/storage/` 重新執行。

四種尺寸：360×640、390×844、1280×720、1440×900；完整驗收包含圖形切換、原課程功能、速度圖、圖片解碼、十題測驗、分數及重新作答、無水平溢出和 JS 錯誤。

以正式公開 HTTPS 網址測試為上線依據。
