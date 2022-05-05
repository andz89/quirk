import {Modification} from "./_modification.js";
import {Canvas} from "./canvas.js";
export class Menu_tools extends Modification{


    //textbox
    insertText(selector){
      let insert_text = document.querySelector(selector)
      insert_text.addEventListener('click', ()=>{
            let object = new fabric.Textbox('Your Text Here')

    object.set("textAlign","center")
    object.set("fontSize",12)
    object.width = 100
    // object.perPixelTargetFind = true;
    object.setControlsVisibility({
    // mt: false, // middle top disable
    // mb: false, // midle bottom
    // ml: true, // middle left
    // mr: true, // middle right
    // tl: false, // top left
    // tr: false, // top right
    // bl: false, // bottom left
    // br: false // bottom right
    });
    object.name = object.type
     object.dirty = true
    this.adding_object_style(object)

  // this.canvas.renderAll()
      })
      

    }


   uploadImageLocalFile(selector){

    document.querySelector(selector).addEventListener('click',  async ()=>{
        const [fileHandle] = await window.showOpenFilePicker({
    types: [{
    description: 'Images',
    accept: {
    "image/jpeg": [".jpg", ".jpeg"],
    "image/png": [".png"],
    "image/svg+xml": [".svg"],
    }
    }],
    })
    this.loaderShow()
    const file = await fileHandle.getFile();
  
        let reader = new FileReader();
        reader.readAsDataURL(file)

        reader.onload = () => {
        fabric.Image.fromURL(reader.result, (img)=>{
        img.name = img.type

        this.adding_object_style(img)
    
        this.loaderHide()
        })

        };
    })
    
}   


    insert_shape(selector, cb){
    let element = document.querySelector(selector)
    element.onclick = ()=>{
    cb()
    }
    }

  
async save_file_json(){
     
      document.getElementById('save_json').addEventListener('click', async ()=>{
          
            
      let display_name = `test_101`

    let json = this.canvas.toJSON([ 'clip_image_src_org','borderColor','cornerColor','cornerSize','cornerStyle','transparentCorners',
    "lockMovementX","lockMovementY","lockScalingX","lockScalingY","selectable","textAlign","fontFamily","orig_url", "id", "name","clipPath", "absolutePositioned"])
console.log(json)

    var size = {w:this.width, h:this.height,  f:display_name };
    let merge ={json,size}
    if(this.fileHandle == undefined){

        let display_name = `test_102`

        this.fileHandle = await window.showSaveFilePicker({
        startIn: 'desktop',
        suggestedName: `${display_name}.json`,
        types: [{
        description: 'Text documents',
        accept: {
        'text/plain': ['.json'],
        },
        }],

        });

    let stream =  await this.fileHandle.createWritable();
    await stream.write(JSON.stringify(merge))
    await stream.close();
        
    }else{

    let stream =  await this.fileHandle.createWritable();
    await stream.write(JSON.stringify(merge))
    await stream.close();
        
    }
      
    })


    }

    canvasBackgroundColor(){

    let canvasBackground = document.querySelector('#canvas_background')
    canvasBackground.oninput = (e)=>{


    this.canvas.setBackgroundColor(e.target.value)
    this.canvas.renderAll()
    }
    let transparent = document.querySelector('#transparent')
    transparent.onclick = ()=>{
    console.log('tr')

    this.canvas.setBackgroundColor(null)
    this.canvas.renderAll()


    }
    }

    bringToFront_object(){

    let bringToFront  =   document.querySelector('#bringToFront_object')
    bringToFront.onclick = (e)=>{

    let object = this.canvas.getActiveObject();

    this.canvas.bringToFront(object)

    }
    }
    bringToBack_object(){
    let bringToBack  =   document.querySelector('#bringToBack_object')
    bringToBack.onclick = (e)=>{
    let object = this.canvas.getActiveObject();
    this.canvas.sendToBack(object)
    }
    }


