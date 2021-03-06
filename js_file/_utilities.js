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
         //sub header area
    document.querySelector('.canvas-options').style.display = "none"
   document.querySelector('.align_canvas_container').style.display = "none"

      }
    if(e.target.id  === 'canvas-background' ){

      //sub header area
    document.querySelector('.canvas-options').style.display = "none"
    document.querySelector('.align_canvas_container').style.display = "none"
   


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


    canvasOn(){
       const  select_object =(o)=>{
    var activeObj = o.selected[0];
    console.log(activeObj.o)
   
//scale image
 document.querySelector('#scale-image').value = activeObj.scaleX

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
        document.querySelector("#fontSize").value = activeObj.fontSize
    }else{
       document.querySelector("#fontSize").value = ''
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

   if(activeObj.group  !== undefined){

     let group = activeObj.group
    group.set("borderColor","#333");
    group.set("cornerColor","#17a2b8");
    group.set("cornerSize",12);
    group.set("cornerStyle","circle");
    group.set("transparentCorners",false);
    group.set("lockUniScaling",true);
    
    
    }
    

    activeObj.set("borderColor","#333");
    activeObj.set("cornerColor","#17a2b8");
    activeObj.set("cornerSize",12);
    activeObj.set("cornerStyle","circle");
    activeObj.set("transparentCorners",false);
    activeObj.set("lockUniScaling",true);
 
   
    //adjust scale range of input
         let scale=  document.querySelector('#scale-image')

          if(activeObj.width > 1000){
               scale.max = 1
          }
          else if(activeObj.type === 'textbox'){
             scale.max = 100
          }
          else{
            scale.max = 10
          }

    }


  
    const modify_object =()=>{
    this.updateModifications(true)
    }


    this.canvas.on({
    'selection:updated':select_object,
    'selection:created':select_object,
    'object:modified': modify_object,
   
    });
  
    }


    //arrow movement
arrowMovement(){
var Direction = {
  LEFT: 0,
  UP: 1,
  RIGHT: 2,
  DOWN: 3
};

fabric.util.addListener(document.body, 'keydown',(options)=> {
  if (options.repeat) {
    return;
  }
  let object = this.canvas.getActiveObject()
  if(object){
    if(object.lockMovementX !== true){
      var key = options.which || options.keyCode; // key detection
    if (key === 37) { // handle Left key
     this. moveSelected(Direction.LEFT);
    } else if (key === 38) { // handle Up key
      this.moveSelected(Direction.UP);
    } else if (key === 39) { // handle Right key
      this.moveSelected(Direction.RIGHT);
    } else if (key === 40) { // handle Down key
     this.moveSelected(Direction.DOWN);
    }
    }
  }

  
});

}


load_UI_lock_objects(){
          
  setTimeout(() => {
  let objects =  this.canvas.getObjects()
    let lock_objects = objects.filter((each_object)=>{
    if(each_object.lockMovementX === true && each_object.lockMovementY === true && each_object.name !== 'canvas_stroke'){ 
    return each_object
    }
    })
  if(lock_objects.length === 0){return false}
  this.display_lockObjects(lock_objects)
  },1000)
}

header(){

document.querySelector('header').onclick = (e)=>{

document.querySelectorAll('.dropdown .dropdown-content').forEach((e)=>{e.style.display = 'none'})

let element = e.target

if(element.classList.contains('dropbtn-files')){
  // this.canvas.discardActiveObject()
  // this.canvas.renderAll()

document.querySelector(".dropdown-files .dropdown-content").style.display = 'block';
}

if(element.classList.contains('dropbtn-insert-shape')){
document.querySelector(".dropdown-insert-shape .dropdown-content").style.display = 'block';
}

if(element.classList.contains('dropbtn-clip-image')){
document.querySelector(".dropdown-clip-image .dropdown-content").style.display = 'block';
}



}

//sub header area
document.querySelector('#canvas-property-btn').addEventListener('click', ()=>{
document.querySelector('.canvas-options').style.display = "flex"

})


document.querySelector('.align_canvas').addEventListener('click', ()=>{
document.querySelector('.align_canvas_container').style.display = "block"

})






}









}