import { Modification } from "./_modification.js";

export class Utilities extends Modification{


     deleteObjects(){
         
    window.addEventListener("keydown", (e)=>{

    if(e.key === "Delete"){

    let objects = this.canvas.getActiveObjects()
    if(objects.length > 1){

    objects.forEach((obj)=>{
    this.canvas.remove(obj);
    this.canvas.discardActiveObject()
    })
    }else{
    this.canvas.remove(this.canvas.getActiveObject());

    }
    }

    })
    }


    discardActiveObject(){
    window.onclick = (e)=>{

    if(e.target.id  === 'canvas-background'){
    document.querySelector('.canvas-options').style.display = "none"

    this.canvas.discardActiveObject()
    this.canvas.renderAll()
    }

    }

    //this is from header, to display 'none' the dropdown btn
    //gebutang ini diri kay dili mo detect kung gawas sa classing ibutang
      window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.style.display == 'block') {
          openDropdown.style.display = 'none';
    
  
        }
      }
      document.querySelectorAll('li').forEach((e)=>{
      e.style.backgroundColor = '';
      })
    }
  }

    }


    canvasOn(property){
    this.canvas.on({
    'selection:updated': function(o){
    var activeObj = o.selected[0];//to throw error type o.target

    //reset fontSize
    if(activeObj.type == "textbox"){
        let fontSize = document.querySelector(property.fontSize)
        fontSize.value = activeObj.fontSize

    }
    
    activeObj.set("borderColor","#333");
    activeObj.set("cornerColor","#17a2b8");
    activeObj.set("cornerSize",15);
    activeObj.set("cornerStyle","circle");
    activeObj.set("transparentCorners",false);
    activeObj.set("lockUniScaling",true);

    },
    'selection:created': function(o){
    var activeObj = o.selected[0];
    if(activeObj.group  !== undefined){
     let group = activeObj.group
    group.set("borderColor","#333");
    group.set("cornerColor","#17a2b8");
    group.set("cornerSize",15);
    group.set("cornerStyle","circle");
    group.set("transparentCorners",false);
    group.set("lockUniScaling",true);
    }
    //reset fontSize
    if(activeObj.type == "textbox"){
    let fontSize = document.querySelector(property.fontSize)
    fontSize.value = activeObj.fontSize
    
    }




    activeObj.set("borderColor","#333");
    activeObj.set("cornerColor","#17a2b8");
    activeObj.set("cornerSize",15);
    activeObj.set("cornerStyle","circle");
    activeObj.set("transparentCorners",false);
    activeObj.set("lockUniScaling",true);

    },

    });

    }




}