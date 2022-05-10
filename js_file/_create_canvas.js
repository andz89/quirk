// import {Modal} from "./gwill.js";




// export class Create_canvas_form{
// //===========create and select size of canvas modal===========//

// create_canvas_modal(){
//   let createCanvasModal = new Modal('#createCanvasModal', {
//     backgroundColor: 'rgba(51, 51, 51, 0.705)',
//     width:'480px',
//     height:'320px',
//     title: 'Create Canvas',
//     showButton:'#showCreateCanvasModalBtn',
//     modalHeaderColor:'teal',
//     windowClickClose: false,
//     modalContentBackgroundColor:'#fff',
//     })

//     createCanvasModal.bodyContent(this.create_canvas_form_element(),()=>{
//     //custom close button
//     document.querySelector('#createCanvasBtn').onclick = ()=>{
//     document.querySelector('#createCanvasModal').style.display = 'none';


//     //================create the main canvas in modal================//
  
//     let canvasScale = 1;
//     let SCALE_FACTOR = 1.1;
//     let width = document.querySelector('#canvas_width').value
//     let height = document.querySelector('#canvas_height').value
//     let fileName = document.querySelector('#project_name').value

//       if(fileName){
//       document.querySelector('#file_name').innerHTML = fileName
//       }else{
//       document.querySelector('#file_name').innerHTML = 'untitled'
//       }

      
//     let fileHandle;
//     const canvas = (width, height) => {
//     let c = document.createElement("canvas")
//     c.id = "canvas"
//     document.querySelector('#canvas-background').appendChild(c)
//     return new fabric.Canvas("canvas", {
//      width : width,
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
//         fileHandle: fileHandle
//     })
//     canvasInit.create_main_canvas()


// function fitCanvasToScreen(){
// // this.canvasScale = 1; 
// if(width >= 3000){
// SCALE_FACTOR =5.2;
// }
// else if(width <= 2999 && width >= 2000){
// SCALE_FACTOR= 2.8;
// }
// else if(width <= 1999 && width >= 1000){
//     SCALE_FACTOR= 2.1;
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


//     }


//     })
// }
  
    

// create_canvas_form_element(){
//      return      `
//     <div class="createCanvasFormModal">
//     <div>
//     <label for="project_name">Project Name</label>
//     <input type="text"  id="project_name" autoComplete ="off">
//     </div>
//     <div>
//     <label for="canvas_width">Width</label>
//     <input type="number"  id="canvas_width" value="1200" autoComplete ="off">
//     </div>

//     <div>
//     <label for="canvas_height">Height</label>
//     <input type="number" value="800" id="canvas_height">
//     </div>
//     <div>
//     <button id="createCanvasBtn" class="btn btn-primary">Create</button>
//     </div>
//     </div>
//     `
//     }
   
// }



