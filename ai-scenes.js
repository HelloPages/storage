/* HelloPages · natural editorial contexts 2026-11-15.
 * AI artwork supports grounded customer situations only.
 * Product hardware photos and verified specs are owned by app.js and stay official.
 */
"use strict";
(() => {
  const root = document.documentElement;
  const base = "assets/ai/editorial/";
  const $ = (q, parent=document) => parent.querySelector(q);
  const $$ = (q, parent=document) => [...parent.querySelectorAll(q)];
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
  const needImage = {
    gaming:"gamer-daylight", pc:"office-work", film:"studio-editor",
    mobile:"student-creator", action:"drone-outdoor", family:"family-memories"
  };
  const questionImage = [
    "film-workflow","gamer-daylight","office-work","student-creator",
    "drone-outdoor","family-memories",null,"drone-outdoor","studio-editor",null
  ];
  const storyCards = [
    {file:"film-workflow",need:"film",title:"影像創作",text:"大型素材，從拍攝到剪輯"},
    {file:"gamer-evening",need:"gaming",title:"遊戲體驗",text:"讓電腦規格真正發揮"},
    {file:"drone-outdoor",need:"action",title:"戶外攝影",text:"旅途中紀錄每個瞬間"},
    {file:"family-memories",need:"family",title:"生活回憶",text:"妥善保存重要的畫面"}
  ];
  const src=name=>base+name+".webp";
  const safe=text=>String(text).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const img=(name,alt,lazy=true)=>'<img src="'+src(name)+'" alt="'+safe(alt)+'" loading="'+(lazy?'lazy':'eager')+'" decoding="async">';

  function hero(){
    const el=$(".hero-visual");
    if(!el)return;
    el.classList.add("natural-hero");
    // Keep the original product photo in product cards instead of superimposing a false product scene.
    const oldImage=$(".hero-image",el);
    if(oldImage)oldImage.remove();
    const corner=$(".hero-corner-label",el);
    if(corner)corner.textContent="FIELD STORY / CREATIVE WORK";
    const info=$(".visual-info",el);
    if(info)info.innerHTML='<div><span>創作與儲存的生活故事</span><strong>讓靈感自由前進。</strong></div><span class="visual-index">SCENE 01</span>';
    const code=$(".hero-code",el);
    if(code)code.textContent="AI 情境示意｜非 Samsung 產品實拍";
  }
  function stories(){
    const section=$(".hero");
    if(!section || $("#sceneStories"))return;
    const block='<section class="scene-stories" id="sceneStories" aria-label="四種顧客生活情境">'
      +'<div class="shell stories-heading"><span>PEOPLE & PURPOSE</span><span>先看使用需求，再找合適的儲存方案</span></div>'
      +'<div class="shell story-grid">'+storyCards.map(story=>
         '<button class="story-card" type="button" data-story-need="'+story.need+'" aria-label="探索'+safe(story.title)+'的儲存需求">'
         +img(story.file,"AI 生成的"+story.title+"生活情境",false)+'<span class="story-shade"></span>'
         +'<span class="story-copy"><b>'+story.title+'</b><small>'+story.text+'</small></span>'
         +'<span class="story-arrow" aria-hidden="true">↗</span></button>'
       ).join("")+'</div>'
       +'<p class="shell story-legend">以上為 AI 生成的生活情境圖片，並非 Samsung 官方產品宣傳照；產品外觀以各款官方產品照為準。</p>'
       +'</section>';
    section.insertAdjacentHTML("afterend",block);
    $$(".story-card").forEach(button=>button.addEventListener("click",()=>{
      const need=$('.need-card[data-need="'+button.dataset.storyNeed+'"]');
      if(need)need.click();
      $("#selector")?.scrollIntoView({behavior:reduceMotion.matches?"instant":"smooth",block:"start"});
    }));
  }
  function needs(){
    $$(".need-card[data-need]").forEach(button=>{
      const name=needImage[button.dataset.need];
      if(!name || $(".need-scene",button))return;
      button.insertAdjacentHTML("afterbegin",'<span class="need-scene">'
        +img(name,"AI 生成的"+button.querySelector(".need-words b")?.textContent+"使用情境",false)
        +'</span>');
    });
  }
  function questionScene(){
    const host=$("#quizCard");
    if(!host || $(".quiz-scene",host))return;
    const finished=$(".quiz-finish",host);
    if(finished)return; // No arbitrary artwork on a score summary.
    const counter=$(".quiz-counter",host);
    if(!counter)return;
    const index=Math.max(0,Math.min(9,(parseInt(counter.textContent,10)||1)-1));
    const name=questionImage[index];
    if(!name)return; // Do not force art onto questions about general recommendation principles.
    const scene=document.createElement("div");
    scene.className="quiz-scene";
    scene.innerHTML=img(name,"AI 生成的第"+(index+1)+"題顧客情境")
       +'<span>顧客情境 / '+String(index+1).padStart(2,"0")+'</span>';
    host.prepend(scene);
  }
  function watchQuiz(){
    const host=$("#quizCard");if(!host)return;
    let scheduled=false;
    const observer=new MutationObserver(()=>{
      if(scheduled)return;
      scheduled=true;
      queueMicrotask(()=>{scheduled=false;questionScene()});
    });
    observer.observe(host,{childList:true});
    questionScene();
  }
  function start(){
    if(root.dataset.editorialReady)return;
    hero();stories();needs();watchQuiz();
    root.dataset.editorialReady="9";
  }
  if(root.dataset.loaded==="true")start();
  else {
    const observer=new MutationObserver(()=>{
      if(root.dataset.loaded==="true"){observer.disconnect();start();}
    });
    observer.observe(root,{attributes:true,attributeFilter:["data-loaded"]});
  }
})();