    crop_image_init(){
    document.querySelector('#crop_init').addEventListener('click', ()=>{

    let image = this.canvas.getActiveObject()
    if(image.type !== 'image'){return false;}
    this.loaderShow()
    let top = image.top;
    let left = image.left;

    let crop_image_element =   document.createElement('img')

    if(image.orig_url === undefined){
    crop_image_element.src = image._originalElement.currentSrc;

        // let reader = new FileReader();
        // reader.readAsDataURL(image)

        // reader.onload = () => {

        //     console.log(reader.result);
        // }

    document.querySelector(".modal-content-cropper").appendChild(crop_image_element)
    setTimeout(() => {
    document.querySelector(".modal-cropper").style.visibility = "visible"
    this.loaderHide()

    })



    let cropper = new Cropper(crop_image_element);

    this.crop_image(cropper, image._originalElement.currentSrc,  top, left)
    this.crop_canceled()
    }else{

    crop_image_element.src = image.orig_url;

    document.querySelector(".modal-content-cropper").appendChild(crop_image_element)

    let cropper = new Cropper(crop_image_element);


    setTimeout(() => {
    document.querySelector(".modal-cropper").style.visibility = "visible"

    cropper.setCropBoxData(image.cropBoxData)
    this.loaderHide()
    }, 1000);

    this.crop_image(cropper, image.orig_url, top, left)
    this.crop_canceled()
    }


    })

    }

   
   
