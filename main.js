
import {Modal, ActiveBtn} from "./js_file/gwill.js";
import {createCanvasFormModal} from "./js_file/_textElement.js";
import {Canvas} from "./js_file/canvas.js";
import {Open_file} from "./js_file/_open_file.js";
import {header} from './js_file/_header.js'


    //==================window height size=======================//
    let header_size = document.querySelector('header').offsetHeight
    let sub_header_size = document.querySelector('.sub_header').offsetHeight
    let alert_header = document.querySelector('#alert-header').offsetHeight


    document.querySelector('main').style.height = window.innerHeight - header_size - sub_header_size  - alert_header +  'px';

    //window_height resize
    window.addEventListener('resize', ()=>{
    let header_size = document.querySelector('header').offsetHeight
    let sub_header_size = document.querySelector('.sub_header').offsetHeight
    let alert_header = document.querySelector('#alert-header').offsetHeight

    document.querySelector('main').style.height = window.innerHeight - header_size - sub_header_size - alert_header+  'px';
    })




  //==========header active btn ===================================//

  new ActiveBtn('dropbtn',{styleProperty: 'teal',customClassName:false,});
  header();



    //===========create and select size of canvas modal===========//
    let createCanvasModal = new Modal('#createCanvasModal', {
    backgroundColor: 'rgba(51, 51, 51, 0.705)',
    width:'480px',
    height:'320px',
    title: 'Create Canvas',
    showButton:'#showCreateCanvasModalBtn',
    modalHeaderColor:'teal',
    windowClickClose: false,
    modalContentBackgroundColor:'#fff',
    })

    createCanvasModal.bodyContent(createCanvasFormModal,()=>{
    //custom close button
    document.querySelector('#createCanvasBtn').onclick = ()=>{
    document.querySelector('#createCanvasModal').style.display = 'none';


    //================create the main canvas in modal================//
  
    let canvasScale = 1;
    let SCALE_FACTOR = 1.1;
    let width = document.querySelector('#canvas_width').value
    let height = document.querySelector('#canvas_height').value
    let fileName = document.querySelector('#project_name').value

      if(fileName){
      document.querySelector('#file_name').innerHTML = fileName
      }else{
      document.querySelector('#file_name').innerHTML = 'untitled'
      }

    let fileHandle;
      const canvas = (width, height) => {
    let c = document.createElement("canvas")
    c.id = "canvas"
    document.querySelector('#canvas-background').appendChild(c)
    return new fabric.Canvas("canvas", {
     width : width,
    height :height,
    backgroundColor:"#fff",
    preserveObjectStacking:true,
    })
    }
   let canvas_created = canvas(width, height)
    let canvasInit = new Canvas({
        canvas: canvas_created,
        width: width,
        height: height,
        canvasScale: canvasScale,
        SCALE_FACTOR:SCALE_FACTOR,
        fileHandle: fileHandle
    })
    canvasInit.create_main_canvas()


function fitCanvasToScreen(){
// this.canvasScale = 1; 
if(width >= 3000){
SCALE_FACTOR =5.2;
}
else if(width <= 2999 && width >= 2000){
SCALE_FACTOR= 2.8;
}
else if(width <= 1999 && width >= 1000){
    SCALE_FACTOR= 2.1;
}
else{
SCALE_FACTOR= 1.1;
}
canvasScale = canvasScale / SCALE_FACTOR;
canvas_created.setHeight(height * (1 / SCALE_FACTOR));
canvas_created.setWidth(width * (1 / SCALE_FACTOR));
canvas_created.setZoom(canvasScale);     
canvas_created.renderAll();
}

fitCanvasToScreen()


function zoomIn(selector) {
SCALE_FACTOR = 1.1

let zoomIn = document.querySelector(selector)
zoomIn.addEventListener('click', ()=>{
canvasScale = canvasScale * SCALE_FACTOR;
canvas_created.setHeight(canvas_created.getHeight() * SCALE_FACTOR);
canvas_created.setWidth(canvas_created.getWidth() * SCALE_FACTOR);
canvas_created.setZoom(canvasScale);
canvas_created.renderAll();
})

}
zoomIn("#zoomIn")
    
function zoomOut(selector){
let zoomOut = document.querySelector(selector)
SCALE_FACTOR = 1.1

zoomOut.addEventListener('click', (e)=>{
canvasScale = canvasScale / SCALE_FACTOR;
canvas_created.setHeight(canvas_created.getHeight() * (1 / SCALE_FACTOR));
canvas_created.setWidth(canvas_created.getWidth() * (1 / SCALE_FACTOR));
canvas_created.setZoom(canvasScale);     
canvas_created.renderAll();
})

}

zoomOut("#zoomOut")


    }


    })



