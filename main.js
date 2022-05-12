
import {Modal, ActiveBtn} from "./js_file/gwill.js";
import {Canvas} from "./js_file/canvas.js";
import {Open_file} from "./js_file/_open_file.js";
// import {header} from './js_file/_header.js'


  //==================window height size=======================//
  let header_size = document.querySelector('header').offsetHeight
  let sub_header_size = document.querySelector('.sub_header').offsetHeight

  document.querySelector('main').style.height = window.innerHeight - header_size - sub_header_size   +  'px';

  //window_height resize
  window.addEventListener('resize', ()=>{
  let header_size = document.querySelector('header').offsetHeight
  let sub_header_size = document.querySelector('.sub_header').offsetHeight


  document.querySelector('main').style.height = window.innerHeight - header_size - sub_header_size +  'px';
  })

  //==========================================================//


  //==========header active btn ===================================//
  new ActiveBtn('dropbtn',{styleProperty: 'teal',customClassName:false,});
  //==============================================================//



    //===========create and select size of canvas modal===========//

    const create_canvas_form_element =()=>{
    return      `
    <div class="createCanvasFormModal">

    <div class="size-content">
     <div>
    <label for="">Project Name<label>
    </div>
 
    <div>
    <input id="project_name" placeholder="Project Name"type="text">
    </div>
   
    <div>
    <label for="">Canvas Size<label>
    </div>

    <select id="canvas-size-select">
    <option value="A4-Landscap">A4 size / Landscape</option>
    <option value="A4-Portrait">A4 size / Portrait</option>
     
    <option value="letter-Landscape">Letter size  / Landscape</option>
    <option value="letter-Portrait">Letter size  / Portrait</option>

    <option value="2x2">2x2 in Picture</option>
    <option value="1x1">1x1 in Picture</option>
    <option value="Passport">Passport Size</option>

    <option value="custom-size">Custom size</option>
    </select>

    </div>

    <div class="message_tips">
      <p>
      print is not available for this size.
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos tempore labore animi iure, minima facere!
      </p>
    </div>

    <button id="createCanvasBtn" class="btn btn-primary">Create Project</button>
    </div>
    </div>
    `
    }


    let createCanvasModal = new Modal('#createCanvasModal', {
    backgroundColor: 'rgba(51, 51, 51, 0.705)',
    width:'480px',
    height:'380px',
    title: 'Create Canvas',
    showButton:'#showCreateCanvasModalBtn',
    modalHeaderColor:'teal',
    windowClickClose: false,
    modalContentBackgroundColor:'#fff',
    })

    //================create the main canvas in modal================//

    createCanvasModal.bodyContent(create_canvas_form_element(),()=>{
         
    let canvasScale = 1;
    let SCALE_FACTOR = 1.1;
    let fileName = document.querySelector('#project_name').value
    let width = 3510;
    let height =2490;

      document.querySelector('#canvas-size-select').onchange = (e)=>{
      if(e.target.value ===  'A4-Landscape'){
        width = 3510;
        height =2490;
      };

      if(e.target.value ===  'A4-Portrait'){
      width = 2490;
      height = 3510;
      };

      if(e.target.value ===  'letter-Landscape'){
      width = 3300;
      height = 2550;
      };

      if(e.target.value ===  'letter-Landscape'){
      width = 2550;
      height= 3300;
      };

      if(e.target.value ===  '2x2'){
      width = 600;
      height = 600;
      };

      if(e.target.value ===  '1x1'){
      width = 300;
      height = 300;
      };


    }

    //custom close button
    document.querySelector('#createCanvasBtn').onclick = ()=>{
    document.querySelector('#createCanvasModal').style.display = 'none';
  document.querySelector('.open_and_create_project').style.display = 'none'


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

let file = new Open_file();

file.get_file_json()
 

//   let canvasScale = 1;
//   let SCALE_FACTOR = 1.1;
//   let width =  json_file.canvas.size.w;
//   let height = json_file.canvas.size.h;

//   document.querySelector('#file_name').innerHTML = json_file.fileName.replace('.json', '')  //file name
 
              


// const canvas = (width, height) => {
// let c = document.createElement("canvas")
// c.id = "canvas"
// document.querySelector('#canvas-background').appendChild(c)
// return new fabric.Canvas("canvas", {
// width : width,
// height :height,
// backgroundColor:"#fff",
// preserveObjectStacking:true,
// })
// }
// let canvas_created = canvas(width, height)

// canvas_created.loadFromJSON(json_file.canvas.json);

// let canvasInit = new Canvas({
// canvas: canvas_created,
// width: width,
// height: height,
// canvasScale: canvasScale,
// SCALE_FACTOR:SCALE_FACTOR,
// fileHandle: json_file.fileHandle
// })
// canvasInit.create_main_canvas()


// function fitCanvasToScreen(){
// // this.canvasScale = 1; 
// if(width >= 3000){
// SCALE_FACTOR =5.2;
// }
// else if(width <= 2999 && width >= 2000){
// SCALE_FACTOR= 2.8;
// }
// else if(width <= 1999 && width >= 1000){
// SCALE_FACTOR= 2.1;
// }
// else{
// SCALE_FACTOR= 1.1;
// }
// canvasScale = canvasScale / SCALE_FACTOR;
// canvas_created.setHeight(height * (1 / SCALE_FACTOR));
// canvas_created.setWidth(width * (1 / SCALE_FACTOR));
// canvas_created.setZoom(canvasScale);     
// canvas_created.renderAll();
// }

// fitCanvasToScreen()


// function zoomIn(selector) {
// SCALE_FACTOR = 1.1

// let zoomIn = document.querySelector(selector)
// zoomIn.addEventListener('click', ()=>{
// canvasScale = canvasScale * SCALE_FACTOR;
// canvas_created.setHeight(canvas_created.getHeight() * SCALE_FACTOR);
// canvas_created.setWidth(canvas_created.getWidth() * SCALE_FACTOR);
// canvas_created.setZoom(canvasScale);
// canvas_created.renderAll();
// })

// }
// zoomIn("#zoomIn")

// function zoomOut(selector){
// let zoomOut = document.querySelector(selector)
// SCALE_FACTOR = 1.1

// zoomOut.addEventListener('click', (e)=>{
// canvasScale = canvasScale / SCALE_FACTOR;
// canvas_created.setHeight(canvas_created.getHeight() * (1 / SCALE_FACTOR));
// canvas_created.setWidth(canvas_created.getWidth() * (1 / SCALE_FACTOR));
// canvas_created.setZoom(canvasScale);     
// canvas_created.renderAll();
// })

// }

// zoomOut("#zoomOut")


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

//   let canvasScale = 1;
//     let SCALE_FACTOR;
//     let width = 3510;
//     let height =2490;
//     let fileHandle;
//     let mods = 0;
 
//     let state = []


//     const canvas = (width, height) => {
//     let c = document.createElement("canvas")
//     c.id = "canvas"
//     document.querySelector('#canvas-background').appendChild(c)
//     return new fabric.Canvas("canvas", {
//     width : width,
//     height :height,
//     backgroundColor:"#fff",
//     preserveObjectStacking:true,
//     })
//     }

//    let canvas_created = canvas(width, height)
//     let canvasInit = new Canvas({
//         canvas: canvas_created,
//         width: width,
//         height: height,
//         canvasScale: canvasScale,
//         SCALE_FACTOR:SCALE_FACTOR,
//         fileHandle: fileHandle,
//         mods: mods,
//         state: state
//     })
//     canvasInit.create_main_canvas()
// function fitCanvasToScreen(){
//     // this.canvasScale = 1; 
//     if(width >= 3000){
//     SCALE_FACTOR =5.2;
//     }
//     else if(width <= 2999 && width >= 2000){
//     SCALE_FACTOR= 2.8;
//     }
//     else if(width <= 1999 && width >= 1000){
//        SCALE_FACTOR= 2.1;
//     }
//     else{
//     SCALE_FACTOR= 1.1;
//     }
//     canvasScale = canvasScale / SCALE_FACTOR;
//     canvas_created.setHeight(height * (1 / SCALE_FACTOR));
//     canvas_created.setWidth(width * (1 / SCALE_FACTOR));
//     canvas_created.setZoom(canvasScale);     
//     canvas_created.renderAll();
//   }

//   fitCanvasToScreen()


//  function zoomIn(selector) {
//     SCALE_FACTOR = 1.1

//     let zoomIn = document.querySelector(selector)
//     zoomIn.addEventListener('click', ()=>{
//     canvasScale = canvasScale * SCALE_FACTOR;
//     canvas_created.setHeight(canvas_created.getHeight() * SCALE_FACTOR);
//     canvas_created.setWidth(canvas_created.getWidth() * SCALE_FACTOR);
//     canvas_created.setZoom(canvasScale);
//     canvas_created.renderAll();
//     })

//     }
// zoomIn("#zoomIn")
    
//      function zoomOut(selector){
//     let zoomOut = document.querySelector(selector)
//     SCALE_FACTOR = 1.1

//     zoomOut.addEventListener('click', (e)=>{
//     canvasScale = canvasScale / SCALE_FACTOR;
//     canvas_created.setHeight(canvas_created.getHeight() * (1 / SCALE_FACTOR));
//     canvas_created.setWidth(canvas_created.getWidth() * (1 / SCALE_FACTOR));
//     canvas_created.setZoom(canvasScale);     
//     canvas_created.renderAll();
//     })

//     }

// zoomOut("#zoomOut")

//=============================================================================//




// window.addEventListener('paste', (e)=>{
// var items= e.clipboardData.items;
// // console.log( items[1])

// let imageData = items[1].getAsFile()
// let reader = new FileReader();
// reader.readAsDataURL(imageData)

// reader.onload = () => {

// fabric.Image.fromURL(reader.result, (img)=>{
// img.name = img.type
// img.id = this.uniqueId()
// this.adding_object_style(img)
// })

// };
// })






    //================================== end ==============================//


