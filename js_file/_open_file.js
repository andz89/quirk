import {Canvas} from "./canvas.js";


export class Open_file{


  get_file_json(){

  document.querySelector('#open_file').addEventListener('click', async function(){
  let [fileHandle] = await window.showOpenFilePicker({
  types: [{
  description: 'Text documents',
  accept: {
  'text/json': ['.json'],
  },
  }],
  excludeAcceptAllOption: true,
  });

  let fileData = await fileHandle.getFile();

  let text = await fileData.text()
  let fileName = fileData.name
 
  let canvas_saved =  await JSON.parse(text)

run_json_file(canvas_saved, fileHandle, fileName)
document.querySelector('.open_and_create_project').style.display = 'none';
})

window.addEventListener('dragover', (e)=>{
 e = e || window.event;
e.preventDefault()
},false)
window.addEventListener('drop', (e)=>{
 e = e || window.event;
e.preventDefault()
},false)
        document.querySelectorAll(".drop-zone__input_json").forEach((inputElement) => {
  const dropZoneElement = inputElement.closest(".drop-zone__input_json_container");

  
    dropZoneElement.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZoneElement.classList.add("drop-zone--over");
    });

    ["dragleave", "dragend"].forEach((type) => {
    dropZoneElement.addEventListener(type, (e) => {
    dropZoneElement.classList.remove("drop-zone--over");
    });
    });

  dropZoneElement.addEventListener("drop", (e) => {
    e.preventDefault();
  
       let file = e.dataTransfer.files
  
    if(file[0].type === 'application/json' ){

    let first_file = file[0];
    let reader = new FileReader();
    reader.readAsText(first_file)
    let fileName =  first_file.name;
    let fileHandle = null;
    reader.onload = () => {
    let canvas_saved =  JSON.parse(reader.result)

    run_json_file(canvas_saved, fileHandle, fileName)
    document.querySelector('.open_and_create_project').style.display = 'none';
            
        };
        
      }else{
    dropZoneElement.classList.remove("drop-zone--over");

        return false;
      }

    dropZoneElement.classList.remove("drop-zone--over");
  }); 

    })



const  run_json_file = (canvas_saved, fileHandle, fileName)=>{


  let canvasScale = 1;
  let SCALE_FACTOR = 1.1;
  let width =  canvas_saved.size.w;
  let height = canvas_saved.size.h;

document.querySelector('#file_name').innerHTML = fileName.replace('.json', '')  //file name
 
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

canvas_created.loadFromJSON(canvas_saved.json);
let obj = canvas_created.getObjects();
 obj.forEach((each)=>{
  if(each.type === 'textbox'){
    return false;
  }
  each.perPixelTargetFind = true;
  canvas_created.renderAll()
 })
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

 


}

}


    // const dropZoneElement = document.querySelector(".drop-zone__input_json").closest(".canvas-container");
    // dropZoneElement.addEventListener("drop", (e) => {
    // e.preventDefault();
    //    let file = e.dataTransfer.files
    //   if(file[0].type == 'application/json' ){
 
          
    //   }else{
    //     return false;
    //   }
    
 
    
      

    // })