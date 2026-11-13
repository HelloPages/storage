/* Samsung Taiwan publicly sourced product-training demonstrator, no account or paid API. */
"use strict";
const $=(q,root=document)=>root.querySelector(q), $$=(q,root=document)=>Array.from(root.querySelectorAll(q));
const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const fmt=n=>"NT$ "+Number(n).toLocaleString("zh-TW");
const S={data:null,questions:[],filter:"all",search:"",selected:"film",index:0,score:0,locked:false};
const products=new Map();
const symbols={gaming:"◩",pc:"▦",film:"▣",mobile:"◇",action:"⊞",family:"▤"};
function photo(p){return '<img src="'+esc(p.image)+'" alt="'+esc(p.name+" "+p.sample+" Samsung 台灣官方產品圖")+'" loading="lazy" decoding="async">';}
function productLink(p){return '<a class="external-link" href="'+esc(p.official)+'" target="_blank" rel="noopener noreferrer">三星官方規格 ↗</a>';}
function drawNeeds(){
  $("#needsGrid").innerHTML=S.data.needs.map(n=>'<button type="button" data-need="'+n.id+'" class="need-card'+(S.selected===n.id?" is-selected":"")+'" aria-pressed="'+(S.selected===n.id)+'"><span class="need-icon" aria-hidden="true">'+(symbols[n.id]||"▦")+'</span><span class="need-words"><b>'+esc(n.title)+'</b><small>'+esc(n.hint)+'</small></span><span class="need-arrow">↗</span></button>').join("");
  $$(".need-card").forEach(btn=>btn.addEventListener("click",()=>{S.selected=btn.dataset.need;$$(".need-card").forEach(b=>{b.classList.toggle("is-selected",b===btn);b.setAttribute("aria-pressed",String(b===btn));});drawRecommendation();}));
}
const primaryChoice={gaming:"9100pro",pc:"990ssd",film:"p9",mobile:"p7",action:"t9microsd",family:"t7microsd"};
function drawRecommendation(){
  const need=S.data.needs.find(n=>n.id===S.selected),p=products.get(primaryChoice[need.id]);
  const alt=S.data.products.find(x=>x.id!==p.id&&x.needs.includes(need.id));
  $("#recommendation").innerHTML='<div class="rec-eyebrow"><i></i> 客群推薦 / '+esc(need.title)+'</div><div class="rec-layout"><figure class="rec-photo">'+photo(p)+'</figure><div class="rec-content"><span class="rec-category">'+esc(p.categoryLabel)+'</span><h3>'+esc(p.name)+'</h3><p class="rec-headline">'+esc(p.tagline)+'</p><p class="rec-why">'+esc(p.highlights[0].text)+'。'+esc(p.audience)+'。</p><div class="rec-actions"><button type="button" class="button button-primary go-product" data-target="'+p.id+'">查看這款教學 ↗</button>'+(alt?'<button type="button" class="rec-alt go-product" data-target="'+alt.id+'">也可比較 '+esc(alt.name)+' ↗</button>':"")+'</div></div><div class="rec-number"><small>BEST MATCH</small><b>'+String(p.rank).padStart(2,"0")+'</b><span>/ 06</span></div></div>';
  $$(".go-product",$("#recommendation")).forEach(btn=>btn.addEventListener("click",()=>openProduct(btn.dataset.target)));
}
function productCard(p){
  const metrics=p.metrics.map(m=>'<div class="metric"><small>'+esc(m.label)+'</small><div><b>'+esc(m.value)+'</b><span>'+esc(m.unit)+'</span></div></div>').join("");
  const benefits=p.highlights.map((m,i)=>'<li><span class="benefit-index">0'+(i+1)+'</span><div><strong>'+esc(m.title)+'</strong><p>'+esc(m.text)+'</p></div></li>').join("");
  const specs=p.specs.map(pair=>'<div class="spec-row"><dt>'+esc(pair[0])+'</dt><dd>'+esc(pair[1])+'</dd></div>').join("");
  return '<article class="product-card" id="product-'+p.id+'" data-kind="'+p.category+'" aria-label="'+esc(p.name)+' 產品教學"><figure class="product-media"><span class="media-index">'+String(p.rank).padStart(2,"0")+' / 06</span><span class="media-kicker">'+esc(p.categoryLabel)+'</span>'+photo(p)+'<span class="media-bottom">'+esc(p.edition)+'</span></figure><div class="product-body"><div class="product-topline"><span>'+esc(p.flag)+'</span><span>'+esc(p.sample.split("｜")[0])+'</span></div><h3>'+esc(p.name)+'</h3><p class="product-english">'+esc(p.edition)+'</p><p class="product-tagline">'+esc(p.tagline)+'</p><div class="product-metrics">'+metrics+'</div><div class="audience-block"><small>推薦給誰 / WHO IT IS FOR</small><p>'+esc(p.audience)+'</p></div><div class="selling-start"><small>第一句這樣問</small><strong>'+esc(p.lead)+'</strong></div><div class="benefits"><div class="mini-heading">3 個真正有感的賣點</div><ol>'+benefits+'</ol></div><div class="demo-box"><small>現場示範</small><p>'+esc(p.demo)+'</p></div><details class="specs"><summary>官方詳細規格與相容提醒 <span>＋</span></summary><dl>'+specs+'</dl><p class="spec-caution">講師核對：'+esc(p.caution)+'</p></details><div class="card-footer"><div class="launch-msrp"><small>台灣上市建議售價 · '+esc(p.msrpCapacity)+'</small><b>'+fmt(p.msrp)+'</b><a href="'+esc(p.priceSource)+'" target="_blank" rel="noopener noreferrer">官方上市價格來源 ↗</a></div>'+productLink(p)+'</div></div></article>';
}
function drawCards(){
  $("#productGrid").innerHTML=S.data.products.map(productCard).join("");
  $$(".filter").forEach(btn=>btn.addEventListener("click",()=>{S.filter=btn.dataset.filter;$$(".filter").forEach(b=>{b.classList.toggle("is-active",b===btn);b.setAttribute("aria-pressed",String(b===btn));});filterCards();}));
  $("#productSearch").addEventListener("input",e=>{S.search=e.target.value.trim().toLowerCase();filterCards();});
}
function filterCards(){
  let count=0;
  $$(".product-card").forEach(el=>{
    const p=products.get(el.id.replace("product-",""));
    const haystack=[p.name,p.sample,p.categoryLabel,p.audience,p.tagline,p.edition,...p.highlights.map(h=>h.text)].join(" ").toLowerCase();
    const show=(S.filter==="all"||p.category===S.filter)&&(!S.search||haystack.includes(S.search));
    el.hidden=!show;if(show)count++;
  });
  let empty=$("#catalogEmpty");if(!empty){empty=document.createElement("div");empty.id="catalogEmpty";empty.className="empty-products";$("#productGrid").after(empty);}
  empty.hidden=count>0;empty.textContent=count?"":"沒有符合的機型。請更改分類或清除搜尋文字。";
}
function openProduct(id){
  const el=$("#product-"+id);if(!el)return;
  S.filter="all";S.search="";$("#productSearch").value="";
  $$(".filter").forEach(b=>{const act=b.dataset.filter==="all";b.classList.toggle("is-active",act);b.setAttribute("aria-pressed",String(act));});
  filterCards();
  location.hash="product-"+id;
  el.scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth",block:"start"});
}
const catTitles={internal:"內接 SSD：相容平台優先",portable:"外接 SSD：讓資料流動",card:"microSD：從裝置與容量出發"};
const catQuestions={internal:"客人的電腦支援 PCIe 哪一個世代？",portable:"是專業高負載創作，還是日常跨裝置使用？",card:"要裝在什麼設備？拍攝、照片還是遊戲？"};
function drawCompare(){
  $("#compareGrid").innerHTML=["internal","portable","card"].map((cat,i)=>{
    const items=S.data.products.filter(p=>p.category===cat);
    return '<article class="comparison-card"><div class="comparison-top"><span>COMPARE / 0'+(i+1)+'</span><b>'+esc(catTitles[cat])+'</b></div><p class="compare-question">'+esc(catQuestions[cat])+'</p><div class="compare-options">'+items.map(p=>'<button class="compare-option" type="button" data-target="'+p.id+'"><span><b>'+esc(p.name)+'</b><small>'+esc(p.comparison)+'</small></span><em>↗</em></button>').join("")+'</div><div class="compare-moral">兩款都有優勢，先依顧客用途與設備環境判斷。</div></article>';
  }).join("");
  $$(".compare-option").forEach(btn=>btn.addEventListener("click",()=>openProduct(btn.dataset.target)));
}
function drawKnowledge(){
  $("#glossaryGrid").innerHTML=S.data.glossary.map((g,i)=>'<article class="term-item"><span class="term-number">'+String(i+1).padStart(2,"0")+'</span><h3>'+esc(g.term)+'</h3><p class="term-label">'+esc(g.label)+'</p><p class="term-text">'+esc(g.explain)+'</p></article>').join("");
}
function drawSources(){
  $("#sourceList").innerHTML=S.data.products.map(p=>'<a class="source-row" href="'+esc(p.official)+'" target="_blank" rel="noopener noreferrer"><span class="source-n">'+String(p.rank).padStart(2,"0")+'</span><div><b>'+esc(p.name)+'</b><small>'+esc(p.sample)+' · 三星台灣產品頁</small></div><span class="source-open">↗</span></a>').join("")+'<div class="source-note">'+esc(S.data.meta.priceNotice)+'</div>';
}
function quiz(){
  const root=$("#quizCard"),index=S.index,total=S.questions.length;
  if(index>=total){
    root.innerHTML='<div class="quiz-finish"><span class="quiz-done-icon">✓</span><small>ALL QUESTIONS COMPLETED</small><h3>銷售情境挑戰完成</h3><div class="quiz-score"><strong>'+S.score+'</strong><span>/ '+total+' 題答對</span></div><p>學到的不只是產品，而是先理解顧客，再給出適合的建議。</p><button type="button" class="button button-primary quiz-retry">再挑戰一次 ↻</button><a class="quiz-after-link" href="#products">返回產品卡片複習 ↗</a></div>';
    $(".quiz-retry",root).addEventListener("click",()=>{S.index=0;S.score=0;quiz();});return;
  }
  const q=S.questions[index];S.locked=false;
  root.innerHTML='<div class="quiz-head"><span>QUESTION / '+String(index+1).padStart(2,"0")+' — '+String(total).padStart(2,"0")+'</span><span class="quiz-counter">'+(index+1)+' / '+total+'</span></div><div class="quiz-progress"><span style="width:'+(index/total*100)+'%"></span></div><p class="quiz-scenario">顧客情境 '+String(index+1).padStart(2,"0")+'</p><h3 class="question-title">'+esc(q.question)+'</h3><div class="quiz-choices" role="group" aria-label="回答選項">'+q.options.map((o,i)=>'<button class="quiz-choice" type="button" data-choice="'+o.value+'"><span class="choice-letter">'+["A","B","C"][i]+'</span><span>'+esc(o.label)+'</span><span class="choice-status" aria-hidden="true"></span></button>').join("")+'</div><div class="quiz-feedback" hidden role="status" aria-live="polite"></div><div class="quiz-next-row"><span id="answerHint">先想想顧客真正需要的是什麼。</span><button class="quiz-next" type="button" hidden>'+(index===total-1?"查看結果":"下一個情境")+' ↗</button></div>';
  $$(".quiz-choice",root).forEach(btn=>btn.addEventListener("click",()=>{
    if(S.locked)return;
    S.locked=true;const correct=btn.dataset.choice===q.answer;if(correct)S.score++;
    $$(".quiz-choice",root).forEach(item=>{
      const hit=item.dataset.choice===q.answer;item.disabled=true;item.classList.toggle("is-correct",hit);
      if(item===btn&&!correct)item.classList.add("is-wrong");
      $(".choice-status",item).textContent=hit?"✓":item===btn?"○":"";
    });
    const fb=$(".quiz-feedback",root),p=products.get(q.answer);
    fb.innerHTML='<div class="feedback-head"><b>'+(correct?"推薦方向正確":"這題適合換個切入點")+'</b><span>'+(correct?"GOOD":"TIP")+'</span></div><p>'+esc(q.explain)+'</p><button class="feedback-review" type="button">複習 '+esc(p.name)+' ↗</button>';
    fb.hidden=false;$(".feedback-review",fb).addEventListener("click",()=>openProduct(q.answer));
    $("#answerHint").textContent="已回答 · 可閱讀解析或繼續";
    $(".quiz-next",root).hidden=false;
    $(".quiz-progress span",root).style.width=((index+1)/total*100)+"%";
  }));
  $(".quiz-next",root).addEventListener("click",()=>{S.index++;quiz();root.scrollIntoView({block:"center",behavior:"smooth"});});
}
async function start(){
  try{
    const [resp1,resp2]=await Promise.all([fetch("products.json",{cache:"no-store"}),fetch("questions.json",{cache:"no-store"})]);
    if(!resp1.ok||!resp2.ok)throw Error("資料讀取失敗 HTTP "+resp1.status+"/"+resp2.status);
    S.data=await resp1.json();S.questions=(await resp2.json()).questions;
    if(S.data.products.length!==6||S.questions.length!==10)throw Error("教材版本不完整");
    S.data.products.forEach(p=>products.set(p.id,p));
    for(const q of S.questions)if(!products.has(q.answer)||q.options.length!==3||!q.options.some(o=>o.value===q.answer))throw Error("題庫資料不完整 "+q.id);
    drawNeeds();drawRecommendation();drawCards();drawCompare();drawKnowledge();drawSources();quiz();
    $$("img").forEach(img=>img.addEventListener("error",()=>{img.classList.add("image-error");img.alt="產品圖片未載入，請開啟 Samsung 官方產品頁。";}));
    document.documentElement.dataset.loaded="true";
  }catch(err){
    ["#needsGrid","#productGrid","#compareGrid","#glossaryGrid","#quizCard","#sourceList"].forEach(sel=>{const el=$(sel);if(el)el.textContent="教材載入失敗："+err.message+"。請重新整理。";});
    console.error("Storage demo initialization error",err);
  }
}
start();
