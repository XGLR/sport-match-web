import * as data from './data.js';
import {scoreQuiz} from './scoring.js';
import {createAccessClient} from './access.js';
import {buildResultAnalysis} from './result-analysis.js';
import {renderRadar} from './radar.js';
const app=document.querySelector('#app');
const STORAGE='sport-match-v1';
const steps=[...data.questions,...data.constraints];
const escape=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const defaultState=()=>({answers:{},conditions:{},step:0,view:'home',attemptId:null,result:null});
let state=defaultState();
try{const saved=JSON.parse(localStorage.getItem(STORAGE));if(saved&&saved.answers&&saved.conditions&&Number.isInteger(saved.step)&&saved.step>=0&&saved.step<steps.length)state={...saved,view:'home'};}catch{}
const accessClient=createAccessClient();
let access={checking:true,authorized:false,remaining:0,maxUses:3,lastResult:null};
let accessError='';
let busy=false;
async function restoreAccess(){access={...access,...await accessClient.restore(),checking:false};render();}
function save(){try{localStorage.setItem(STORAGE,JSON.stringify(state));}catch{}}
function focus(){app.focus();window.scrollTo({top:0,behavior:'instant'});}
function go(view){state.view=view;save();render();focus();}
const illustration=`<div class="art" aria-hidden="true"><span class="art-number">FIND YOUR OWN PACE / 001</span><svg viewBox="0 0 400 370" fill="none"><circle cx="205" cy="184" r="135" stroke="#bdcaaa" stroke-dasharray="3 8"/><path d="M50 312H353" stroke="#b3c1a5"/><ellipse cx="216" cy="320" rx="100" ry="10" fill="#cbd6bf"/><circle cx="245" cy="72" r="24" fill="#243f32"/><path d="M213 112L259 133L216 203L175 176Z" fill="#d6f376"/><path d="M223 121L175 111L137 142" stroke="#243f32" stroke-width="17" stroke-linecap="round" stroke-linejoin="round"/><path d="M249 139L277 176L319 157" stroke="#243f32" stroke-width="17" stroke-linecap="round" stroke-linejoin="round"/><path d="M205 194L162 241L121 299" stroke="#243f32" stroke-width="23" stroke-linecap="round" stroke-linejoin="round"/><path d="M215 199L251 248L220 300" stroke="#243f32" stroke-width="23" stroke-linecap="round" stroke-linejoin="round"/><path d="M107 305L133 305M207 307L231 307" stroke="#73894f" stroke-width="12" stroke-linecap="round"/><circle cx="89" cy="211" r="22" fill="#b8cc8d"/><path d="M75 207L102 216M84 191L93 232" stroke="#90a56c"/><path d="M300 85L315 70M318 98L339 96" stroke="#93a874" stroke-width="3" stroke-linecap="round"/></svg><span class="art-label">不赶进度，先动一下 ↗</span></div>`;
function home(){const hasProgress=Object.keys(state.answers).length>0;app.innerHTML=`<section class="hero"><div><div class="eyebrow"><span class="dot"></span> FIND YOUR SPORT</div><h1>运动那么多，<br>哪种适合<em>现在的你？</em></h1><p class="intro">有人喜欢在球场上接住一记好球，有人更愿意沿着河边慢慢走。你的下一项运动，可以从自己的偏好开始选。</p><div class="start-actions"><button class="primary" data-action="start">${hasProgress?'继续上次的测试':'找到我的运动'}<span class="arrow">↗</span></button>${hasProgress?'<button class="secondary" data-action="restart">重新开始</button>':''}</div><p class="time-note">17 道题 · 约 3 分钟 · 无需登录</p></div>${illustration}</section><section class="features" aria-label="测试内容"><article><span class="feature-num">01 / 你喜欢什么</span><h3>先聊运动偏好</h3><p>独处还是结伴，慢慢练还是来一场比赛。</p></article><article><span class="feature-num">02 / 你能怎么开始</span><h3>把日常条件算进去</h3><p>时间、预算和身边的场地，都会影响推荐。</p></article><article><span class="feature-num">03 / 找到哪些运动</span><h3>带走一份推荐清单</h3><p>先看三项优先推荐，再看看其他合适的运动。</p></article></section>`;}
function question(){const q=steps[state.step],isCondition=state.step>=data.questions.length,multi=['multi','multiple'].includes(q.type)||q.id==='venues'||q.id==='avoid',store=isCondition?state.conditions:state.answers,value=store[q.id],selected=id=>multi?Array.isArray(value)&&value.includes(id):String(value)===String(id);app.innerHTML=`<section class="quiz"><div class="quiz-top"><span>${isCondition?'再看看日常条件':'聊聊你的运动偏好'}</span><span>${String(state.step+1).padStart(2,'0')} / ${steps.length}</span></div><div class="progress" role="progressbar" aria-label="测试进度" aria-valuenow="${state.step+1}" aria-valuemin="0" aria-valuemax="${steps.length}"><div class="progress-fill" style="width:${(state.step+1)/steps.length*100}%"></div></div><div class="eyebrow"><span class="dot"></span>${isCondition?'YOUR EVERYDAY LIFE':'YOUR PREFERENCES'}</div><h1 class="question-heading">${escape(q.title)}</h1><p class="question-prompt">${escape(q.prompt)}${multi&&!q.prompt.includes('可多选')?' <span>可多选</span>':''}</p><div class="options" role="group" aria-label="${escape(q.title)}">${q.options.map((o,i)=>`<button class="option" data-option="${escape(o.id)}" aria-pressed="${selected(o.id)}"><span class="option-mark">${selected(o.id)?'✓':isCondition?String(i+1):escape(o.id)}</span><span>${escape(o.text)}</span></button>`).join('')}</div><div class="quiz-actions"><button class="back" data-action="back">← ${state.step===0?'回到首页':'上一题'}</button><button class="primary" data-action="next" ${valid(q)?'':'disabled'}>${state.step===steps.length-1?'查看我的结果':'下一题'}<span class="arrow">→</span></button></div><p id="quiz-status" class="access-error" role="alert"></p><p class="save-note">进度保存在当前浏览器，回来可以接着答。</p></section>`;}
function valid(q){const v=(state.step>=data.questions.length?state.conditions:state.answers)[q.id];return Array.isArray(v)?v.length>0:v!==undefined&&v!==null&&v!=='';}
let result;
function recommendationGroups(result){
 const ids=new Set(),names=new Set();
 const ordered=[...(result.sports||[]),...(result.alternatives||[])].filter(s=>{
  if(!s?.name)return false;
  const name=s.name.trim();
  if(!name||names.has(name)||(s.id&&ids.has(s.id)))return false;
  names.add(name);if(s.id)ids.add(s.id);return true;
 });
 const currentPriorities=new Map(data.types.flatMap(type=>type.sports.map(s=>[s.id,s.priority])));
 const priority=s=>s.priority??currentPriorities.get(s.id)??1;
 ordered.sort((a,b)=>priority(a)-priority(b));
 return {primary:ordered.slice(0,3),more:ordered.slice(3)};
}
function sportCard(s,i){
 return `<article class="sport-card"><div class="sport-top"><div>${s.typeName?`<span class="sport-type">${escape(s.typeName)}</span>`:''}<h3>${escape(s.name)}</h3></div><span class="sport-index">${String(i+1).padStart(2,'0')}</span></div><p>${escape(s.reason)}</p></article>`;
}
function resultView(){
 result=state.result;
 if(!result){app.innerHTML='<section class="empty"><h1>还有问题没答完</h1><p>回到测试，把遗漏的选项补上。</p><button class="primary" data-action="start">回到测试</button></section>';return;}
 const type=result.primary;
 if(!type){app.innerHTML='<section class="empty"><div class="eyebrow">YOUR NEXT STEP</div><h1>先调整一下尝试条件</h1><p>按当前选项，还凑不出两项合适的运动。可以回到条件部分，看看时间和场地有没有其他安排。</p><button class="primary" data-action="conditions">修改日常条件</button><p>有活动限制时，先确认适合自己的动作范围。</p></section>';return;}
 const dims=Array.isArray(data.dimensions)?data.dimensions:Object.entries(data.dimensions).map(([id,v])=>({id,name:v.name||v}));
 const analysis=buildResultAnalysis(result,result.conditions||{},data);
 const recommendations=recommendationGroups(result);
 app.innerHTML=`<section class="result-head"><div class="eyebrow"><span class="dot"></span> YOUR WAY TO MOVE</div><h1>${escape(type.name)}</h1><span class="result-badge">你这次的运动偏好</span><p>${escape(type.tagline)}</p></section>
 <div class="result-layout result-detail-layout">
 <aside class="profile-card"><h2>你的运动侧写</h2>${renderRadar(result.scores,dims)}<p class="profile-intro">${escape(type.profile)}</p>
 <details class="dimension-notes" open><summary>六个维度怎么看<span aria-hidden="true">＋</span></summary><div>${analysis.dimensionNotes.map(d=>`<section class="dimension-note"><h3>${escape(d.name)}<span>${escape(d.score)} / 6</span></h3><p>${escape(d.description)}</p></section>`).join('')}</div></details></aside>
 <div class="result-content"><section class="analysis-section" aria-labelledby="analysis-title"><span class="section-kicker">你的偏好与安排</span><h2 id="analysis-title">为什么推荐这些运动</h2><p class="analysis-lead">${escape(analysis.lead)}</p><ul class="match-reasons">${analysis.matchReasons.map(reason=>`<li>${escape(reason)}</li>`).join('')}</ul><div class="conditions-note"><span>结合你的日常条件</span><p>${escape(analysis.conditionsNote)}</p></div></section>
 <section class="recommendations" aria-labelledby="sports-title"><div class="section-heading"><div><span class="section-kicker">从这里开始选</span><h2 id="sports-title">优先推荐的运动</h2></div><span class="section-count">${recommendations.primary.length} 项推荐</span></div><div class="sports primary-sports">${recommendations.primary.map((s,i)=>sportCard(s,i)).join('')}</div></section>
 ${recommendations.more.length?`<section class="alternatives" aria-labelledby="alternatives-title"><div class="section-heading"><h2 id="alternatives-title">你可能也适合这些运动</h2></div><ul class="alternative-names">${recommendations.more.map(s=>`<li>${escape(s.name)}</li>`).join('')}</ul></section>`:''}
 </div></div><div class="result-actions"><button class="primary" data-action="copy">复制我的结果 <span class="arrow">↗</span></button><button class="secondary" data-action="conditions">修改条件</button><button class="secondary" data-action="restart">再测一次</button></div><p class="status" role="status" id="copy-status"></p>`;
}
function accessView(){app.innerHTML=`<section class="access-layout"><div class="access-intro"><div class="eyebrow"><span class="dot"></span> FIND YOUR SPORT</div><h1>运动那么多，<br>哪种适合<em>现在的你？</em></h1><p class="intro">输入购买后的交易单号，再找适合自己开始的运动。</p><p class="time-note">17 道题 · 约 3 分钟 · 无需 GPT 登录</p></div><form class="access-card" id="access-form"><span class="feature-num">动起来 / 开始测试</span><h2>输入交易单号</h2><p>请输入购买后的小红书交易单号。</p><label for="order-number">交易单号</label><input id="order-number" name="orderNumber" autocomplete="off" inputmode="text" maxlength="19" pattern="P[0-9]{18}" placeholder="P 加 18 位数字" required><button class="primary" type="submit" ${busy?'disabled':''}>${busy?'正在验证':'确认交易单号'} <span class="arrow">→</span></button>${accessError?`<p class="access-error" role="alert">${escape(accessError)}</p>`:''}<small>每个交易单号可完成 3 次测评。</small></form></section>${catalogView()}`;}
function render(){if(access.checking){app.innerHTML='<section class="empty"><p>正在载入测试...</p></section>';return;}if(!access.authorized){accessView();return;}if(state.view==='quiz')question();else if(state.view==='result')resultView();else home();if(state.view==='home'){const canStart=access.remaining>0;app.insertAdjacentHTML('afterbegin',`<div class="quota-note">此交易单号还可完成 ${access.remaining} 次测评。${!canStart?'本次额度已用完。':''}<button class="quiet-button" data-action="switch-order">使用其他交易单号</button>${access.lastResult?'<button class="quiet-button" data-action="last-result">查看上次结果</button>':''}</div>`);if(!canStart){const button=app.querySelector('[data-action="start"]');if(button)button.disabled=true;}}if(state.view==='home'||state.view==='result')app.insertAdjacentHTML('beforeend',catalogView());}
app.addEventListener('submit',async event=>{
  if(event.target.id!=='access-form')return;
  event.preventDefault();
  if(busy)return;
  const orderNumber=event.target.elements.orderNumber.value.trim().toUpperCase();
  busy=true;accessError='';render();
  try{
    access={...access,...await accessClient.enter(orderNumber),checking:false};
    state=defaultState();save();go('home');
  }catch(error){accessError=error instanceof Error?error.message:'请稍后重试';}
  finally{busy=false;render();}
});
app.addEventListener('click',async event=>{
  const choice=event.target.closest('[data-option]');
  if(choice){
    const q=steps[state.step],store=state.step>=data.questions.length?state.conditions:state.answers,id=choice.dataset.option;
    const multi=['multi','multiple'].includes(q.type)||q.id==='venues'||q.id==='avoid';
    if(multi){
      let values=Array.isArray(store[q.id])?[...store[q.id]]:[];
      values=values.includes(id)?values.filter(x=>x!==id):[...values,id];
      if(q.id==='avoid')values=id==='none'?['none']:values.filter(x=>x!=='none');
      store[q.id]=values;
    }else store[q.id]=q.id==='budget'?Number(id):id;
    save();question();app.querySelector('[data-option="'+CSS.escape(id)+'"]')?.focus();return;
  }
  const action=event.target.closest('[data-action]')?.dataset.action;
  if(action==='switch-order'){accessClient.clear();access={checking:false,authorized:false,remaining:0,maxUses:3,lastResult:null};state=defaultState();save();render();return;}
  if(action==='last-result'&&access.lastResult){state.result=access.lastResult;go('result');return;}
  if(action==='start'&&access.remaining>0){if(!state.attemptId)state.attemptId=crypto.randomUUID();go('quiz');return;}
  if(action==='restart'&&access.remaining>0){state=defaultState();state.attemptId=crypto.randomUUID();go('quiz');return;}
  if(action==='back'){if(state.step>0){state.step--;go('quiz');}else go('home');return;}
  if(action==='next'&&valid(steps[state.step])){
    if(state.step<steps.length-1){state.step++;go('quiz');return;}
    if(busy)return;
    busy=true;
    if(!state.attemptId)state.attemptId=crypto.randomUUID();
    save();
    const button=app.querySelector('[data-action="next"]');if(button)button.disabled=true;
    try{
      const response=await accessClient.complete(state.attemptId,state.answers,state.conditions);
      state.result=response.result;access.remaining=response.remaining;access.lastResult=response.result;
      go('result');
    }catch(error){
      const status=app.querySelector('#quiz-status');
      if(status)status.textContent=error instanceof Error?error.message:'请稍后重试';
      if(button)button.disabled=false;
    }finally{busy=false;}
    return;
  }
  if(action==='conditions'&&access.remaining>0){state.attemptId=crypto.randomUUID();state.result=null;state.step=data.questions.length;go('quiz');return;}
  if(action==='copy'&&result?.primary){
    const recommendations=recommendationGroups(result);
    const content=['我的运动偏好：'+result.primary.name,result.primary.tagline,'','优先推荐的运动：',...recommendations.primary.map(s=>s.name+'：'+(s.reason||'')),...(recommendations.more.length?['','你可能也适合这些运动',...recommendations.more.map(s=>s.name)]:[]),'','动起来 · 运动偏好测试'].join('\n');
    try{await navigator.clipboard.writeText(content);document.querySelector('#copy-status').textContent='结果已复制，可以发给一起运动的人。';}
    catch{document.querySelector('#copy-status').textContent='浏览器未能复制，请长按选中结果文字。';}
  }
});
render();
restoreAccess();
function catalogView(){const families=Array.isArray(data.catalog)?data.catalog:data.catalog?.families||[];return `<details class="catalog"><summary>还想看看有哪些运动？<span>浏览运动分类 ↗</span></summary><p>先看看各类运动的名字，再从身边有条件尝试的项目开始。</p><div class="catalog-grid">${families.map(f=>`<section><h3>${escape(f.name)}</h3><div class="sport-tags">${f.sports.map(s=>`<span>${escape(typeof s==='string'?s:s.name)}</span>`).join('')}</div></section>`).join('')}</div></details>`;}
