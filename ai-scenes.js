/* HelloPages editorial scenes · ImageGen-generated contextual artwork, not simulated Samsung products. */
"use strict";
(function () {
  const root = document.documentElement;
  const dir = "assets/ai/";
  const byNeed = {
    gaming: "gaming-studio", pc: "office-creator",
    film: "filmmaker-camera", mobile: "student-creator",
    action: "aerial-drone", family: "home-family"
  };
  const byProduct = {
    "9100pro": "competitive-gamer",
    "990ssd": "office-creator",
    p9: "film-editor",
    p7: "student-creator",
    t9microsd: "outdoor-artist",
    t7microsd: "home-family"
  };
  const categoryScene = ["gaming-studio", "filmmaker-camera", "mountain-photography"];
  const termScene = [
    "competitive-gamer", "office-creator", "aerial-drone",
    "film-editor", "outdoor-artist", "hero-travel"
  ];
  const questionScene = [
    "filmmaker-camera", "competitive-gamer", "office-creator", "student-creator",
    "aerial-drone", "home-family", "office-creator", "mountain-photography",
    "film-editor", "hero-explorer"
  ];
  const q = (sel, parent=document) => parent.querySelector(sel);
  const qa = (sel, parent=document) => Array.from(parent.querySelectorAll(sel));
  function safe(value) {
    return String(value).replace(/[&<>"']/g, ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
  }
  function sceneImg(name, alt = "") {
    return '<img src="' + dir + safe(name) + '.webp" alt="' + safe(alt) + '" loading="lazy" decoding="async">';
  }
  function makeCinemaStrip() {
    const hero = q(".hero");
    if (!hero || q("#sceneStories")) return;
    const strips = [
      ["film-editor", "film", "影像創作", "剪輯素材快速往返"],
      ["gaming-studio", "gaming", "遊戲玩家", "讓載入速度跟上節奏"],
      ["mountain-photography", "action", "戶外攝影", "把精彩瞬間帶回家"],
      ["home-family", "family", "日常生活", "把回憶好好收起來"]
    ];
    const html = '<section class="scene-stories" id="sceneStories" aria-label="AI 情境視覺故事">'
      + '<div class="shell stories-heading"><span>AI IMAGERY / REAL USE CASES</span><span>以情境理解儲存需求</span></div>'
      + '<div class="shell story-grid">'
      + strips.map(([img, need, title, subtitle]) =>
        '<button type="button" class="story-card" data-story-need="' + need + '" aria-label="選擇' + title + '需求">'
        + sceneImg(img, "AI 生成：" + title + "生活情境") + '<span class="story-shade"></span>'
        + '<span class="story-copy"><b>' + title + '</b><small>' + subtitle + '</small></span>'
        + '<span class="story-arrow" aria-hidden="true">↗</span></button>').join("")
      + '</div><p class="shell story-legend">圖像為 AI 創作的使用情境示意；產品本體一律以 Samsung 台灣官方照片為準。</p></section>';
    hero.insertAdjacentHTML("afterend", html);
    qa(".story-card").forEach(btn => btn.addEventListener("click", () => {
      const needButton = q('.need-card[data-need="' + btn.dataset.storyNeed + '"]');
      if (needButton) needButton.click();
      q("#selector")?.scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",block:"start"});
    }));
  }
  function enhanceHero() {
    const hero = q(".hero-visual");
    if (!hero || q(".hero-product-plate",hero)) return;
    const plate = document.createElement("div");
    plate.className = "hero-product-plate";
    plate.setAttribute("aria-hidden","true");
    const product = q(".hero-image",hero);
    if (product) product.before(plate);
    hero.setAttribute("data-ai-scene","hero-explorer");
  }
  function enhanceNeeds() {
    qa(".need-card[data-need]").forEach(card => {
      if (q(".need-scene",card)) return;
      const key = byNeed[card.dataset.need];
      if (!key) return;
      card.insertAdjacentHTML("afterbegin", '<span class="need-scene">'
        + sceneImg(key, "AI 生成：顧客使用情境") + '</span>');
    });
  }
  function enhanceProducts() {
    qa(".product-card").forEach(card => {
      const id=card.id.replace(/^product-/,"");
      const image=byProduct[id];
      const holder=q(".product-media",card);
      if (!holder || q(".product-scene",holder)||!image) return;
      const scenario=id==="9100pro"?"高效能遊戲":id==="990ssd"?"日常電腦":id==="p9"?"專業剪輯":id==="p7"?"跨裝置工作":id==="t9microsd"?"戶外攝影":"日常回憶";
      holder.insertAdjacentHTML("afterbegin", '<span class="product-scene">'
         + sceneImg(image, "AI 創作：" + scenario + "使用情境")
         + '<span class="scene-tag">AI 生成情境 · '+scenario+'</span></span>');
    });
  }
  function enhanceCompare() {
    qa(".comparison-card").forEach((card,index)=>{
      if(q(".comparison-scene",card))return;
      const name=categoryScene[index]||"film-editor";
      card.insertAdjacentHTML("afterbegin", '<figure class="comparison-scene">'
        + sceneImg(name,"AI 生成：儲存選購情境") + '</figure>');
    });
  }
  function enhanceKnowledge() {
    qa(".term-item").forEach((card,index)=>{
      if(q(".term-scene",card))return;
      card.insertAdjacentHTML("afterbegin", '<div class="term-scene">'
        + sceneImg(termScene[index%termScene.length],"AI 生成：儲存設備生活示意") + '</div>');
    });
  }
  function enhanceQuiz() {
    const card=q("#quizCard");
    if(!card || q(".quiz-scene",card))return;
    const finish=q(".quiz-finish",card);
    const counter=q(".quiz-counter",card);
    if(!finish&&!counter)return;
    const idx=finish?9:Math.max(0,Math.min(9,(parseInt(counter.textContent,10)||1)-1));
    const name=questionScene[idx];
    const banner=document.createElement("div");
    banner.className="quiz-scene";
    banner.innerHTML=sceneImg(name,"AI 生成：銷售實戰情境示意")+'<span>場景式銷售挑戰 / VISUAL CASE '+String(idx+1).padStart(2,"0")+'</span>';
    card.insertAdjacentElement("afterbegin",banner);
  }
  function monitorQuiz() {
    const el=q("#quizCard");if(!el)return;
    let pending=false;
    const observer = new MutationObserver(()=>{
      if(pending)return;
      pending=true;queueMicrotask(()=>{pending=false;enhanceQuiz()});
    });
    observer.observe(el,{childList:true});
    enhanceQuiz();
  }
  function setup() {
    if(q("#sceneStories"))return;
    enhanceHero();makeCinemaStrip();enhanceNeeds();enhanceProducts();enhanceCompare();enhanceKnowledge();monitorQuiz();
    root.dataset.aiScenesLoaded="12";
  }
  if(root.dataset.loaded==="true")setup();
  else {
    const observer=new MutationObserver(()=>{
      if(root.dataset.loaded==="true"){observer.disconnect();setup();}
    });
    observer.observe(root,{attributes:true,attributeFilter:["data-loaded"]});
  }
})();
