
document.addEventListener("DOMContentLoaded",()=>{
 const cfg=window.VESTIGIO_BOOK;
 const engine=new BookEngine(cfg);
 const out=document.getElementById("page");
 const info=document.getElementById("info");
 function render(){
   fetch(`page${String(engine.state.page).padStart(2,"0")}.html`)
   .then(r=>r.text()).then(t=>out.innerHTML=t);
   info.textContent=`Página ${engine.state.page}/${cfg.pages}`;
 }
 document.getElementById("prev").onclick=()=>{engine.goto(engine.state.page-1);render();}
 document.getElementById("next").onclick=()=>{engine.goto(engine.state.page+1);render();}
 document.getElementById("jump").onclick=()=>{
   const p=parseInt(prompt("Página"));
   if(!isNaN(p)){engine.goto(p);render();}
 };
 render();
});
