
class BookEngine{
 constructor(cfg){
  this.cfg=cfg;
  this.state=JSON.parse(localStorage.getItem(cfg.storageKey)||'{"page":1,"found":[],"history":[]}');
 }
 save(){localStorage.setItem(this.cfg.storageKey,JSON.stringify(this.state));}
 goto(page){this.state.page=Math.max(1,Math.min(this.cfg.pages,page));this.save();}
 mark(id){if(!this.state.found.includes(id)){this.state.found.push(id);this.save();}}
 export(){return JSON.stringify(this.state,null,2);}
}
window.BookEngine=BookEngine;
