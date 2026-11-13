/* HelloPages · original interactive SVG diagrams & dynamic visual learning.
 * Data comes from Samsung Taiwan source-backed products.json; no paid API or tracking.
 */
"use strict";
(function(){
  const root=document.getElementById("visual-lab");
  if(!root) return;
  const $=(selector,el=document)=>el.querySelector(selector);
  const $$=(selector,el=document)=>Array.from(el.querySelectorAll(selector));
  const esc=value=>String(value??"").replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
  const views={
    internal:{
      title:"裝進電腦裡，把等待變少。",
      desc:"內接 SSD 透過電腦相容的 M.2／PCIe 通道讀寫資料。推薦時先檢查主機平台與安裝空間，再談高速體驗。",
      left:"DESKTOP / LAPTOP",right:"M.2 NVMe SSD",aria:"電腦主機板經 PCIe 連接 M.2 NVMe 內接固態硬碟的原創示意動畫",
      leftShape:'<rect x="83" y="56" width="212" height="160" rx="10" class="route-svg-stage"/><rect x="99" y="71" width="180" height="114" rx="3" fill="#0d2835" stroke="#537f84"/><path d="M111 173L146 127L185 150L221 110L267 147" fill="none" stroke="#76d7be" stroke-width="4"/><path d="M110 180H268" stroke="#33545d" stroke-width="2"/><rect x="133" y="222" width="111" height="9" rx="2" fill="#7ca5a1"/><path d="M188 216V224" stroke="#88c4b7" stroke-width="5"/>',
      rightShape:'<g transform="rotate(-7 749 143)"><rect x="661" y="95" width="194" height="90" rx="10" class="route-svg-panel"/><rect x="681" y="114" width="62" height="42" rx="5" fill="#376d68" stroke="#a3e6cf"/><rect x="754" y="114" width="44" height="42" rx="5" fill="#34535b"/><rect x="809" y="114" width="30" height="42" rx="5" fill="#34535b"/><rect x="709" y="180" width="19" height="9" fill="#f0c87d"/><rect x="736" y="180" width="19" height="9" fill="#f0c87d"/><rect x="763" y="180" width="19" height="9" fill="#f0c87d"/></g>'},
    portable:{
      title:"跨裝置工作，讓資料跟得上。",
      desc:"USB4 外接 SSD 像一個隨身資料站。適合移動影音素材、備份大檔案；高速效能要搭配相容主機與連接線。",
      left:"LAPTOP / HOST",right:"USB4 PORTABLE",aria:"筆記型電腦以 USB4 連接外接 SSD 的原創資料移動示意動畫",
      leftShape:'<rect x="75" y="65" width="235" height="141" rx="9" class="route-svg-stage"/><rect x="92" y="79" width="201" height="111" rx="5" fill="#10303b" stroke="#567f81"/><path d="M118 166L149 137L181 154L218 116L275 153" fill="none" stroke="#a6ebd3" stroke-width="4"/><path d="M69 213H318L301 225H85Z" fill="#638d88"/><path d="M90 217H295" stroke="#d4e3da" stroke-width="3"/>',
      rightShape:'<g transform="rotate(-12 748 142)"><rect x="665" y="89" width="186" height="113" rx="19" class="route-svg-panel"/><rect x="676" y="100" width="164" height="91" rx="15" fill="#102c38" stroke="#91d8c4"/><path d="M699 164H803" stroke="#3d766f" stroke-width="4"/><rect x="745" y="192" width="37" height="6" rx="2" fill="#77edcf"/><circle cx="825" cy="117" r="5" class="route-svg-light"/></g>'},
    card:{
      title:"在拍攝現場，留下每個精彩瞬間。",
      desc:"microSD 是相容攝影、手機與其他設備的記憶卡。真正要問的是插槽、容量與錄影速度等級，不是拿它跟電腦 SSD 直接比。",
      left:"CAMERA / DEVICE",right:"MICROSDXC",aria:"相機與 microSDXC 記憶卡搭配拍攝用途的原創示意動畫",
      leftShape:'<rect x="69" y="93" width="247" height="122" rx="18" class="route-svg-stage"/><path d="M110 93L136 67H234L261 93" stroke="#a6d4cd" stroke-width="5" fill="#163c45"/><circle cx="190" cy="154" r="50" fill="#0b2632" stroke="#acdacc" stroke-width="4"/><circle cx="190" cy="154" r="32" fill="#244e59" stroke="#7bf4cf" stroke-width="6"/><circle cx="190" cy="154" r="14" fill="#071b25" stroke="#97bcb6" stroke-width="2"/><rect x="88" y="109" width="38" height="12" rx="4" fill="#76d4b7"/>',
      rightShape:'<g transform="rotate(-7 740 143)"><path d="M680 97H782L828 143V218H680Z" class="route-svg-panel"/><path d="M684 100H775L823 147" fill="none" stroke="#75d5bd" stroke-width="4"/><rect x="700" y="123" width="83" height="36" rx="5" fill="#276359"/><path d="M703 183H805" stroke="#7ea39d" stroke-width="3"/><path d="M715 186V204M733 186V204M751 186V204M769 186V204M787 186V204" class="route-svg-strong"/></g>'}
  };
  let active="portable",paused=false,allProducts=[];
  function svgView(key){
    const v=views[key];
    const anim='<circle r="6" class="route-svg-data"><animateMotion dur="2.4s" repeatCount="indefinite" path="M365 145 L628 145" begin="0s"/></circle>'+
      '<circle r="4" fill="#f6d28a"><animateMotion dur="2.4s" repeatCount="indefinite" path="M365 145 L628 145" begin="-0.8s"/></circle>'+
      '<circle r="3" fill="#80ebd0"><animateMotion dur="2.4s" repeatCount="indefinite" path="M365 145 L628 145" begin="-1.6s"/></circle>';
    return '<svg id="routeSvg" viewBox="0 0 900 295" role="img" aria-label="'+esc(v.aria)+'">'+
      '<defs><linearGradient id="routeStroke" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#337e78"/><stop offset="1" stop-color="#9af5dc"/></linearGradient></defs>'+
      '<path d="M333 145H650" class="route-svg-glow"/><path d="M342 145H651" class="route-svg-line"/>'+
      '<path d="M628 134L649 145L628 155" stroke="#9af5dc" stroke-width="3" fill="none"/>'+
      v.leftShape+v.rightShape+anim+
      '<text x="190" y="265" text-anchor="middle" class="route-svg-code">'+esc(v.left)+'</text>'+
      '<text x="749" y="265" text-anchor="middle" class="route-svg-code">'+esc(v.right)+'</text>'+
      '<text x="490" y="98" text-anchor="middle" class="route-svg-legend">資料流動路線</text>'+
      '<text x="490" y="210" text-anchor="middle" class="route-svg-code">EXPERIENCE / NOT BENCHMARK</text></svg>';
  }
  function getRead(p){
    const spec=p.specs.find(pair=>/連續讀取/.test(pair[0])&&/MB\/s/.test(pair[1]));
    if(!spec)return null;
    const match=spec[1].match(/([\d,]+)\s*MB\/s/);
    return match?Number(match[1].replace(/,/g,"")):null;
  }
  function chart(key){
    const items=allProducts.filter(p=>p.category===key);
    const max=Math.max(1,...items.map(getRead).filter(Number.isFinite));
    const mark=items.map(p=>{
      const val=getRead(p),pct=val===null?0:Math.max(2,Math.min(100,val/max*100));
      return '<div class="speed-card"><img class="speed-photo" src="'+esc(p.image)+'" alt="'+esc(p.name+' 官方產品照片')+'" loading="lazy">'+
        '<div class="speed-copy"><small>'+esc(p.categoryLabel)+'</small><strong>'+esc(p.name)+'</strong>'+
        '<b>'+(val===null?"官方未標示":val.toLocaleString("zh-TW")+' <span>MB/s</span>')+'</b>'+
        '<div class="speed-meter" aria-label="'+esc(p.name+' 連續讀取官方最高值')+'"><i style="width:'+pct+'%"></i></div></div></div>';
    }).join("");
    $("#speedBars").innerHTML=mark+'<div class="visual-bars-explain">僅比較相同產品類型的官方最高連續讀取數據；各容量、環境與設備的實際表現可能不同。</div>';
  }
  function render(key){
    active=key;
    $$(".route-tab",root).forEach(btn=>{const yes=btn.dataset.route===key;btn.classList.toggle("is-active",yes);btn.setAttribute("aria-selected",String(yes));});
    $("#routeGraphic").innerHTML=svgView(key);
    $("#routeTitle").textContent=views[key].title;$("#routeDescription").textContent=views[key].desc;
    chart(key);
    const svg=$("#routeSvg");
    if(svg&&paused&&svg.pauseAnimations)svg.pauseAnimations();
  }
  function decorateCards(){
    const icons=[
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 16L9 10L13 13L20 4"/><path d="M15 4H20V9"/><path d="M4 20H20"/></svg>',
      '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="4" width="14" height="16" rx="3"/><path d="M8 9H16M8 13H16M8 17H13"/></svg>',
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3L15 9L21 12L15 15L12 21L9 15L3 12L9 9Z"/><path d="M12 9V15M9 12H15"/></svg>'
    ];
    allProducts.forEach(p=>{
      const card=$("#product-"+p.id);if(!card)return;
      const lead=$(".selling-start",card),benefits=$(".benefits",card),demo=$(".demo-box",card);
      if(!lead||!benefits||!demo||card.querySelector(".feature-tiles"))return;
      const tiles=document.createElement("div");
      tiles.className="feature-tiles";
      tiles.setAttribute("aria-label","三個主要優勢摘要");
      tiles.innerHTML=p.highlights.map((item,i)=>'<div class="feature-tile"><span class="feature-symbol">'+icons[i]+'</span><b>'+esc(item.title)+'</b></div>').join("");
      lead.insertAdjacentElement("afterend",tiles);
      const module=document.createElement("details");
      module.className="sales-module";
      const summary=document.createElement("summary");
      summary.innerHTML='<span>展開詳細銷售話術與實機示範</span><span class="summary-arrow">＋</span>';
      module.append(summary);
      benefits.before(module);
      module.append(benefits,demo);
    });
    const tools=$(".catalog-tools");
    if(tools&&!$("#expandAllLessons")){
      const btn=document.createElement("button");btn.type="button";btn.id="expandAllLessons";btn.className="show-all-lessons";
      btn.textContent="展開所有賣點與示範";
      btn.addEventListener("click",()=>{
        const modules=$$(".sales-module"),willOpen=modules.some(el=>!el.open);
        modules.forEach(el=>el.open=willOpen);
        btn.textContent=willOpen?"收起教學細節":"展開所有賣點與示範";
      });
      tools.after(btn);
    }
  }
  function init(){
    $$(".route-tab",root).forEach((btn,index,list)=>{
      btn.addEventListener("click",()=>render(btn.dataset.route));
      btn.addEventListener("keydown",event=>{
        if(event.key!=="ArrowLeft"&&event.key!=="ArrowRight")return;
        event.preventDefault();
        const direction=event.key==="ArrowRight"?1:-1;
        const target=list[(index+direction+list.length)%list.length];
        target.focus();render(target.dataset.route);
      });
    });
    const pause=$("#pauseRoute");
    pause.addEventListener("click",()=>{
      paused=!paused;pause.setAttribute("aria-pressed",String(paused));
      pause.innerHTML=paused?'繼續動畫 <span>▶</span>':'暫停動畫 <span>Ⅱ</span>';
      root.classList.toggle("route-animation-paused",paused);
      const svg=$("#routeSvg");if(svg&&(paused?svg.pauseAnimations:svg.unpauseAnimations)){if(paused)svg.pauseAnimations();else svg.unpauseAnimations();}
    });
    if(matchMedia("(prefers-reduced-motion: reduce)").matches){
      paused=true;root.classList.add("route-animation-paused");pause.setAttribute("aria-pressed","true");pause.innerHTML='繼續動畫 <span>▶</span>';
    }
    fetch("products.json",{cache:"no-store"}).then(r=>{if(!r.ok)throw Error("產品資料未載入");return r.json();}).then(data=>{
      allProducts=data.products;render(active);
      if(document.documentElement.dataset.loaded==="true"){
        decorateCards();
      }else{
        const observer=new MutationObserver(()=>{
          if(document.documentElement.dataset.loaded==="true"){
            observer.disconnect();decorateCards();
          }
        });
        observer.observe(document.documentElement,{attributes:true,attributeFilter:["data-loaded"]});
      }
    }).catch(err=>{
      $("#routeDescription").textContent="無法讀取圖解資料："+err.message;
      console.warn("Storage visual lab data read unavailable",err);
    });
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});else init();
})();
