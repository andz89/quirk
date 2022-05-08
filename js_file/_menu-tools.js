import {Modification} from "./_modification.js";

export class Menu_tools extends Modification{


    //textbox
    insertText(selector){
      let insert_text = document.querySelector(selector)
      insert_text.addEventListener('click', ()=>{
            let object = new fabric.Textbox('Your Text Here')

    object.set("textAlign","center")
    object.set("fontSize",12)

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
    object.id = this.uniqueId()
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
            img.id = this.uniqueId()
        this.adding_object_style(img)
    
        this.loaderHide()
        })

        };
    })
    
}   

  dragAndDrop_image(){
       const dropZoneElement = document.querySelector(".drop-zone__input").closest(".canvas-container");

    dropZoneElement.addEventListener("drop", (e) => {
    e.preventDefault();
       let file = e.dataTransfer.files

  
       Array.from(file).forEach((e)=>{

           let reader = new FileReader();
        reader.readAsDataURL(e)

        reader.onload = () => {
    
        fabric.Image.fromURL(reader.result, (img)=>{
        img.name = img.type
        img.id = this.uniqueId()
        this.adding_object_style(img)
        })

        };
       })
 
    
      

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
          
            
    

    let json = this.canvas.toJSON([ 'borderColor','cornerColor','cornerSize','cornerStyle','transparentCorners',
    "lockMovementX","lockMovementY","lockScalingX","lockScalingY","selectable","textAlign","fontFamily", "id", "name",'clip_image_src_org',"orig_url"])


    var size = {w:this.width, h:this.height};
    let merge ={json,size}
    if(this.fileHandle == undefined){

        let suggest_name = document.querySelector('#file_name').innerHTML

        this.fileHandle = await window.showSaveFilePicker({
        startIn: 'desktop',
        suggestedName: `${suggest_name}.json`,
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
    document.querySelector('#file_name').innerHTML = this.fileHandle.name.replace('.json', ' ')
   
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


    this.canvas.setBackgroundColor(null)
    this.canvas.renderAll()


    }
    }

    bringToFront_object(){

    let bringToFront  =   document.querySelector('#bringToFront_object')
    bringToFront.onclick = (e)=>{

    let object = this.canvas.getActiveObject();

    this.canvas.bringForward(object)

    }
    }
    bringToBack_object(){
    let bringToBack  =   document.querySelector('#bringToBack_object')
    bringToBack.onclick = (e)=>{
    let object = this.canvas.getActiveObject();
    this.canvas.sendBackwards(object)
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
          class Clip{
          static     objectSizeOnCanvas(object, width, height){
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

          static  objectStyle(object){
          object.set("borderColor","#333");
          object.set("cornerColor","#17a2b8");
          object.set("cornerSize",15);
          object.set("cornerStyle","circle");
          object.set("transparentCorners",false);
          object.set("lockUniScaling",true);
          }

          }
        

        document.querySelector('#clip_circle').addEventListener('click', ()=>{
        let object = this.canvas.getActiveObject();

        let shape_object =  new fabric.Circle({radius: 250, fill: null,stroke:'#333',strokeWidth:20,lockMovementX: true,lockMovementY: true,lockScalingX: true,lockScalingY: true,lockRotation: true,selectable: false,originY:"center",originX:"center",
        });

        let clipPath =  new fabric.Circle({ radius: 250 , top: 500 / 2, left: 500 / 2,   originX:"center", originY:"center" ,absolutePositioned: true})
        if(object === undefined){return false}//to check if object is selected
        if(object.lockMovementX == true && object.lockMovementY == true){ return false}

        clip_circle(object, clipPath, shape_object)
        })


        document.querySelector('#clip_square').addEventListener('click', ()=>{
        let object = this.canvas.getActiveObject();

        let shape_object =  new fabric.Rect({width: 500,height: 500, fill: null,stroke:'#333',strokeWidth:20,lockMovementX: true,lockMovementY: true,lockScalingX: true,lockScalingY: true,lockRotation: true,selectable: false,originY:"center",originX:"center",
        });

        let clipPath =  new fabric.Rect({ width: 500,height: 500, top: 500 / 2, left: 500 / 2,   originX:"center", originY:"center" ,absolutePositioned: true})
        if(object === undefined){return false}//to check if object is selected
        if(object.lockMovementX == true && object.lockMovementY == true){ return false}

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
        Clip.objectStyle(img)
          canvas_clip.add(img)
          canvas_clip.sendToBack(img)
          canvas_clip.renderAll()
        }else{
        Clip.objectStyle(img)
        Clip.objectSizeOnCanvas(img, width, height)
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
    img.name = object.type
    img.id = this.uniqueId()
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




    horizontal_object(){
      document.querySelector('#horizontal').onclick = () =>{
    if(this.canvas.getActiveObject().type === 'activeSelection'){
    let obj = this.canvas.getActiveObject().toGroup()
    this.canvas.viewportCenterObjectH(obj)

    let selected_objects = this.canvas.getActiveObject().toActiveSelection();
    selected_objects.set("borderColor","#333");
    selected_objects.set("cornerColor","#17a2b8");
    selected_objects.set("cornerSize",15);
    selected_objects.set("cornerStyle","circle");
    selected_objects.set("transparentCorners",false);
    selected_objects.set("lockUniScaling",true);

    this.canvas.renderAll();
    }else{
    let object = this.canvas.getActiveObject();
    this.canvas.viewportCenterObjectH(object)
    this.canvas.setActiveObject(object)
    }
  

    }

    }

    vertical_object(){
      document.querySelector('#vertical').onclick = ()=>{
      if(this.canvas.getActiveObject().type === 'activeSelection'){
      let obj = this.canvas.getActiveObject().toGroup()
      this.canvas.viewportCenterObjectV(obj)
    let selected_objects = this.canvas.getActiveObject().toActiveSelection();
    selected_objects.set("borderColor","#333");
    selected_objects.set("cornerColor","#17a2b8");
    selected_objects.set("cornerSize",15);
    selected_objects.set("cornerStyle","circle");
    selected_objects.set("transparentCorners",false);
    selected_objects.set("lockUniScaling",true);

      this.canvas.renderAll();
      }else{
      let object = this.canvas.getActiveObject();
      this.canvas.viewportCenterObjectV(object)
      this.canvas.setActiveObject(object)
      }
      }
 

    }
  center_object(){
    document.querySelector('#center').onclick = () =>{
    if(this.canvas.getActiveObject().type === 'activeSelection'){
    let obj = this.canvas.getActiveObject().toGroup()
    this.canvas.viewportCenterObject(obj)
  let selected_objects = this.canvas.getActiveObject().toActiveSelection();
    this.groupObjectStyle(selected_objects)


    this.canvas.renderAll();

    }else{
    let object = this.canvas.getActiveObject();  
    this.canvas.viewportCenterObject(object)

    this.canvas.setActiveObject(object)

    }
    }

}

align_left(){
  let align_left = document.querySelector('#align_left')
  align_left.onclick = ()=> {
  let object =  this.canvas.getActiveObjects()

  let group_objects =  this.canvas.getActiveObject().toGroup()

  var groupWidth = group_objects.width

  object.forEach((obj)=> {

  obj.set({
  left: -(groupWidth / 2),
  originX: 'left'
  });


  });
  let each_object = this.canvas.getActiveObject().toActiveSelection();
  this.groupObjectStyle(each_object)
  this.canvas.renderAll();
  };


}
align_center(){
  let align_center = document.querySelector('#align_center')
  align_center.onclick = ()=> {
  let object =  this.canvas.getActiveObjects()

  let group_objects =  this.canvas.getActiveObject().toGroup()

  var groupWidth = group_objects.width

  object.forEach((obj)=> {

var itemWidth = obj.getBoundingRect().width;
obj.set({
left: (0 - itemWidth/2),
originX: 'left'
  });


  });
  let each_object = this.canvas.getActiveObject().toActiveSelection();
  this.groupObjectStyle(each_object)
  this.canvas.renderAll();
  };


}

align_right(){
  let align_right = document.querySelector('#align-right')
  align_right.onclick = ()=> {
  let object =  this.canvas.getActiveObjects()

  let group_objects =  this.canvas.getActiveObject().toGroup()

  var groupWidth = group_objects.width

object.forEach((obj)=> {
var itemWidth = obj.getBoundingRect().width;
obj.set({
left: (groupWidth/2 - itemWidth/2),
originX: 'center'
});
});

  let each_object = this.canvas.getActiveObject().toActiveSelection();
  this.groupObjectStyle(each_object)
  this.canvas.renderAll();
  };


}

align_top(){
  document.querySelector('#align-top').onclick = () =>{
  let object =  this.canvas.getActiveObjects()
  let group_objects =  this.canvas.getActiveObject().toGroup()
  var groupHeight = group_objects.height

  object.forEach((obj)=> {
  obj.set({
  top:(0 - groupHeight / 2),
  originY: 'top'
  });
  });

  let each_object = this.canvas.getActiveObject().toActiveSelection();
  this.groupObjectStyle(each_object)
  this.canvas.renderAll();
  }

}
align_middle(){

    document.querySelector('#align-middle').onclick = () =>{

    let object =  this.canvas.getActiveObjects();
   
    object.forEach((obj)=> {

    let  itemHeight = obj.getBoundingRect().height;

    obj.set({
    top:(0 - itemHeight/2),
    originY: 'top',
    });
    });

   
    this.canvas.renderAll();
    
    }

}
align_bottom(){
  
    document.querySelector('#align-bottom').onclick = () =>{
    let object =  this.canvas.getActiveObjects();
      let group_objects =  this.canvas.getActiveObject().toGroup()
    var groupHeight = group_objects.height

    object.forEach((obj)=> {
    var itemHeight = obj.getBoundingRect().height;
    obj.set({
    top:(groupHeight/2 - itemHeight/2),
    originY: 'center',
    });


    });
    let each_object = this.canvas.getActiveObject().toActiveSelection();
    this.groupObjectStyle(each_object);
    this.canvas.renderAll();
  }

}


}