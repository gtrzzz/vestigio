(() => {
const C = window.VESTIGIO_CONFIG;
const $ = id => document.getElementById(id);
const decode = s => { try { return decodeURIComponent(Array.from(atob(s)).map(c => '%' + c.charCodeAt(0).toString(16).padStart(2,'0')).join('')); } catch { return atob(s); } };
const norm = s => String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toUpperCase().trim().replace(/[^A-Z0-9]+/g,' ').replace(/\s+/g,' ');
const fresh = () => ({
  session:'VST-'+Date.now().toString(36).toUpperCase(),
  firstOpened:new Date().toISOString(),
  started:false, completed:[], attempts:{}, answers:{}, hints:{}, sound:false,
  substeps:{orientation:[], essence:[], form:[], destination:[]}
});
let state;
try { state = JSON.parse(localStorage.getItem(C.meta.storageKey)) || fresh(); } catch { state = fresh(); }
let activeLevel = null, holdTimer = null, tapCount = 0, tapReset = null;
const scenes = ['bootScene','introScene','hubScene','levelScene','revealScene','bookScene','letterScene'];

function save(){ try{ localStorage.setItem(C.meta.storageKey, JSON.stringify(state)); }catch{} renderFooter(); }
function showScene(id, chrome=true){
  scenes.forEach(s => $(s).classList.remove('active'));
  $(id).classList.add('active');
  $('topbar').classList.toggle('hidden', !chrome);
  $('footer').classList.toggle('hidden', !chrome);
  scrollTo(0,0);
}
async function runBoot(){
  for(const [text,delay] of [['Inicializando sesión…',700],['Verificando origen…',800],['Sincronizando memoria…',850],['Escaneando registros…',850]]){
    $('bootStatus').textContent=text; await new Promise(r=>setTimeout(r,delay));
  }
  $('bootStatus').textContent='Coincidencias encontradas: 1';
  await new Promise(r=>setTimeout(r,650));
  $('bootIdentity').innerHTML='<span>Identidad vinculada</span><strong>'+C.meta.player+'</strong>';
  await new Promise(r=>setTimeout(r,850));
  $('bootStatus').textContent='Acceso concedido.';
  $('bootContinue').classList.remove('concealed');
}
function renderFooter(){
  $('sessionLabel').textContent='SESIÓN: '+state.session;
  $('storageLabel').textContent='ALMACENAMIENTO: LOCAL ACTIVO';
}
function unlocked(level){
  if(level.number===1) return state.started;
  return state.completed.includes(C.levels[level.number-2].id);
}
function renderHub(){
  $('fragmentCount').textContent=state.completed.length+' / 4';
  $('progressBar').style.width=(state.completed.length*25)+'%';
  const days=Math.max(0,Math.floor((Date.now()-new Date(state.firstOpened).getTime())/86400000));
  $('returnMessage').textContent=days>0?'Han pasado '+days+' días desde la primera señal. El rumbo continúa intacto.':'La sesión de '+C.meta.player+' está activa.';
  const list=$('recordList'); list.innerHTML='';
  C.levels.forEach(level=>{
    const done=state.completed.includes(level.id), u=unlocked(level);
    const b=document.createElement('button');
    b.className='record'+(done?' complete':''); b.disabled=!u;
    b.innerHTML='<div class="record-top"><small>REGISTRO 0'+level.number+'</small><span class="record-status">'+(done?'RECUPERADO':u?'DISPONIBLE':'BLOQUEADO')+'</span></div><h3>'+level.title+'</h3><p>'+level.subtitle+'</p>';
    b.onclick=()=>openLevel(level.id); list.append(b);
  });
}
function puzzleOrientation(){
  return `
  <div class="dossier-grid two">
    <section class="paper">
      <h3>COMUNICACIÓN RECIBIDA</h3>
      <div class="cipher">QHE RUFZH YOLTK<br>CLU GRJMP LSBOQ<br>URVD QR HV HO ILQDO<br>XIBPXB XIBPXB XIBPXB</div>
      <div class="file-tools">
        <button type="button" class="micro-button" id="copyOrientation">Copiar texto</button>
        <button type="button" class="micro-button" id="inspectOrientation">Inspeccionar archivo</button>
      </div>
      <div id="orientationMeta" class="reveal-box">
        ARCHIVO: V-01.txt<br>
        LÍNEAS: 4<br>
        ANOMALÍA: la tercera línea utiliza un patrón estable.<br>
        MARCA ANGULAR: 15°
      </div>
    </section>
    <section class="compass-card">
      <small>LECTURA DE RUMBO</small>
      <div class="compass"></div>
      <p>La desviación no es un error. Es la clave.</p>
    </section>
  </div>
  <section class="paper" style="margin-top:14px">
    <h3>NOTA DE CAMPO</h3>
    <p>Observa. Resta. Ajusta. Revela.</p>
    <p>Cuando la tercera línea hable, busca una palabra que describa lo ocurrido con la aguja.</p>
  </section>`;
}
function puzzleEssence(){
  return `
  <div class="dossier-grid two">
    <section class="paper">
      <h3>FICHA DE ESENCIA // N.º 214</h3>
      <div class="scent-table">
        <div class="scent-row"><span>SALIDA</span><span>bergamota · pera · lichi</span></div>
        <div class="scent-row"><span>CORAZÓN</span><span>rosa · peonía · jazmín</span></div>
        <div class="scent-row"><span>FONDO</span><span>magnolia · ámbar · cedro</span></div>
      </div>
      <div id="mirrorText" class="mirror-text">OY OLOS</div>
      <div class="file-tools">
        <button type="button" class="micro-button" id="mirrorButton">Usar espejo</button>
        <button type="button" class="micro-button" id="rewindButton">Rebobinar cinta</button>
      </div>
      <div id="essenceLog" class="reveal-box">No se ha aplicado ningún método.</div>
    </section>
    <section class="film-strip">
      <article class="film-frame"><strong>FOTOGRAMA A</strong><p>Una palabra escrita al revés sobre una puerta.</p><span>REDRUM</span></article>
      <article class="film-frame"><strong>FOTOGRAMA B</strong><p>Dos figuras idénticas observan desde un pasillo.</p><span>GEMELAS</span></article>
      <article class="film-frame"><strong>FOTOGRAMA C</strong><p>Una cinta espera a ser reproducida desde el principio.</p><span>REBOBINAR</span></article>
    </section>
  </div>
  <section class="paper" style="margin-top:14px">
    <h3>NOTA PRIVADA</h3>
    <p>No es solo una fragancia. Es una firma.</p>
    <p>El juego no está en las palabras importantes, sino en el método que sugieren los fotogramas.</p>
  </section>`;
}
let layerOrder = ['W','I','K','I'];
const layerNames = {
  K:'00.20 mm · BASE · K',
  I:'18.40 mm · TORSO · I',
  W:'41.80 mm · CABEZA · W'
};
function puzzleForm(){
  return `
  <div class="dossier-grid two">
    <section class="paper">
      <h3>ESCANEO 3D // SUJETO K</h3>
      <img class="kiwi-photo" src="./assets/images/kiwi-reference.jpeg" alt="Kiwi con una pelota de tenis">
      <p>Orejas grandes. Pecho claro. Pelota siempre cerca. Cuerpo alargado.</p>
    </section>
    <section>
      <div id="scanLayers" class="scan-grid"></div>
      <p id="scanResult" class="scan-result"></p>
      <div class="paper" style="margin-top:12px">
        <h3>ESPECIFICACIONES</h3>
        <p>Altura: 73 mm<br>Longitud: 112 mm<br>Ancho: 48 mm<br>Capas: 0.20 mm<br>Material: PLA<br>Tiempo: 4 h 13 min</p>
      </div>
    </section>
  </div>`;
}
function puzzleDestination(){
  const words=['NO','ERA','UNA','FECHA','LA','DIRECCION','SIEMPRE','CAMBIA','CUANDO','ALGUIEN','RECUERDA','SU','NOMBRE','YO','CONSTRUYO','CAPA','A','CAPA','NUESTRO','PROXIMO','RECUERDO','TODAVIA','NO','EXISTE','EUROPA'];
  return `
  <section class="final-book-text">
    <small>EXTRACTO DEL CUADERNO</small>
    <div class="fragment-row"><span class="fragment-chip">15</span><span class="fragment-chip">YO</span><span class="fragment-chip">CAPA</span></div>
    <p>Las respuestas nunca son aisladas. El número señala una posición; la identidad selecciona una voz; la forma indica que existe una segunda lectura.</p>
    <div class="book-cipher">${words.map((w,i)=>'<div class="book-word" data-index="'+(i+1)+'">'+(i+1)+' · '+w+'</div>').join('')}</div>
    <div class="file-tools">
      <button type="button" class="secondary" id="applyBookCipher">Aplicar fragmentos</button>
    </div>
    <div id="destinationResult" class="hint-output">Resultado pendiente.</div>
  </section>`;
}
function renderLayers(){
  const box=$('scanLayers'); if(!box) return; box.innerHTML='';
  layerOrder.forEach((letter,index)=>{
    const row=document.createElement('div'); row.className='scan-layer';
    row.innerHTML='<div class="scan-art">'+layerNames[letter]+'</div><div class="scan-controls"><button type="button" data-dir="-1" data-i="'+index+'">↑</button><button type="button" data-dir="1" data-i="'+index+'">↓</button></div>';
    box.append(row);
  });
  box.querySelectorAll('button').forEach(btn=>btn.onclick=()=>{
    const i=+btn.dataset.i,j=i+(+btn.dataset.dir); if(j<0||j>=layerOrder.length) return;
    [layerOrder[i],layerOrder[j]]=[layerOrder[j],layerOrder[i]]; renderLayers();
    if(layerOrder.join('')==='KIWI'){
      $('scanResult').textContent='SECUENCIA VALIDADA: K · I · W · I';
      if(!state.substeps.form.includes('layers')) state.substeps.form.push('layers'); save();
    } else $('scanResult').textContent='Secuencia incompleta.';
  });
}
function openLevel(id){
  activeLevel=C.levels.find(l=>l.id===id);
  $('levelCode').textContent='REGISTRO 0'+activeLevel.number;
  $('levelTitle').textContent=activeLevel.title;
  $('levelSubtitle').textContent=activeLevel.subtitle;
  $('answerInput').value=state.answers[id]||'';
  $('answerFeedback').textContent=''; $('hintInput').value=''; $('hintOutput').textContent='';
  $('puzzleArea').innerHTML=id==='orientation'?puzzleOrientation():id==='essence'?puzzleEssence():id==='form'?puzzleForm():puzzleDestination();
  showScene('levelScene');
  if(id==='orientation'){
    $('copyOrientation').onclick=()=>navigator.clipboard?.writeText('QHE RUFZH YOLTK\nCLU GRJMP LSBOQ\nURVD QR HV HO ILQDO\nXIBPXB XIBPXB XIBPXB');
    $('inspectOrientation').onclick=()=>{ $('orientationMeta').classList.add('visible'); if(!state.substeps.orientation.includes('meta')) state.substeps.orientation.push('meta'); save(); };
  }
  if(id==='essence'){
    let mirrored=false,rewound=false;
    const update=()=>{
      const log=$('essenceLog'); log.classList.add('visible');
      if(mirrored&&rewound){ log.textContent='MÉTODOS COMBINADOS: SOLO YO'; if(!state.substeps.essence.includes('methods')) state.substeps.essence.push('methods'); save(); }
      else if(mirrored) log.textContent='ESPEJO APLICADO: SOLO YO';
      else if(rewound) log.textContent='CINTA REBOBINADA: OY OLOS';
    };
    $('mirrorButton').onclick=()=>{ mirrored=true; $('mirrorText').textContent='SOLO YO'; update(); };
    $('rewindButton').onclick=()=>{ rewound=true; $('mirrorText').textContent=$('mirrorText').textContent.split('').reverse().join(''); update(); };
  }
  if(id==='form'){ layerOrder=['W','I','K','I']; renderLayers(); }
  if(id==='destination'){
    $('applyBookCipher').onclick=()=>{
      $('destinationResult').textContent='15 → YO → CAPA. Segunda lectura encontrada: NUESTRO PRÓXIMO RECUERDO.';
      if(!state.substeps.destination.includes('book')) state.substeps.destination.push('book'); save();
    };
  }
}
function validateAnswer(){
  return activeLevel.answers.map(decode).map(norm).includes(norm($('answerInput').value));
}
function revealLevel(){
  if(!state.completed.includes(activeLevel.id)) state.completed.push(activeLevel.id);
  state.answers[activeLevel.id]=$('answerInput').value; save();
  const n=activeLevel.number;
  $('revealTitle').textContent=n===1?'Primer vestigio recuperado':n===2?'Segundo vestigio recuperado':n===3?'Tercer vestigio recuperado':'Ruta abierta';
  $('revealText').textContent=n===1?'El primer objeto es un iPhone 15 rosa. Guardará fotografías, voces, lugares y versiones de nosotros mismos.':n===2?'La segunda recuperación es Just Moi de Juicy Couture. Una esencia convertida en firma.':n===3?'Kiwi será reconstruido como una figura personalizada impresa en 3D, capa a capa.':'Nos iremos de viaje por Europa. La fecha, el lugar y la experiencia los elegiremos juntos.';
  showScene('revealScene',false);
}
function renderBook(){
  const pages=$('bookPages'); pages.innerHTML='';
  C.levels.forEach(level=>{
    const done=state.completed.includes(level.id);
    const page=document.createElement('article'); page.className='book-page'+(done?'':' locked');
    page.innerHTML=done?'<small>PÁGINA 0'+level.number+'</small><strong>'+level.fragment+'</strong><p>'+level.title+'. Fragmento conservado.</p>':'<small>PÁGINA 0'+level.number+'</small><strong>—</strong><p>Contenido fuera de rumbo.</p>';
    if(done&&level.number===4){ const b=document.createElement('button'); b.className='secondary'; b.textContent='Abrir carta'; b.onclick=()=>showScene('letterScene',false); page.append(b); }
    pages.append(page);
  });
}
function renderOrganizer(){
  $('organizerState').textContent=JSON.stringify(state,null,2);
  const controls=$('organizerControls'); controls.innerHTML='';
  C.levels.forEach(level=>{
    const b=document.createElement('button'); b.className='secondary';
    b.textContent=(state.completed.includes(level.id)?'Marcar pendiente ':'Completar ')+'Nivel '+level.number;
    b.onclick=()=>{ state.completed=state.completed.includes(level.id)?state.completed.filter(x=>x!==level.id):[...state.completed,level.id]; save(); renderOrganizer(); renderHub(); };
    controls.append(b);
  });
}

$('answerForm').onsubmit=e=>{
  e.preventDefault();
  state.attempts[activeLevel.id]=(state.attempts[activeLevel.id]||0)+1;
  state.answers[activeLevel.id]=$('answerInput').value; save();
  if(validateAnswer()){ $('answerFeedback').textContent='La señal coincide.'; $('answerFeedback').className='feedback ok'; setTimeout(revealLevel,300); }
  else { $('answerFeedback').textContent='La señal no coincide todavía. Revisa el expediente.'; $('answerFeedback').className='feedback bad'; }
};
$('hintButton').onclick=()=>{
  const key=norm($('hintInput').value).replaceAll(' ','-');
  const entry=Object.entries(activeLevel.hints).find(([code])=>norm(code).replaceAll(' ','-')===key);
  $('hintOutput').textContent=entry?entry[1]:'Código no reconocido.';
  if(entry){ state.hints[activeLevel.id]=[...new Set([...(state.hints[activeLevel.id]||[]),entry[0]])]; save(); }
};
$('bootContinue').onclick=()=>showScene('introScene',false);
$('startButton').onclick=()=>{ state.started=true; save(); renderHub(); showScene('hubScene'); };
$('backHub').onclick=()=>{ renderHub(); showScene('hubScene'); };
$('continueButton').onclick=()=>{ renderHub(); showScene('hubScene'); };
$('openBook').onclick=()=>{ renderBook(); showScene('bookScene'); };
$('closeBook').onclick=()=>{ renderHub(); showScene('hubScene'); };
$('closeLetter').onclick=()=>{ renderBook(); showScene('bookScene'); };
$('soundToggle').onclick=()=>{ state.sound=!state.sound; $('soundToggle').textContent=state.sound?'●':'◌'; save(); };

$('brand').onpointerdown=()=>holdTimer=setTimeout(()=>$('organizerDialog').showModal(),4000);
$('brand').onpointerup=()=>clearTimeout(holdTimer);
$('brand').onclick=()=>{ tapCount++; clearTimeout(tapReset); if(tapCount>=5){tapCount=0;$('organizerDialog').showModal();} tapReset=setTimeout(()=>tapCount=0,1600); };
$('organizerEnter').onclick=()=>{
  if($('organizerPassword').value===decode(C.meta.organizerPassword)){ $('organizerLogin').hidden=true; $('organizerPanel').hidden=false; renderOrganizer(); }
  else $('organizerFeedback').textContent='Acceso no verificado.';
};
$('simulateAll').onclick=()=>{ state.started=true; state.completed=C.levels.map(l=>l.id); save(); renderOrganizer(); renderHub(); };
$('resetProgress').onclick=()=>{ if(confirm('¿Reiniciar todo el progreso?')){ state=fresh(); save(); location.reload(); } };
if(new URLSearchParams(location.search).get('organizer')==='true') $('organizerDialog').showModal();

function particles(){
  const canvas=$('ambient'),ctx=canvas.getContext('2d'); let particles=[];
  function resize(){ canvas.width=innerWidth*devicePixelRatio; canvas.height=innerHeight*devicePixelRatio; canvas.style.width=innerWidth+'px'; canvas.style.height=innerHeight+'px'; ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0); particles=Array.from({length:44},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*1.3+.25,v:Math.random()*.16+.04,a:Math.random()*.32+.06}));}
  function tick(){ctx.clearRect(0,0,innerWidth,innerHeight);particles.forEach(p=>{p.y+=p.v;if(p.y>innerHeight)p.y=-3;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle='rgba(200,110,129,'+p.a+')';ctx.fill();});requestAnimationFrame(tick);}
  resize();addEventListener('resize',resize);tick();
}
renderFooter(); renderHub(); particles();
if(state.started) showScene('hubScene'); else { showScene('bootScene',false); runBoot(); }
})();