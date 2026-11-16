# Storage Field Lab｜2026 儲存實戰學院

正式網站：https://hellopages.github.io/storage/

這是 HelloPages 旗下的免費靜態教育訓練示範站，並非 Samsung 官方核可站點。

## 2026/11/16｜分類色塊與獨立產品卡版（目前版本）

依使用者要求，將原本一整串連續產品卡重整為**三個各自有色塊的產品章節**，每章兩款產品，不再讓手機讀者像在滑長篇文件。

- **01 內接 SSD**：淡綠色背景，9100 PRO、990 SSD 各一張白底卡。
- **02 外接 USB4 SSD**：淡藍色背景，P9、P7 各一張白底卡。
- **03 microSD**：暖米色背景，T9、T7 各一張白底卡。
- 章節外框保持平面、不加陰影；單一產品卡才用中性 1px 細框、8–10px 小圓角、右下 4px 乾淨錯位色塊。避免外卡內卡都做立體。
- 產品縮圖、型號、主訴求、核心數據、適合客群與第一句問法保持可直接看見；詳細銷售優勢、示範與官方詳細規格仍可展開。
- 新增三種類型快速跳轉、動態產品總數提示；篩選/搜尋會隱藏空章節，從推薦或比較跳到單機卡仍自動恢復可見狀態。
- 桌面每章兩款並排，手機每章單欄但卡片分開留白；沒有新增框架、服務或付費 API。
- **程式檔案：** `app.js` 生成三大分類與搜尋篩選狀態，`index.html` 提供分類導覽，`chapter-layout.css`（最後載入）統一章節色塊與手機卡片版型；其餘產品／問答 JSON 不變。
- **驗收：** `py qa_chapters.py` 檢查四種尺寸、三種不同背景色、每類2卡、章節/篩選/搜尋/錨點/官方圖片/展開與沒有水平溢出；`py qa_site.py` 完整十題測驗；`py qa_graphics.py` SVG 和圖片；`py qa_editorial.py` 自然攝影圖片（均需在本機和正式站各測一次）。
- 發布只能更新 `HelloPages/storage` 的 `main`，不得動到原 FlySamTW repo、其他網站或私人資料。

## 四種網址（交付時逐一核對）
- 一般完整網址：https://hellopages.github.io/storage/
- LINE 外部完整網址：https://hellopages.github.io/storage/?openExternalBrowser=1
- 一般無廣告短網址：https://spoo.me/2o8EHSl
- LINE 外部無廣告短網址：https://spoo.me/K6AH62a



## 六款選品

9100 PRO、990 SSD、P9 USB4、P7 USB4、T9 microSD、T7 microSD；以 Samsung 台灣官方產品頁與新聞稿的指定容量資料為基準，不冒稱銷售排行榜。產品與官方來源在 `products.json`，官方圖片及原始連結在 `assets/sources.json`。

## 2026/11/15 自然寫實情境圖修正版（目前版本）

依使用者意見，前版將從概念圖分割的影像大量硬塞進產品卡／比較／知識教學的作法已淘汰。新版採 **9 張不同的高品質自然寫實攝影風格生成圖**，先判斷是否真的對應顧客情境，才融入網站，不合適就不放。

- 官方產品照片只在產品教學卡片使用，維持三星台灣官方同型號真實照片、正確比例及未變形外觀；**AI 照片不得冒充 Samsung 產品圖**。
- 首頁：一張高品質旅人與攝影創作情境圖，不再把官方 SSD 照硬貼成浮動合成圖。
- 顧客故事：四張各自獨立、情境明確的影像創作／電競／戶外攝影／家庭回憶照片，可點選跳轉適合的需求分類。
- 需求選購：六張真正對應遊戲、電腦工作、影片創作、外出工作、空拍攝影及家庭回憶的圖片。
- 銷售測驗：只有情境確實吻合才顯示 AI 圖；例如第7與第10題是一般選購原則，**不硬搭圖片**。
- 產品卡、規格比較與技術知識：**不再重複硬塞情境照片**；保留官方實機圖、原創 SVG 示意圖與清楚文字。
- 圖像檔案及來源對照：`assets/ai/editorial/*.webp`、`assets/ai/editorial/manifest.json`，保留生成素材來源檔名、使用用途、SHA-256 與圖片尺寸；之前舊版已備份至本機 QA 資料夾。
- `ai-scenes.js` 與 `ai-scenes.css` 為情境層，獨立於 `app.js` 的產品與題庫資料，不新增付費 API／個資追蹤。
- 驗收需執行 `py qa_editorial.py`（自然攝影情境及配圖合理性）、`py qa_graphics.py`（SVG/比較/產品圖）、`py qa_site.py`（十題及全部舊功能），再從正式 HTTPS 網址跑相同測試。不得將本機成功冒稱正式站完成。

以上生成圖為獨立示範的情境插圖，並非 Samsung 官方核可素材；適用品牌審核仍以正式 VI 文件及流程為準，私有 Lettermark PDF 不公開。

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