//================= open json file and create canvas ===========================//
document.querySelector('#open_file').addEventListener('click', async function(){
let file = new Open_file();

let json_file = await file.get_file_json()
 

  let canvasScale = 1;
  let SCALE_FACTOR = 1.1;
  let width =  json_file.canvas.size.w;
  let height = json_file.canvas.size.h;
  //file name
  document.querySelector('#file_name').innerHTML = json_file.fileName.replace('.json', '')
 
              


const canvas = (width, height) => {
let c = document.createElement("canvas")
c.id = "canvas"
document.querySelector('#canvas-background').appendChild(c)
return new fabric.Canvas("canvas", {
width : width,
height :height,
backgroundColor:"#fff",
preserveObjectStacking:true,
})
}
let canvas_created = canvas(width, height)

canvas_created.loadFromJSON(json_file.canvas.json, function() {


  let obj =  canvas_created.getObjects()
obj.forEach((e)=>{

 if(e.clip === true){
 
 e.clipPath.absolutePositioned = true;
 canvas_created.renderAll();
}
})
});

let canvasInit = new Canvas({
canvas: canvas_created,
width: width,
height: height,
canvasScale: canvasScale,
SCALE_FACTOR:SCALE_FACTOR,
fileHandle: json_file.fileHandle
})
canvasInit.create_main_canvas()


function fitCanvasToScreen(){
// this.canvasScale = 1; 
if(width >= 3000){
SCALE_FACTOR =5.2;
}
else if(width <= 2999 && width >= 2000){
SCALE_FACTOR= 2.8;
}
else if(width <= 1999 && width >= 1000){
SCALE_FACTOR= 2.1;
}
else{
SCALE_FACTOR= 1.1;
}
canvasScale = canvasScale / SCALE_FACTOR;
canvas_created.setHeight(height * (1 / SCALE_FACTOR));
canvas_created.setWidth(width * (1 / SCALE_FACTOR));
canvas_created.setZoom(canvasScale);     
canvas_created.renderAll();
}

fitCanvasToScreen()


function zoomIn(selector) {
SCALE_FACTOR = 1.1

let zoomIn = document.querySelector(selector)
zoomIn.addEventListener('click', ()=>{
canvasScale = canvasScale * SCALE_FACTOR;
canvas_created.setHeight(canvas_created.getHeight() * SCALE_FACTOR);
canvas_created.setWidth(canvas_created.getWidth() * SCALE_FACTOR);
canvas_created.setZoom(canvasScale);
canvas_created.renderAll();
})

}
zoomIn("#zoomIn")

function zoomOut(selector){
let zoomOut = document.querySelector(selector)
SCALE_FACTOR = 1.1

zoomOut.addEventListener('click', (e)=>{
canvasScale = canvasScale / SCALE_FACTOR;
canvas_created.setHeight(canvas_created.getHeight() * (1 / SCALE_FACTOR));
canvas_created.setWidth(canvas_created.getWidth() * (1 / SCALE_FACTOR));
canvas_created.setZoom(canvasScale);     
canvas_created.renderAll();
})

}

zoomOut("#zoomOut")
})

    //=========== show and hide canvas right tools ==========================//

    document.querySelector('#hide-tools-btn').onclick = ()=>{
    let canvasTools = document.querySelector('.canvas-tools')
    if(canvasTools.style.display == '' || canvasTools.style.display == 'block'){
    canvasTools.style.display = 'none'
    document.querySelector('#canvas-tools-container').style.width = '70px';
    // document.querySelector('#canvas-tools-container').style.backgroundColor = 'transparent';

    document.querySelector('#hide-tools-btn').innerHTML= '<<';
    // document.querySelector('#hide-tools-btn').style.marginRight = '50px'
    }else{
    canvasTools.style.display = 'block'
    document.querySelector('#canvas-tools-container').style.width = '350px'
    document.querySelector('#hide-tools-btn').innerHTML= '>>'
      // document.querySelector('#hide-tools-btn').style.marginRight = '15px'

    }
      
    }





//========================== development only ====================//

  let canvasScale = 1;
    let SCALE_FACTOR;
    let width = 3510;
    let height =2490;
    let fileHandle;

    const canvas = (width, height) => {
    let c = document.createElement("canvas")
    c.id = "canvas"
    document.querySelector('#canvas-background').appendChild(c)
    return new fabric.Canvas("canvas", {
    width : width,
    height :height,
    backgroundColor:"#fff",
    preserveObjectStacking:true,
    })
    }
   let canvas_created = canvas(width, height)
    let canvasInit = new Canvas({
        canvas: canvas_created,
        width: width,
        height: height,
        canvasScale: canvasScale,
        SCALE_FACTOR:SCALE_FACTOR,
        fileHandle: fileHandle
    })
    canvasInit.create_main_canvas()
function fitCanvasToScreen(){
    // this.canvasScale = 1; 
    if(width >= 3000){
    SCALE_FACTOR =5.2;
    }
    else if(width <= 2999 && width >= 2000){
    SCALE_FACTOR= 2.8;
    }
    else if(width <= 1999 && width >= 1000){
       SCALE_FACTOR= 2.1;
    }
    else{
    SCALE_FACTOR= 1.1;
    }
    canvasScale = canvasScale / SCALE_FACTOR;
    canvas_created.setHeight(height * (1 / SCALE_FACTOR));
    canvas_created.setWidth(width * (1 / SCALE_FACTOR));
    canvas_created.setZoom(canvasScale);     
    canvas_created.renderAll();
  }

  fitCanvasToScreen()


 function zoomIn(selector) {
    SCALE_FACTOR = 1.1

    let zoomIn = document.querySelector(selector)
    zoomIn.addEventListener('click', ()=>{
    canvasScale = canvasScale * SCALE_FACTOR;
    canvas_created.setHeight(canvas_created.getHeight() * SCALE_FACTOR);
    canvas_created.setWidth(canvas_created.getWidth() * SCALE_FACTOR);
    canvas_created.setZoom(canvasScale);
    canvas_created.renderAll();
    })

    }
zoomIn("#zoomIn")
    
     function zoomOut(selector){
    let zoomOut = document.querySelector(selector)
    SCALE_FACTOR = 1.1

    zoomOut.addEventListener('click', (e)=>{
    canvasScale = canvasScale / SCALE_FACTOR;
    canvas_created.setHeight(canvas_created.getHeight() * (1 / SCALE_FACTOR));
    canvas_created.setWidth(canvas_created.getWidth() * (1 / SCALE_FACTOR));
    canvas_created.setZoom(canvasScale);     
    canvas_created.renderAll();
    })

    }

zoomOut("#zoomOut")

//=============================================================================//









    //================================== end ==============================//