    clip(){
             
          function objectSizeOnCanvas(object, width, height){
            if(width > 3000){
            object.scaleToWidth(700);
            }else if(height > 2000){

            object.scaleToWidth(450);
            }
            else if(height == 800 && width == 400){
            object.scaleToWidth(200);
            }
            else{
            object.scaleToWidth(250);
            }
           
            } 

            function objectStyle(object){
            object.set("borderColor","#333");
            object.set("cornerColor","#17a2b8");
            object.set("cornerSize",15);
            object.set("cornerStyle","circle");
            object.set("transparentCorners",false);
            object.set("lockUniScaling",true);
            }

        document.querySelector('#clip_circle').addEventListener('click', ()=>{
        let object = this.canvas.getActiveObject();

        let shape_object =  new fabric.Circle({radius: 250, fill: null,stroke:'#333',strokeWidth:20,lockMovementX: true,lockMovementY: true,lockScalingX: true,lockScalingY: true,lockRotation: true,selectable: false,originY:"center",originX:"center",
        });

        let clipPath =  new fabric.Circle({ radius: 250 , top: 500 / 2, left: 500 / 2,   originX:"center", originY:"center" ,absolutePositioned: true})
        if(object === undefined){return false}//to check if object is selected
        clip_circle(object, clipPath, shape_object)
        })


        document.querySelector('#clip_square').addEventListener('click', ()=>{
        let object = this.canvas.getActiveObject();

        let shape_object =  new fabric.Rect({width: 500,height: 500, fill: null,stroke:'#333',strokeWidth:20,lockMovementX: true,lockMovementY: true,lockScalingX: true,lockScalingY: true,lockRotation: true,selectable: false,originY:"center",originX:"center",
        });

        let clipPath =  new fabric.Rect({ width: 500,height: 500, top: 500 / 2, left: 500 / 2,   originX:"center", originY:"center" ,absolutePositioned: true})
        if(object === undefined){return false}//to check if object is selected

        clip_circle(object, clipPath, shape_object)

        })


      const clip_circle = (object, clipPath, shape_object)=>{
            

        let image_to_clip;

        //checking if image is new in clip
        if(object.clip_image_src_org == null){
        image_to_clip = object._originalElement.currentSrc;
        }else{
        image_to_clip = object.clip_image_src_org;
        }
  
        let width = 500;
        let height = 500;

        //function to create canvas
        const canvas = (width, height) => {
        let c = document.createElement("canvas")
        c.id = "canvas_2"
        document.querySelector('.modal-clip-content').appendChild(c)
        document.querySelector('#modal-clip').style.display = "flex"

        return new fabric.Canvas("canvas_2", {
        width : width,
        height :height,
        backgroundColor:"#fff",
        preserveObjectStacking:true,
        perPixelTargetFind:true, 
        clipPath: clipPath
        })
        }

        //init and create canvas
        let   canvas_clip = canvas(width, height)
       
        //to check if naa naka save na canvas background color
        if(object.clip_image_src_org != null){
            canvas_clip.backgroundColor = object.canvas_backgroundColor
        }

        //create image from image selected
        fabric.Image.fromURL(image_to_clip, (img)=>{
            //to check if naa naka save na properties 'example: scaleY....' sa image
        if(object.clip_image_src_org != null) {
        img.scaleX = object.image_value_in_canvas.scaleX;
        img.scaleY = object.image_value_in_canvas.scaleY;
        img.top = object.image_value_in_canvas.top;
        img.left = object.image_value_in_canvas.left;
        objectStyle(img)
          canvas_clip.add(img)
          canvas_clip.sendToBack(img)
          canvas_clip.renderAll()
        }else{
        objectStyle(img)
        objectSizeOnCanvas(img, width, height)
          canvas_clip.viewportCenterObject(img)
          canvas_clip.add(img)
          canvas_clip.sendToBack(img)
          canvas_clip.renderAll()
        }
   
        })
          
    
        //to check if naa naka save na properties 'example: stroke....' sa shape
        let shape = shape_object
        if(object.clip_image_src_org != null) {
        shape.stroke = object.shape_value_in_canvas.stroke;
        shape.strokeWidth = object.shape_value_in_canvas.strokeWidth;
        canvas_clip.viewportCenterObject(shape)
        canvas_clip.add(shape)
        canvas_clip.renderAll()
        }else{
          canvas_clip.viewportCenterObject(shape)
          canvas_clip.add(shape)
          canvas_clip.renderAll()
        }

     

    //save or create new image and export to canvas
        document.querySelector('#clip-save').onclick = () => {
    
    let objects_properties_in_canvas = canvas_clip.getObjects()

   
    let shape_value_in_canvas = {}
    let image_value_in_canvas = {}
    let canvas_backgroundColor =    canvas_clip.backgroundColor

    objects_properties_in_canvas.forEach((obj)=>{
    if(obj.type === "circle"){
    shape_value_in_canvas.scaleX = obj.scaleX;
    shape_value_in_canvas.scaleY = obj.scaleY;
    shape_value_in_canvas.strokeWidth = obj.strokeWidth;
    shape_value_in_canvas.stroke = obj.stroke;
    }
     if(obj.type === "rect"){
    shape_value_in_canvas.scaleX = obj.scaleX;
    shape_value_in_canvas.scaleY = obj.scaleY;
    shape_value_in_canvas.strokeWidth = obj.strokeWidth;
    shape_value_in_canvas.stroke = obj.stroke;
    }
    if(obj.type === 'image'){
    image_value_in_canvas.scaleX = obj.scaleX;
    image_value_in_canvas.scaleY = obj.scaleY;
    image_value_in_canvas.top = obj.top;
    image_value_in_canvas.left = obj.left;
    }

    })

    let clip_image_url =   canvas_clip.toDataURL('png')
    fabric.Image.fromURL(clip_image_url, (img)=>{

    img.clip_image_src_org = image_to_clip
    img.shape_value_in_canvas = shape_value_in_canvas
    img.image_value_in_canvas = image_value_in_canvas
    img.canvas_backgroundColor = canvas_backgroundColor
    img.left = object.left;
    img.top = object.top

    this.objectSizeOnCanvas(img)
    this.canvas.add(img);
    this.canvas.renderAll()
    this.canvas.remove(this.canvas.getActiveObject());
    canvas_clip.clear()
    document.querySelector('.modal-clip-content').innerHTML = ''
    document.querySelector('#modal-clip').style.display = "none"
    })
         
    }

    document.querySelector('#clip-cancel').onclick = () =>{
    canvas_clip.clear()
    document.querySelector('.modal-clip-content').innerHTML = ''
    document.querySelector('#modal-clip').style.display = "none"
    }

    document.querySelector('#clip-stroke-size').oninput = (e) =>{

    shape.strokeWidth = parseInt(e.target.value) 
    shape.dirty = true
    shape.objectCaching = false,
    canvas_clip.renderAll()

    }

    document.querySelector('#clip-stroke-color').oninput = (e) =>{
    shape.stroke = e.target.value;
    shape.objectCaching = false,
    shape.dirty = true;
    canvas_clip.renderAll()
    }
    document.querySelector('#clip-background-color').oninput = (e) =>{
    canvas_clip.backgroundColor = e.target.value
    canvas_clip.renderAll()
    }
            }

    }


}