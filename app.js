const ICON_PATHS = {
 compass:'<circle cx="12" cy="12" r="9"/><path d="m16 8-2.5 5.5L8 16l2.5-5.5L16 8Z"/>',
 grid:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
 compare:'<path d="M5 3v18M19 3v18M9 7h8m-3-3 3 3-3 3M15 17H7m3-3-3 3 3 3"/>',
 route:'<circle cx="6" cy="5" r="2"/><circle cx="18" cy="19" r="2"/><path d="M8 5h8a4 4 0 0 1 0 8H8a3 3 0 0 0 0 6h8"/>',
 spark:'<path d="m12 3 2.8 6.2L21 12l-6.2 2.8L12 21l-2.8-6.2L3 12l6.2-2.8L12 3ZM20 2v4m-2-2h4"/>',
 help:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 4 2c-1.5 1-1.5 1-1.5 3m0 3h.01"/>',
 lock:'<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3m-4 5v2"/>',
 trend:'<path d="M3 3v18h18M6 16l5-5 4 2 6-8m-5 0h5v5"/>',
 target:'<circle cx="11" cy="13" r="8"/><circle cx="11" cy="13" r="4"/><path d="m11 13 9-9m-4 0h4v4"/>',
 rank:'<path d="M3 7h12M3 12h8M3 17h5m11-12v14m-3-3 3 3 3-3"/>',
 wave:'<path d="M2 12c4-17 6 17 10 0s6 17 10 0"/>',
 chart:'<path d="M4 3v18h17M8 16v-4m5 4V8m5 8V5"/>',
 tree:'<rect x="9" y="3" width="6" height="5" rx="1"/><rect x="2" y="16" width="6" height="5" rx="1"/><rect x="16" y="16" width="6" height="5" rx="1"/><path d="M12 8v4H5v4m7-4h7v4"/>',
 curve:'<path d="M3 3v18h18M5 17C8 17 7 5 12 5s3 12 9 12"/>',
 network:'<circle cx="5" cy="5" r="2"/><circle cx="19" cy="7" r="2"/><circle cx="8" cy="19" r="2"/><circle cx="19" cy="19" r="2"/><path d="m7 5 10 2M6 7l2 10m2 1 7-9m-7 10h7m2-10v8"/>',
 layers:'<path d="m12 3 10 5-10 5L2 8l10-5Zm-9 9 9 5 9-5M3 16l9 5 9-5"/>',
 dice:'<rect x="3" y="3" width="18" height="18" rx="4"/><path d="M7 7h.01M17 7h.01M12 12h.01M7 17h.01M17 17h.01"/>',
 split:'<path d="M12 21V11m0 2L5 6m0 4V6h4m3 7 7-7m-4 0h4v4"/>',
 refresh:'<path d="M20 7v5h-5M4 17v-5h5m-4-5a8 8 0 0 1 13-2l2 2M4 17l2 2a8 8 0 0 0 13-2"/>',
 arrow:'<path d="M4 12h16m-6-6 6 6-6 6"/>',
 check:'<path d="m5 12 4 4L19 6"/>',
 book:'<path d="M12 6C8 3 3 4 3 4v15s5-1 9 2c4-3 9-2 9-2V4s-5-1-9 2Zm0 0v15"/>',
 info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10h.01"/>',
 close:'<path d="m6 6 12 12M6 18 18 6"/>',
 search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
 bolt:'<path d="m13 2-9 12h7l-1 8 10-13h-7l1-7"/>'
};
const icon = (name) => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICON_PATHS[name]||ICON_PATHS.compass}</svg>`;
const $ = s => document.querySelector(s);
const escapeHtml = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const DEFAULT_PROFILE = {contest:'cumcm',goal:'predict',data:'table',features:['interpret','highdim'],labels:true,experience:'beginner',scenario:'demand'};
const STORE_KEY = 'model-compass-v1';
let saved = {};
try { saved = JSON.parse(localStorage.getItem(STORE_KEY)||'{}') || {}; } catch {}
const valid = (items,value) => items.some(x=>x.id===value);
let profile = {...DEFAULT_PROFILE,...(saved.profile||{})};
if (!['cumcm','mcm'].includes(profile.contest)) profile.contest='cumcm';
if (!valid(GOALS,profile.goal)) profile.goal='predict';
if (!valid(DATA_TYPES,profile.data)) profile.data='table';
profile.features=Array.isArray(profile.features)?profile.features.filter(x=>valid(FEATURES,x)):[];
profile.labels=Boolean(profile.labels);
let comparison = Array.isArray(saved.comparison)?[...new Set(saved.comparison)].filter(id=>MODELS.some(m=>m.id===id)).slice(0,3):[];
let completed = saved.completed && typeof saved.completed==='object' ? saved.completed : {};
let roadmapModel = MODELS.some(m=>m.id===saved.roadmapModel)?saved.roadmapModel:'regression';
let software = saved.software==='matlab'?'matlab':'python';
let libraryFilter = 'all', librarySearch = '', currentModal = null, lastFocus = null;
const modal = $('#modal');
const ROUTES = {icpc:'ICPC 算法指南','icpc-route':'ICPC 学习路线','icpc-progress':'ICPC 学习进度',assistant:'模型选型',library:'模型图鉴',compare:'方案比较',roadmap:'数模学习路线'};
const groupLabel = {predict:'数据预测',optimize:'优化决策',evaluate:'评价与降维',dynamics:'机理与仿真',inference:'统计分析',classify:'分类与分群'};
function save(){try{localStorage.setItem(STORE_KEY,JSON.stringify({profile,comparison,completed,roadmapModel,software}));}catch{toast('当前浏览器无法保存进度；本次仍可正常使用。');}}
function toast(message){const el=$('#toast');el.textContent=message;el.classList.add('visible');clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.classList.remove('visible'),2500);}
function currentRoute(){return ROUTES[location.hash.slice(1)]?location.hash.slice(1):'icpc';}
function ranking(p=profile){
  if ((p.goal==='predict' && (p.data==='none' || (['table','time','indicators'].includes(p.data)&&!p.labels))) || (p.goal==='classify' && !['table','time','indicators','network'].includes(p.data)) || (p.goal==='inference' && ['none','mechanism'].includes(p.data))) return [];
  return MODELS.filter(m=>{
    if (!m.goals[p.goal] || !m.data[p.data]) return false;
    if (['regression','ensemble','classification'].includes(m.id) && !p.labels && ['predict','classify'].includes(p.goal)) return false;
    if (p.goal==='classify' && p.data==='network' && !['clustering','pca'].includes(m.id)) return false;
    if (m.id==='timeseries' && p.data!=='time') return false;
    if (m.id==='clustering' && p.goal==='classify' && p.labels) return false;
    if (m.id==='pca' && p.goal==='classify' && p.data==='time') return false;
    if (m.id==='clustering' && p.data==='network') return false;
    return true;
  }).map(m=>({model:m,score:m.goals[p.goal]+m.data[p.data]+p.features.reduce((s,f)=>s+(m.flags[f]||0),0)-(p.experience==='beginner'?(m.level-1)*.7:0)+(m.id==='clustering'&&p.labels?-4:0)+((m.goals[p.goal]||0)>=7?5:0)})).sort((a,b)=>b.score-a.score).slice(0,3);
}
function reason(m){
 const bits=[];
 if (m.id==='clustering'&&!profile.labels) bits.push('没有类别标签，先探索自然群体');
 else if (m.id==='classification') bits.push('已有类别标签，适合监督分类');
 else if (m.id==='timeseries') bits.push('数据按时间排列，需要保留先后关系');
 else if (m.id==='graph') bits.push('题目可表示为节点与连接');
 else if (m.id==='ode') bits.push('已有机理规律，可从变化率建立模型');
 else if (m.id==='evaluation') bits.push('需要在多个指标之间比较方案');
 else if (m.id==='linearprog') bits.push('需要把决策、目标和约束明确写出来');
 else if (m.id==='statistics') bits.push('目标是估计关系或比较差异');
 else if (m.id==='pca') bits.push('适合提取数值指标的主要变化方向');
 else if (m.id==='simulation') bits.push('可为输入不确定性补充风险检验');
 else if (m.id==='heuristic') bits.push('可在复杂搜索中补充较好可行解');
 else if (m.id==='nonlinear') bits.push('可处理非线性公式的参数或决策');
 else bits.push('目标与数据适合建立数值关系基线');
 if(profile.features.includes('highdim')&&m.id==='regression') bits.push('Ridge 可缓解相关特征的系数不稳定');
 else if(profile.features.includes('integer')&&m.id==='linearprog') bits.push('整数变量可表达选址、数量与是否选择');
 else if(profile.features.includes('nonlinear')&&m.id==='ensemble') bits.push('树模型可以捕捉非线性与交互');
 else if(profile.features.includes('highdim')&&m.id==='pca') bits.push('多指标或强相关特征值得检查冗余');
 return bits.join('；');
}
function roleFor(m){return (m.goals[profile.goal]||0)>=7?'候选主模型':'辅助分析工具';}
function render(){
 const route=currentRoute();
 document.querySelectorAll('[data-nav]').forEach(el=>{const active=el.dataset.nav===route;el.classList.toggle('active',active);active?el.setAttribute('aria-current','page'):el.removeAttribute('aria-current');});
 document.title=`${ROUTES[route]} · 竞赛指南`;
 $('#main').innerHTML=route.startsWith('icpc')?icpcPage(route):route==='assistant'?assistantView():route==='library'?libraryView():route==='compare'?compareView():roadmapView();
 $('#compare-count').textContent=comparison.length;
 renderTray();
}
function assistantView(){
 return `<section class="page-heading"><h1>模型选型</h1><button class="secondary" data-action="scenarios">载入示例</button></section>
 <div class="workbench"><form id="profile-form" class="panel form-panel"><div class="panel-heading"><h2>题目条件</h2><button type="button" class="text-button reset" data-action="reset">${icon('refresh')}重置</button></div>
 <fieldset class="field"><legend>比赛</legend><div class="segmented" aria-label="备赛方向"><button type="button" data-contest="cumcm" aria-pressed="${profile.contest==='cumcm'}" class="${profile.contest==='cumcm'?'selected':''}">国赛 CUMCM</button><button type="button" data-contest="mcm" aria-pressed="${profile.contest==='mcm'}" class="${profile.contest==='mcm'?'selected':''}">美赛 MCM / ICM</button></div></fieldset>
 <fieldset class="field"><legend>目标<small>单选</small></legend><div class="choice-grid">${GOALS.map(g=>`<button type="button" class="choice ${profile.goal===g.id?'selected':''}" data-goal="${g.id}" aria-pressed="${profile.goal===g.id}" title="${g.hint}">${g.name}</button>`).join('')}</div></fieldset>
 <div class="field"><label for="data-type">数据</label><select id="data-type" name="data">${DATA_TYPES.map(d=>`<option value="${d.id}" ${profile.data===d.id?'selected':''}>${d.name}</option>`).join('')}</select>${['predict','classify'].includes(profile.goal)?`<label class="checkbox-line"><input id="has-labels" type="checkbox" ${profile.labels?'checked':''}>${profile.goal==='classify'?'已有类别标签':'已有历史目标值'}</label>`:''}</div>
 <fieldset class="field"><legend>题目特征<small>可多选</small></legend><div class="feature-wrap">${FEATURES.map(f=>`<button type="button" class="chip ${profile.features.includes(f.id)?'selected':''}" data-feature="${f.id}" aria-pressed="${profile.features.includes(f.id)}">${profile.features.includes(f.id)?'✓ ':''}${f.name}</button>`).join('')}</div></fieldset>
 <div class="field compact"><label for="experience">团队基础</label><select id="experience"><option value="beginner" ${profile.experience==='beginner'?'selected':''}>入门：优先简单模型</option><option value="basic" ${profile.experience==='basic'?'selected':''}>有基础：能复现和检验</option></select></div>
 <button class="primary full" type="submit">查看推荐 ${icon('arrow')}</button></form>
 <section class="result-section" id="results" aria-label="推荐结果">${resultsView()}</section></div>`;
}
function warnings(){
 const w=[];
 if(profile.goal==='evaluate'&&profile.data!=='indicators')w.push('评价前先列出“对象 × 指标”矩阵，明确指标方向、口径与权重依据。');
 if(profile.goal==='predict'&&['table','time'].includes(profile.data)&&!profile.labels)w.push('当前未勾选历史目标值，已排除监督回归。先补齐目标记录，或采用有依据的机理模型做情景分析。');
 if(profile.goal==='optimize'&&profile.features.includes('integer')&&profile.features.includes('nonlinear'))w.push('同时存在整数与非线性，标准 LP / 连续优化可能不足。先尝试有依据的线性化或小规模精确建模，再考虑搜索。');
 if(profile.goal==='classify'&&profile.data==='network')w.push('网络分群更适合社区发现；当前图鉴中的数值聚类仅在先构造有意义的节点特征后使用。');
 return w.map(s=>`<p class="warning">${icon('info')} ${s}</p>`).join('');
}
function resultsView(){
 const ranked=ranking();
 return `<div class="result-header"><h2>推荐模型 <span>${ranked.length}</span></h2><button class="text-button" data-action="rules">推荐规则</button></div>
 ${ranked.length?warnings():''}<div class="result-cards">${ranked.length?ranked.map((r,i)=>modelCard(r.model,{featured:i===0,recommend:true,index:i})).join(''):`<div class="panel no-results"><h3>当前条件不足</h3><p>${profile.goal==='predict'?'需补充历史目标值，或提供可用于预测的机理与参数。':'目标与数据不匹配。请调整条件，或先明确变量与数据来源。'}</p><button class="secondary" data-action="scenarios">载入示例</button></div>`}</div>`;
}
function modelCard(m,{featured=false,recommend=false,index=0}={}){
 const added=comparison.includes(m.id);
 const tag=recommend?(index===0?'首选':roleFor(m)==='辅助分析工具'?'辅助':'备选'):'';
 return `<article class="model-card ${featured?'featured':''}" data-model-card="${m.id}"><div class="card-heading"><h3>${m.name}</h3>${tag?`<span class="priority-tag">${tag}</span>`:''}<span class="category">${groupLabel[m.group]}</span></div><p class="model-desc">${m.summary}</p><p class="model-methods">${m.algorithms.join(' · ')}</p>${recommend&&featured?`<p class="match-reason"><b>依据：</b>${reason(m)}</p>`:''}<dl class="model-meta"><div><dt>数学基础</dt><dd>${m.math.slice(0,2).map(x=>x[0]).join('、')}</dd></div><div><dt>学习顺序</dt><dd>${m.priority}</dd></div></dl><div class="card-actions"><button class="card-details" data-detail="${m.id}">详情与练习</button><button class="compare-btn ${added?'selected':''}" aria-pressed="${added}" data-compare="${m.id}">${added?'✓ 已加入比较':'+ 加入比较'}</button></div></article>`;
}
function header(unused,title,description=''){return `<section class="page-heading"><div><h1>${title}</h1>${description?`<p>${description}</p>`:''}</div></section>`;}
function libraryView(){return `${header('','模型图鉴')}<div class="library-toolbar"><div class="search-box">${icon('search')}<input id="model-search" type="search" placeholder="模型 / 算法 / 数学基础" aria-label="搜索模型" value="${escapeHtml(librarySearch)}"></div><div class="filter-tabs" aria-label="模型类别">${[['all','全部'],['predict','预测'],['optimize','优化'],['evaluate','评价'],['dynamics','机理'],['classify','分类'],['inference','统计']].map(([id,label])=>`<button data-filter="${id}" class="${libraryFilter===id?'active':''}" aria-pressed="${libraryFilter===id}">${label}</button>`).join('')}</div></div><div id="library-results">${libraryResults()}</div>`;}
function libraryResults(){const q=librarySearch.trim().toLowerCase();const items=MODELS.filter(m=>(libraryFilter==='all'||m.group===libraryFilter)&&(!q||[m.name,m.english,m.summary,...m.algorithms,...m.math.flat()].join(' ').toLowerCase().includes(q)));return `<p class="empty-count">找到 <span class="count-highlight">${items.length}</span> 个模型族 ${q?'· 搜索“'+escapeHtml(librarySearch)+'”':''}</p><div class="library-grid">${items.length?items.map(m=>modelCard(m)).join(''):`<div class="panel no-results"><h3>还没有找到对应模型</h3><p>试试“回归”“最小二乘”“规划”或清除筛选。</p><button class="secondary" data-action="clear-search">清除搜索与筛选</button></div>`}</div>`;}
function compareView(){
 if(!comparison.length)return `${header('','方案比较','最多比较 3 个模型。')}<div class="panel compare-empty"><h2>未选择模型</h2><p>从推荐结果或模型图鉴中加入模型。</p><a class="primary" href="#library">去模型图鉴选择 ${icon('arrow')}</a></div>`;
 const models=comparison.map(id=>MODELS.find(m=>m.id===id));
 const rows=[['适合解决',m=>GOALS.filter(g=>m.goals[g.id]>=7).map(g=>g.name).join(' / ')||'降维预处理 / 辅助分析'],['起步方案',m=>m.baseline],['适用前提',m=>m.condition],['数学基础',m=>m.math.map(x=>`<span class="tag">${x[0]}</span>`).join('')],['软件工具',m=>software==='python'?m.python:m.matlab],['学习优先级',m=>m.priority],['上手成本',m=>m.cost],['可解释性',m=>m.explain],['如何验证',m=>m.validation],['主要局限',m=>m.pitfall],['第一道练习',m=>m.exercise[0][0]+'。'+m.exercise[0][2]]];
 return `${header('','方案比较')}<div class="compare-top"><p>已选 <b>${models.length} / 3</b></p><div class="tool-toggle"><button data-software="python" class="${software==='python'?'selected':''}">Python</button><button data-software="matlab" class="${software==='matlab'?'selected':''}">MATLAB</button></div><a href="#library" class="secondary">+ 继续选择</a></div><div class="comparison-wrap" tabindex="0" role="region" aria-label="模型横向比较表"><table class="comparison-table"><thead><tr><th>比较维度</th>${models.map(m=>`<th><button class="icon-button" data-compare="${m.id}" aria-label="移除${m.name}">${icon('close')}</button><span class="compare-kicker">${groupLabel[m.group]}</span><h3>${m.name}</h3><button class="card-details" data-detail="${m.id}">详情</button></th>`).join('')}</tr></thead><tbody>${rows.map(([label,fn])=>`<tr><th scope="row">${label}</th>${models.map(m=>`<td>${fn(m)}</td>`).join('')}</tr>`).join('')}<tr><th scope="row">开始行动</th>${models.map(m=>`<td><button class="secondary" data-learn="${m.id}">设为学习路线 ${icon('arrow')}</button></td>`).join('')}</tr></tbody></table></div>`;
}
function roadmapSteps(m){return [
 {title:'数学基础',text:m.math.map(x=>`${x[0]}：${x[1]}`).join('；')+'。',deliver:'交付：变量表、假设和适用理由。'},
 {title:'运行基线',text:m.baseline+'。'+(software==='python'?m.python:m.matlab),deliver:'交付：小样本代码及手算核对结果。'},
 {title:m.exercise[0][0],text:m.exercise[0][1],deliver:'验收：'+m.exercise[0][2]},
 {title:'检验与结果报告',text:m.validation,deliver:'交付：对比图、检验表、局限与参数说明。'}
 ];}
function roadmapView(){const m=MODELS.find(x=>x.id===roadmapModel);const steps=roadmapSteps(m);const n=steps.filter((_,i)=>completed[`${m.id}-${i}`]).length;return `${header('','学习路线')}<div class="roadmap-header"><label for="roadmap-select">当前学习路线</label><select id="roadmap-select">${MODELS.map(x=>`<option value="${x.id}" ${m.id===x.id?'selected':''}>${x.name} · ${x.priority.split(' · ')[0]}</option>`).join('')}</select><button class="secondary" data-detail="${m.id}">查看模型说明</button></div><div class="progress-info"><span>${m.name}</span><div class="progress-track" role="progressbar" aria-valuenow="${n}" aria-valuemin="0" aria-valuemax="4" aria-label="路线完成进度"><div class="progress-fill" style="width:${n*25}%"></div></div><span>${n} / 4 已完成</span></div><div class="roadmap-grid"><div class="steps">${steps.map((s,i)=>`<article class="panel step-card ${completed[`${m.id}-${i}`]?'done':''}"><div class="step-num">${completed[`${m.id}-${i}`]?'✓':String(i+1).padStart(2,'0')}</div><div class="step-content"><h3>${s.title}</h3><p>${s.text}</p><div class="deliverable">${s.deliver}</div></div><label class="step-check"><input type="checkbox" data-step="${m.id}-${i}" ${completed[`${m.id}-${i}`]?'checked':''}>已完成</label></article>`).join('')}</div><details class="team-guide"><summary>队伍分工</summary><p><b>建模：</b>变量、假设、推导和适用条件。</p><p><b>编程：</b>基线、复现、参数记录和检验。</p><p><b>论文：</b>符号表、图表、结果与局限。</p></details><button class="text-button roadmap-resource" data-detail="${m.id}">全部练习</button></div>`;}
function renderTray(){const show=comparison.length&&currentRoute()!=='compare'&&!currentRoute().startsWith('icpc');$('#compare-tray').innerHTML=show?`<div class="tray-inner"><b>${icon('compare')}</b><span>已选 ${comparison.length} / 3</span><span class="tray-divider"></span><div class="tray-models">${comparison.map(id=>`<span>${MODELS.find(m=>m.id===id).name}</span>`).join('<span>·</span>')}</div><button class="tray-clear" data-action="clear-compare">清空</button><a href="#compare" class="primary">横向比较 ${icon('arrow')}</a></div>`:'';document.body.style.paddingBottom=show?'60px':'';}
function updateRecommendations(){const result=$('#results');if(result)result.innerHTML=resultsView();save();}
function updateSelected(selector,attribute,value){document.querySelectorAll(selector).forEach(el=>{const on=el.dataset[attribute]===value;el.classList.toggle('selected',on);el.setAttribute('aria-pressed',on);});}
function toggleCompare(id){if(comparison.includes(id)){comparison=comparison.filter(x=>x!==id);}else{if(comparison.length>=3){toast('最多比较 3 个，请先移除一个。');return;}comparison.push(id);}save();if(currentRoute()==='compare'){render();}else{document.querySelectorAll(`[data-compare="${id}"]`).forEach(btn=>{const added=comparison.includes(id);btn.classList.toggle('selected',added);btn.setAttribute('aria-pressed',added);btn.textContent=added?'✓ 已加入比较':'+ 加入比较';});$('#compare-count').textContent=comparison.length;renderTray();}if(currentModal?.type==='model')renderModelModal(currentModal.id);}
function applyScenario(id){const s=SCENARIOS.find(s=>s.id===id);if(!s)return;profile={...profile,...s,scenario:s.id};delete profile.id;delete profile.name;delete profile.tag;save();if(modal.open)modal.close();location.hash='#assistant';render();}
function openModal(type,id){lastFocus=document.activeElement;currentModal={type,id};if(type==='help'&&currentRoute().startsWith('icpc'))$('#modal-body').innerHTML=icpcHelp();else if(type==='sources'&&currentRoute().startsWith('icpc'))$('#modal-body').innerHTML=icpcSources();else if(type==='model')renderModelModal(id);else if(type==='sources')renderSources();else if(type==='scenarios')renderScenarios();else renderHelp(type);if(!modal.open)modal.showModal();modal.scrollTop=0;}
function modalHeader(unused,title,description){return `<header class="modal-head"><button class="icon-button modal-close" aria-label="关闭弹窗" data-action="close">${icon('close')}</button><h2 id="modal-title">${title}</h2>${description?`<p>${description}</p>`:''}</header>`;}
function sourceLink(id){const s=SOURCES[id];return `<a href="${s.url}" target="_blank" rel="noopener noreferrer"><span>${s.title}<br><small>${s.label}</small></span><span>↗</span></a>`;}
function renderModelModal(id){const m=MODELS.find(x=>x.id===id);if(!m)return;const scroll=modal.scrollTop;$('#modal-body').innerHTML=`${modalHeader(m.english,m.name,m.summary)}<div class="modal-content"><section class="modal-section"><h3>适用条件</h3><p>${m.condition}</p><div class="match-reason">${icon('route')}<span>最小路线：${m.baseline}</span></div></section><section class="modal-section"><h3>常用方法</h3><div class="algorithm-tags">${m.algorithms.map(a=>`<span>${a}</span>`).join('')}</div></section><section class="modal-section"><h3>数学基础</h3><div class="modal-math">${m.math.map(([subject,tools])=>`<div class="math-item"><strong>${subject}</strong><span>${tools}</span></div>`).join('')}</div><p class="small-help">${m.priority}</p></section><section class="modal-section"><h3>软件工具</h3><div class="tool-toggle"><button class="${software==='python'?'selected':''}" data-software="python">Python</button><button class="${software==='matlab'?'selected':''}" data-software="matlab">MATLAB</button></div><div class="code-note">${software==='python'?m.python:m.matlab}</div><p class="small-help">MATLAB 部分函数需要额外工具箱。</p></section><section class="modal-section"><h3>检验方法</h3><p>${m.validation}</p></section><section class="modal-section"><h3>推荐练习</h3>${m.exercise.map((e,i)=>`<details class="practice-item" ${i===0?'open':''}><summary>${e[0]}</summary><p>${e[1]}<br><b>验收标准：</b>${e[2]}</p></details>`).join('')}<p class="small-help">自拟练习，可使用模拟数据。</p></section><section class="modal-section"><h3>常见误用</h3><p>${m.pitfall}</p></section><section class="modal-section"><h3>参考资料</h3><div class="source-links">${m.sources.map(sourceLink).join('')}</div></section><div class="modal-actions"><button class="secondary" data-compare="${m.id}" aria-pressed="${comparison.includes(id)}">${comparison.includes(id)?'✓ 已加入比较':'+ 加入比较'}</button><button class="primary" data-learn="${m.id}">设为学习路线</button></div></div>`;modal.scrollTop=scroll;}
function renderHelp(type){$('#modal-body').innerHTML=`${modalHeader('',type==='rules'?'推荐规则':'使用说明','')}<div class="modal-content"><section class="modal-section"><ol><li>选择目标、数据和特征，推荐结果自动更新。</li><li>打开详情查看适用条件、数学基础、软件和练习。</li><li>加入最多 3 个模型，按相同维度比较。</li><li>设为学习路线后，可勾选并保存进度。</li></ol></section><section class="modal-section"><h3>推荐与优先级</h3><p>先按目标、数据和标签条件筛选，再按题目特征排序。入门模式优先简单基线。辅助模型可与主模型组合使用。</p><p>P0：优先掌握；P1：按题学习；P2：需要时再学。排序为学习建议，不代表准确率或获奖概率。</p></section><section class="modal-section"><h3>保存与比赛方向</h3><p>进度仅保存在当前浏览器。比赛方向影响练习场景，不把题号固定映射到模型。</p></section><div class="modal-actions"><button class="secondary" data-action="sources">资料来源</button><button class="primary" data-action="close">关闭</button></div></div>`;}
function renderSources(){$('#modal-body').innerHTML=`${modalHeader('','资料来源','模型条件与软件工具参考官方资料；学习顺序和练习为自行整理。')}<div class="modal-content"><div class="source-links">${Object.keys(SOURCES).map(sourceLink).join('')}</div></div>`;}
function renderScenarios(){const items=SCENARIOS.filter(s=>s.contest===profile.contest);$('#modal-body').innerHTML=`${modalHeader('TRY A SMALL PROBLEM','练习示例','载入后可继续调整条件。')}<div class="modal-content"><div class="tool-toggle"><button data-scenario-contest="cumcm" class="${profile.contest==='cumcm'?'selected':''}">国赛练习</button><button data-scenario-contest="mcm" class="${profile.contest==='mcm'?'selected':''}">美赛练习</button></div><div class="help-steps">${items.map(s=>`<div><h3>${s.name} <span class="priority-tag">${s.tag}</span></h3><p>${GOALS.find(g=>g.id===s.goal).hint} · ${DATA_TYPES.find(d=>d.id===s.data).name}</p><button class="card-details" style="margin-top:12px" data-scenario="${s.id}">载入</button></div>`).join('')}</div></div>`;}
document.addEventListener('click',event=>{
 const el=event.target.closest('button,[data-scenario]');if(!el)return;
 if(el.dataset.detail){openModal('model',el.dataset.detail);return;}
 if(el.dataset.compare){toggleCompare(el.dataset.compare);return;}
 if(el.dataset.learn){roadmapModel=el.dataset.learn;save();if(modal.open)modal.close();location.hash='#roadmap';render();return;}
 if(el.dataset.scenario){applyScenario(el.dataset.scenario);return;}
 if(el.dataset.contest){profile.contest=el.dataset.contest;profile.scenario=null;save();render();return;}
 if(el.dataset.goal){profile.goal=el.dataset.goal;profile.scenario=null;save();render();return;}
 if(el.dataset.feature){const feature=el.dataset.feature;profile.features=profile.features.includes(feature)?profile.features.filter(x=>x!==feature):[...profile.features,feature];profile.scenario=null;el.classList.toggle('selected',profile.features.includes(feature));el.setAttribute('aria-pressed',profile.features.includes(feature));el.textContent=(profile.features.includes(feature)?'✓ ':'')+FEATURES.find(f=>f.id===feature).name;document.querySelectorAll('.scenario-btn.active').forEach(x=>x.classList.remove('active'));updateRecommendations();return;}
 if(el.dataset.filter){libraryFilter=el.dataset.filter;render();return;}
 if(el.dataset.software){software=el.dataset.software;save();if(currentModal?.type==='model'&&modal.open)renderModelModal(currentModal.id);else render();return;}
 if(el.dataset.scenarioContest){profile.contest=el.dataset.scenarioContest;save();renderScenarios();render();return;}
 switch(el.dataset.action){
  case 'reset':profile={...DEFAULT_PROFILE,features:[...DEFAULT_PROFILE.features],scenario:null};save();render();break;
  case 'close':modal.close();break;
  case 'help':case 'rules':case 'sources':case 'scenarios':openModal(el.dataset.action);break;
  case 'clear-compare':comparison=[];save();render();break;
  case 'clear-search':librarySearch='';libraryFilter='all';render();break;
 }
});
document.addEventListener('change',event=>{
 const el=event.target;
 if(el.id==='data-type'){profile.data=el.value;profile.scenario=null;updateRecommendations();document.querySelectorAll('.scenario-btn.active').forEach(x=>x.classList.remove('active'));}
 if(el.id==='has-labels'){profile.labels=el.checked;profile.scenario=null;updateRecommendations();}
 if(el.id==='experience'){profile.experience=el.value;updateRecommendations();}
 if(el.id==='roadmap-select'){roadmapModel=el.value;save();render();}
 if(el.dataset.step){completed[el.dataset.step]=el.checked;save();render();if(roadmapSteps(MODELS.find(m=>m.id===roadmapModel)).every((_,i)=>completed[`${roadmapModel}-${i}`]))toast('路线已完成。');}
});
document.addEventListener('input',event=>{if(event.target.id==='model-search'){librarySearch=event.target.value;$('#library-results').innerHTML=libraryResults();}});
document.addEventListener('submit',event=>{if(event.target.id==='profile-form'){event.preventDefault();updateRecommendations();$('#results').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});}});
modal.addEventListener('click',event=>{if(event.target===modal){const r=modal.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)modal.close();}});
modal.addEventListener('close',()=>{currentModal=null;if(lastFocus?.isConnected)lastFocus.focus();});
window.addEventListener('hashchange',()=>{render();window.scrollTo({top:0,behavior:'instant'});});
document.querySelectorAll('[data-icon]').forEach(el=>el.innerHTML=icon(el.dataset.icon));
document.querySelectorAll('[data-icon-before]').forEach(el=>el.insertAdjacentHTML('afterbegin',icon(el.dataset.iconBefore)));
render();

