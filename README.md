# A Little Note for You · 婕伶

PID 送給婕伶的歡送電子卡片。單頁網站，純 HTML / CSS / JavaScript，不需要後端、資料庫或任何付費服務，可以直接放上 GitHub Pages。

## 檔案結構

```text
farewell-card/
├── index.html        ← 網頁骨架（一般不需要改）
├── style.css         ← 樣式、顏色、字體（顏色集中在最上面的 :root）
├── script.js         ← 互動：開信封、照片、信件視窗、淡入動畫（一般不需要改）
├── data.js           ← ✏️ 所有內容：照片、15 封信、祝福小紙條
├── README.md
└── assets/
    ├── photos/
    │   ├── photo1.jpg   車上自拍
    │   ├── photo2.jpg   兩人拿攝影師名牌
    │   ├── photo3.jpg   PID 大合照（中間＋結尾都會用到）
    │   └── photo4.jpg   一起吃飯的自拍
    └── decorations/
        └── illustration.png   Jill & Will 插畫（開場信封）
```

## 如何修改內容（只需要改 `data.js`）

### 換照片
1. 把新照片放進 `assets/photos/`（建議寬度 1200px 左右、JPG）。
2. 在 `data.js` 的 `photos` 裡改 `src` 檔名，或複製一行新增：
   ```js
   { src: "assets/photos/photo5.jpg", alt: "照片描述", caption: "PID Family" },
   ```
3. 直式照片想控制顯示比例，可加 `ratio: "4 / 5"`；被裁切時想保留下方人物，加 `focus: "50% 80%"`。
4. 結尾的大合照在 `closingPhoto`。

電腦版會自動排成拼貼（最多 5 張排得最漂亮），手機版會變成左右滑動相簿。

### 改信件
在 `data.js` 的 `letters` 裡，每封信長這樣：
```js
{ id: 15, label: "Note 15", author: "心萱 Shenny",
  message: "第一段\n第二段" },
```
- 換行用 `\n`。
- `author` 留空 `""` 會顯示 Anonymous。
- 新增或刪除信件，標題的數字（15 little notes）會自動更新。
- 文字裡如果有英文雙引號 `"`，請寫成 `\"`。

### 改祝福小紙條
`data.js` 的 `wishes`：`{ text: "內容", author: "署名" }`。中文會自動用中文字體、英文用斜體襯線字。

### 改顏色
`style.css` 最上面的 `:root`。

## 本機預覽
直接雙擊 `index.html` 用瀏覽器打開即可。

## 部署到 GitHub Pages

1. 登入 GitHub → 右上角 **+** → **New repository**，取個名字（例如 `for-jieling`），選 **Public** → **Create repository**。
2. 在新 repo 頁面點 **uploading an existing file**，把 `farewell-card` 資料夾**裡面的所有檔案與 assets 資料夾**拖進去（`index.html` 要在最外層）→ **Commit changes**。
3. 到 **Settings → Pages**，Source 選 **Deploy from a branch**，Branch 選 **main**、資料夾 **/ (root)** → **Save**。
4. 等 1–2 分鐘，網址會出現在同一頁，例如 `https://你的帳號.github.io/for-jieling/`。
5. 之後要改內容：在 GitHub 上點 `data.js` → 鉛筆圖示編輯 → Commit，約一分鐘後網站更新。

> 小提醒：網站是公開網址，知道網址的人都看得到；信件中有大家的名字，分享時請留意。

## 已完成的互動
- 信封輕微浮動、點擊開信（封蓋翻開、插畫升起），之後自動捲到下一區
- Scroll indicator、smooth scrolling
- 照片進場淡入、hover 微微上浮放大；手機版左右滑動＋小圓點
- 信件卡片 hover 上浮，點擊開啟信紙視窗；可用「上一封／下一封」、鍵盤 ← →、Esc 關閉，關閉後回到原本的卡片
- 祝福紙條、結尾文字逐行淡入
- 支援 `prefers-reduced-motion`（系統設定減少動態時，所有動畫關閉）

## 外部資源
只用了 Google Fonts（Cormorant Garamond、Noto Sans TC、Caveat）。若字體載入失敗，會自動改用系統字體，不影響閱讀。
