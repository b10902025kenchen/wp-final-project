# 111-1 Web programming final project report
## 基本資料
組別: 52<br>
組員: b10902025 陳楷元<br>
組長: b10902025 陳楷元<br>
題目名稱: Gobang 五子棋 AI
## 題目介紹
這是一個五子棋遊戲，玩家須先註冊後才能登入，註冊時須符合畫面顯示之條件，登入後即可進入首頁，首頁右上角會有玩家簡介，另外主要服務功能有以下五項：<br>
* Battle<br>
  * 按下此按鈕後，可與其他玩家連線對戰，連線方式為輸入欲對戰玩家之帳號，輸入後會顯示"Waiting for the other player to join..."，直到另一位玩家也輸入你的帳號後，兩人皆將自動進入棋盤，電腦將自動決定何方先手，並可開始對戰。
  * 遊戲結束後，獲勝方會收到"You win"的訊息，落敗方會收到"You lose"的訊息，並需支付100 coins給獲勝方，若兩人平手，皆會收到"Tie game"的訊息，並不會有coins的轉換。
* Play
  * 本功能為此遊戲的核心，玩家按下play後可挑戰本遊戲的AI
  * 賽局進行中，玩家可能因為自己投降，或是時間終了而落敗並結束遊戲，若為以上理由落敗將無法得到任何coins。若有完成賽局，玩家獲勝可得50 coins，平手可得20 coins，落敗可得10 coins。
  * 在賽局結束後，原本下方resign(投降)的按鈕會變成replay prev next三個按鈕，按下replay即可開始覆盤，按下prev可往前一手，按下next可往後一手。
  * 賽局結束後，modal會出現，玩家可選擇restart重新開始賽局，或是按下hide預覽殘局畫面，此時hide會變成show，再次觸及，modal將重新出現。
* Profile
  * 本遊戲會統計玩家與AI對戰之戰績，另外也有計算等第，計算方式為每100 coins可使level +1
  * 點下profile可預覽玩家的資料，包含累計戰績、level與coins...
* Settings
  * 預設棋盤大為13x13，玩家先手，時間限制為10分鐘
  * 點下settings後，玩家能設定與AI對戰的遊戲機制，包含誰先手、棋盤大小與時間限制
* Log Out
## 使用與參考之框架/模組/原始碼
- 前端： React.js
- 後端： Websocket, Express.js
- 資料庫： MongoDB Atlas
- code structure
```
├── frontend
│   ├── login & register
│   ├── container: gobang
│   │   ├── homepage
│   │   ├── join game
│   │   │   ├── game
│   │   │   |   |── cell
|   |   |   |   |── modal
│   │   ├── board
│   │   │   ├── cell
│   │   │   ├── modal
│   │   │   └── dashboard
│   │   ├── profile
│   │   └── settings
├── backend
│   ├── websocket
│   │   ├── join game
│   │   ├── change board
│   ├── http
│   │   ├── user
│   │   │   ├── sign up
│   │   │   ├── log in
│   │   │   ├── update
│   │   │   ├── get
│   │   │   ├── create battle
│   │   ├── AI
│   │   │   ├── think
│   │   │   └── check
|─── database
│   ├── game
│   ├── user
```
- file tree:
```
├── backend
│   ├── package.json
│   ├── src
│   │   ├── db.js
│   │   ├── models
│   │   │   ├── game.js
│   │   │   └── user.js
│   │   ├── routes
│   │   │   ├── AI.js
│   │   │   ├── User.js
│   │   │   └── index.js
│   │   ├── server.js
│   │   └── wsConnect.js
│   └── yarn.lock
├── frontend
│   ├── README.md
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── src
│   │   ├── App.css
│   │   ├── App.js
│   │   ├── api.js
│   │   ├── components
│   │   │   ├── Board.js
│   │   │   ├── Cell.js
│   │   │   ├── Cell2.js
│   │   │   ├── Dashboard.js
│   │   │   ├── Game.js
│   │   │   ├── HomePage.js
│   │   │   ├── Intro.js
│   │   │   ├── JoinGame.js
│   │   │   ├── Login.js
│   │   │   ├── Modal.js
│   │   │   ├── css
│   │   │   │   ├── Board.css
│   │   │   │   ├── Cell.css
│   │   │   │   ├── Dashboard.css
│   │   │   │   ├── HomePage.css
│   │   │   │   ├── Intro.css
│   │   │   │   ├── JoinGame.css
│   │   │   │   ├── Login.css
│   │   │   │   ├── Modal.css
│   │   │   │   ├── background.PNG
│   │   │   │   ├── background2.PNG
│   │   │   │   ├── profile.css
│   │   │   │   └── settings.css
│   │   │   ├── profile.js
│   │   │   ├── register.js
│   │   │   └── settings.js
│   │   ├── containers
│   │   │   ├── GoBang.css
│   │   │   └── GoBang.js
│   │   ├── index.js
│   │   └── util
│   │       └── createBoard.js
│   └── yarn.lock
├── package.json
└── yarn.lock
```
## 使用之第三方套件、框架、程式碼
- 前端： axios, antd, styled-components, ant-design, fontawesome
- 後端： dotenv-defaults, mongoose, uuidv4, bycrypt
## 專題心得
我認為這次專題最困難的地方是設計五子棋AI，因為這是跳脫這門課的技術，所以我蠻早開始思考如何設計出夠強的AI。在完成AI的時候發現，如果只有單純電腦與人的對戰，運用到這門課的技術的部份較少，因此才又將上連線對戰的部分。
從學期剛開始對網頁設計毫無頭緒，到學期結束時能完成final project，網服這門課讓我學到很多。感謝老師與助教設計的每次作業、投影片和考試，讓我能更了解網服的知識。
## Deploy 連結
https://final-project-production-e536.up.railway.app/
## 測試步驟
yarn <br>
cd frontend<br>
yarn<br>
cd ..<br>
cd backend<br>
yarn<br>
cd ..<br>
yarn start<br>
yarn server<br>
## 負責項目
- b10902025 陳楷元<br>
由這組只有我一人，所以所有部分皆為我負責，包含兩人對戰的連線、五子棋AI的設計、玩家資料的儲存與更新、前端所有的頁面設計與操作方法...
- 其餘參考資料<br>
  - hw4的程式碼：遊戲結束時的modal，是直接拿踩地雷當中的程式碼modal.css修改
  - https://www.youtube.com/watch?v=X3qyxo_UTR4&ab_channel=DaveGray：由於不知道怎樣才算是有資安問題，因此密碼規定的限制與登入註冊的畫面安排參考以上此youtube影片
  - https://levelup.gitconnected.com/how-to-make-a-go-board-with-css-ac4cba7d0b72：由於我對畫出一顆好看的棋子相當有障礙，黑白棋的漸層畫法是根據此頁面的程式碼去調整