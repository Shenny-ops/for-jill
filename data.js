/* =========================================================
   婕伶歡送電子卡片 — 所有內容都在這個檔案
   ---------------------------------------------------------
   ✏️ 要改照片、信件、祝福，只需要改這裡，不用動其他檔案。
   - 文字裡要換行：直接用 \n
   - 照片放在 assets/photos/，再把檔名寫在 src
   ========================================================= */

window.CARD_DATA = {

  /* ---------- 照片（Little Moments） ----------
     src     : 照片路徑
     alt     : 照片的文字描述（給螢幕閱讀器）
     caption : 照片下方的手寫字
     focus   : （選填）照片太長被裁切時，要保留的位置，例如 "50% 80%" = 偏下方
     ratio   : （選填）強制照片比例，例如 "4 / 5"；不填就顯示原比例          */
  photos: [
    { src: "assets/photos/photo1.jpg", alt: "大家一起坐車出門的自拍", caption: "PID Family" },
    { src: "assets/photos/photo2.jpg", alt: "兩人拿著攝影師名牌的合照", caption: "PID Family", ratio: "4 / 5", focus: "50% 78%" },
    { src: "assets/photos/photo3.jpg", alt: "PID 大合照", caption: "PID Family" },
    { src: "assets/photos/photo4.jpg", alt: "大家一起吃飯的自拍", caption: "PID Family" }
    // 想加照片：複製上面一行，改成 photo5.jpg（最多建議 5 張）
  ],

  /* ---------- 結尾大合照 ---------- */
  closingPhoto: { src: "assets/photos/photo3.jpg", alt: "PID 大合照", caption: "PID Family" },

  /* ---------- 信件（Letters to You） ----------
     id      : 編號（不重複即可）
     label   : 卡片上的標題，例如 "Note 01"
     author  : 署名；留空字串 "" 會顯示 Anonymous
     message : 信件全文                                              */
  letters: [
    { id: 1, label: "Note 01", author: "郭俞妤",
      message: "親愛的婕伶，真的很開心能在加入PID當新人時，有你當我的培訓聯絡人！讓我被滿滿的關心！\n還記得小孩日去你家住，真的太幸福了，是我非常珍貴的回憶~~在這兩年服務，真的看見你的很多美好特質，總是溫柔的跟我打招呼，也認真負責每一件事，細心關心身邊的夥伴，給了很多讓人感動的稱讚，真的是我的好榜樣！很珍惜跟你一起工作的點點滴滴，這些美好回憶不需要刻意想起，因為永遠不會忘記！我會很想你啊ヽ(✿ﾟ▽ﾟ)ノ雖然很捨不得但我相信婕伶未來不管去哪裡服務，都能帶給地區裡的人溫暖~" },
    { id: 2, label: "Note 02", author: "Shana",
      message: "My dear Jieling,\nI will miss you my friend!! Thank you for helping me during my lowest time and for making me feel needed and helpful when I felt like I was of no use to anyone! You have such a beautiful heart and your kind and gentle spirit makes everyone around you feel at ease.  You are a precious daughter of Jehovah and he will bless you for your willing spirit! No matter where you guys are assigned, you will be blessing to the brothers and sisters you serve with. I love you very much and I wish you both nothing but the best as you start this new chapter in your life together! May Jehovah richly bless you my dear friend!" },
    { id: 3, label: "Note 03", author: "邱涵",
      message: "這幾次和你一起工作，不管是要完成文件還是拍攝工作，就算當下情況是緊張的，你還是能夠表現不慌不忙的態度，讓我也覺得很安心，這真的是一個很棒的特質呢！謝謝你和先生都獻出自己為耶和華做很好的服務，也期待之後聽到耶和華給你們什麼新委派ദ്ദി*ˊᗜˋ*)" },
    { id: 4, label: "Note 04", author: "鄧大偉",
      message: "婕伶\n謝謝你在PID做的一切服務，雖然我不知道具體你作的事情有多\"雜\"......翻譯、秘書、行政、辦公室雜事、甚至接待PID遠程人員，謝謝你做的這些事情。\n這段時間你為伯特利和耶和華所做的，一定會成為你的養分繼續幫助你建立更堅強的信心，讓你可以走的更遠更穩，再次謝謝你的優質服務。\n好好享受SKE的課程！" },
    { id: 5, label: "Note 05", author: "羅潔",
      message: "J伶！謝謝你為PID貢獻許許許多，不計其數，我十分之期待你們會派去何方？說不定是沖繩！😂" },
    { id: 6, label: "Note 06", author: "蔡佳琪",
      message: "親愛的婕伶，我們算是同期一起進PID的吧？很喜歡剛進PID跟妳一起翻譯的時候，妳在翻譯上的細心和精準的校對，我學到很多！真的謝謝妳在PID的服務！" },
    { id: 7, label: "Note 07", author: "Heather",
      message: "謝謝妳長期以來在公共資訊部和法律部的辛勤付出！我非常讚賞妳在文件準備、報告撰寫和翻譯方面的專業與細心。我會非常想念妳！You are an excellent example and I wish we could have gotten together more often, I know you will be a real asset wherever you are sent, Love you" },
    { id: 8, label: "Note 08", author: "李孟澄",
      message: "婕伶~沒想到還沒有機會跟妳更深入的認識妳就要去SKE了QAQ，雖然很難過但也很期待妳跟蘇弟兄未來會有更精彩的旅程！謝謝妳一直以來的服務~" },
    { id: 9, label: "Note 09", author: "湯宜臻",
      message: "Dear Jill~\n\nI've truly loved getting to know you better over the past few months. Thank you for your kindness, hospitality, support, and genuine care. Working with you has been such a pleasure, and you've always made me feel comfortable and appreciated.\n\nI am so happy for you as you begin this new journey, but I will definitely miss you! Thank you for all the wonderful memories and for being such a lovely person to work with. May Jehovah richly bless you and guide you wherever life takes you." },
    { id: 10, label: "Note 10", author: "潘宏儒",
      message: "謝謝婕伶的服務!\n有很多不為人知的工作是你們在幕後完成的，你們為了耶和華和弟兄姐妹無私地付出。\n耶和華一定會祝福你們，也希望你們在新的崗位享有滿滿的喜樂!" },
    { id: 11, label: "Note 11", author: "陳品任",
      message: "嗨～婕伶\n謝謝你在PID的努力，你總是迅速又可靠地完成工作，也努力培訓部門的新人，相信大家會把你專注細節的精神延續下去。\n希望你們好好享受新委派，繼續快樂地為耶和華工作～" },
    { id: 12, label: "Note 12", author: "劉宛伶",
      message: "婕伶～進來PID知道原來妳即將離開去SKE，一方面真的替妳感到高興，另一方面也有些不捨，很感謝至少有機會上到妳的現場培訓課！很欣賞婕伶的認真又讓人感到溫暖的特質，未來有新的挑戰，但相信你們一定會繼續因耶和華而得到最好的照顧，等你們上課回來，要一起吃飯、聽聽你們的故事喔！！" },
    { id: 13, label: "Note 13", author: "以梵",
      message: "申命記33:18西布倫啊，願你在外面時歡喜，以薩迦啊，願你在帳篷裡也快樂。\n無論你將來在哪裡服務，希望你繼續快樂～" },
    { id: 14, label: "Note 14", author: "Jessica",
      message: "Dear Jill-伶,\n\nI'm so sad you're leaving, but so happy we were able to meet each other through PID! You've been so fun, so easy and encouraging to work with, and SO patient with me. I'm forever grateful! I've really enjoyed all the time we got to spend together, both at work and at play! Your future classmates (and future congregation) will now get to enjoy those wonderful qualities you bring. We are so grateful to you and Will for the many times you showed hospitality to us and hope we will get to return the love when you come to Tainan! We're looking forward to seeing where Jehovah will use you both next. Enjoy SKE, my friend! ❤️\nSee you on Tuesdays, and I promise to clean your seats extra well! 😄\n\nLove,\nJessica" },
    { id: 15, label: "Note 15", author: "心萱 Shenny",
      message: "雖然和婕伶相處的時間不算長，但因為妳很有親和力，總讓人覺得好像認識很久了。妳就像一位溫暖又可靠的大姐姐，無論聊天還是一起工作，都讓人感到很安心。\n我印象很深的是，之前妳邀請我去高雄受培訓時住妳家。明明我們才剛認識不久，妳卻這麼貼心地想到我，主動邀請我，真的讓我覺得很溫暖，也很感謝妳！\n希望你們在新的地區能快樂地服務，相信妳的親切和溫暖一定會為當地的弟兄姊妹帶來許多歡笑和鼓勵！我也會繼續為妳們禱告。" }
  ],

  /* ---------- 小紙條祝福（Little Things We Appreciate） ----------
     摘自大家的信；text 是內容，author 是署名                        */
  wishes: [
    { text: "總是溫柔的跟我打招呼，也認真負責每一件事。", author: "郭俞妤" },
    { text: "Your kind and gentle spirit makes everyone around you feel at ease.", author: "Shana" },
    { text: "就算當下情況是緊張的，你還是能夠表現不慌不忙的態度，讓我也覺得很安心。", author: "邱涵" },
    { text: "You've always made me feel comfortable and appreciated.", author: "湯宜臻" }
  ]
};
