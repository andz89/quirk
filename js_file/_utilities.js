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
   
      if(e.target.classList.contains('upper-canvas')){
    document.querySelector('.canvas-options').style.display = "none"


      }
    if(e.target.id  === 'canvas-background' ){

    document.querySelector('.canvas-options').style.display = "none"
    // document.querySelector('.canvas-options').style.display = "none"


    this.canvas.discardActiveObject()
    this.canvas.renderAll()
    }

        //this is from header, to display 'none' the dropdown btn
    //gebutang ini diri kay dili mo detect kung gawas sa classing ibutang
    if (!e.target.matches('.dropbtn')) {
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
    var activeObj = o.selected[0];

    //bold text
    let bold =  document.querySelector('#bold')
    if(activeObj.type == "textbox" && activeObj.fontWeight === 'bold'){bold.style.backgroundColor = 'rgba(87, 86, 86, 0.733)'}
    if(activeObj.type == "textbox" && activeObj.fontWeight === 'normal'){bold.style.backgroundColor = ''}
    if(activeObj.type !== "textbox"){bold.style.backgroundColor = ''}
    //-------------------------------------//

    //italic text
    let italic =  document.querySelector('#italic')
    if(activeObj.type == "textbox" && activeObj.fontStyle === 'italic'){italic.style.backgroundColor = 'rgba(87, 86, 86, 0.733)'}
    if(activeObj.type == "textbox" && activeObj.fontStyle === 'normal'){italic.style.backgroundColor = ''}
    if(activeObj.type !== "textbox"){italic.style.backgroundColor = ''}
    //-------------------------------------//


    //fontSize 
    if(activeObj.type == "textbox"){
        document.querySelector(property).value = activeObj.fontSize
    }else{
       document.querySelector(property).value = ''
    }
    //-------------------------------------//
    
  //stroke_width

  document.querySelector('#stroke_width').value = activeObj.strokeWidth
  //-------------------------------------//

        //opacity
    let opacity =  document.querySelector('#opacity')

    if(activeObj.opacity === 1){
    opacity.value = 10
    }
    if(activeObj.opacity === 0.9){
    opacity.value = 9
    }
    if(activeObj.opacity === 0.8){
    opacity.value = 8
    }
    if(activeObj.opacity === 0.7){
    opacity.value = 7
    }
    if(activeObj.opacity === 0.6){
    opacity.value = 6
    }
    if(activeObj.opacity === 0.5){
    opacity.value = 5
    }
    if(activeObj.opacity === 0.4){
    opacity.value = 4
    }
    if(activeObj.opacity === 0.3){
    opacity.value = 3
    }
    if(activeObj.opacity === 0.2){
    opacity.value = 2
    }
     if(activeObj.opacity === 0.1){
    opacity.value = 1
    }
     if(activeObj.opacity === 0){
    opacity.value = 0
    }
    //-------------------------------------//


    activeObj.set("borderColor","#333");
    activeObj.set("cornerColor","#17a2b8");
    activeObj.set("cornerSize",15);
    activeObj.set("cornerStyle","circle");
    activeObj.set("transparentCorners",false);
    activeObj.set("lockUniScaling",true);

    },
    'selection:created': function(o){
    var activeObj = o.selected[0];

    //bold text
    let bold =  document.querySelector('#bold')
    if(activeObj.type == "textbox" && activeObj.fontWeight === 'bold'){bold.style.backgroundColor = 'rgba(87, 86, 86, 0.733)'}
    if(activeObj.type == "textbox" && activeObj.fontWeight === 'normal'){bold.style.backgroundColor = ''}
    if(activeObj.type !== "textbox"){bold.style.backgroundColor = ''}
    //-------------------------------------//

    //italic text
    let italic =  document.querySelector('#italic')
    if(activeObj.type == "textbox" && activeObj.fontStyle === 'italic'){italic.style.backgroundColor = 'rgba(87, 86, 86, 0.733)'}
    if(activeObj.type == "textbox" && activeObj.fontStyle === 'normal'){italic.style.backgroundColor = ''}
    if(activeObj.type !== "textbox"){italic.style.backgroundColor = ''}
    //-------------------------------------//

    //fontSize 
    if(activeObj.type == "textbox"){
        document.querySelector(property).value = activeObj.fontSize
    }else{
       document.querySelector(property).value = ''
    }
    //-------------------------------------//


       //opacity
    let opacity =  document.querySelector('#opacity')
  
    if(activeObj.opacity === 1){
    opacity.value = 10
    }
    if(activeObj.opacity === 0.9){
    opacity.value = 9
    }
    if(activeObj.opacity === 0.8){
    opacity.value = 8
    }
    if(activeObj.opacity === 0.7){
    opacity.value = 7
    }
    if(activeObj.opacity === 0.6){
    opacity.value = 6
    }
    if(activeObj.opacity === 0.5){
    opacity.value = 5
    }
    if(activeObj.opacity === 0.4){
    opacity.value = 4
    }
    if(activeObj.opacity === 0.3){
    opacity.value = 3
    }
    if(activeObj.opacity === 0.2){
    opacity.value = 2
    }
     if(activeObj.opacity === 0.1){
    opacity.value = 1
    }
     if(activeObj.opacity === 0){
    opacity.value = 0
    }
  
    //-------------------------------------//


        //stroke_width
      
  document.querySelector('#stroke_width').value = activeObj.strokeWidth
    //-------------------------------------//



    
    if(activeObj.group  !== undefined){
     let group = activeObj.group
    group.set("borderColor","#333");
    group.set("cornerColor","#17a2b8");
    group.set("cornerSize",15);
    group.set("cornerStyle","circle");
    group.set("transparentCorners",false);
    group.set("lockUniScaling",true);
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