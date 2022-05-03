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
    const arrayBuffer = await file.arrayBuffer();
    const arrayBufferView = new Uint8Array(arrayBuffer);
    const blob = new Blob([arrayBufferView], { type: file });
    const urlCreator = window.URL || window.webkitURL;
    const mediaUrl =  urlCreator.createObjectURL(blob);
    let new_image_element = document.createElement('img')
     new_image_element.src = mediaUrl;
     document.querySelector('body').appendChild(new_image_element)
     new_image_element.style.display = 'none';
    setTimeout(()=>{
        let dataURL =   this.getDataUrl(new_image_element)
        fabric.Image.fromURL(dataURL, (img)=>{
        img.name = img.type
      
        this.adding_object_style(img)
        new_image_element.remove()
         this.loaderHide()
    })
    
    }, 100);

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

        document.querySelector('#clip').addEventListener('click', ()=>{
        let object = this.canvas.getActiveObject();
     
        let image_to_clip;
        object.clip_image_src_org;
        if(object.clip_image_src_org == null){
        image_to_clip = object._originalElement.currentSrc
        }else{
        image_to_clip = object.clip_image_src_org
        }
  
        let width = 500
        let height =500

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
        clipPath: new fabric.Circle({ radius: 250 , top: 500 / 2, left: 500 / 2,   originX:"center", originY:"center" ,absolutePositioned: true})
        })
        }
        let canvas_created = canvas(width, height)
      

       fabric.Image.fromURL(image_to_clip, (img)=>{


          objectStyle(img)
            objectSizeOnCanvas(img, width, height)
            canvas_created.viewportCenterObject(img)
            canvas_created.add(img)
            canvas_created.sendToBack(img)

            canvas_created.renderAll()
        })
          


        var circle = new fabric.Circle({
            radius: 250, 
            fill: null,
            stroke:'#333',
            strokeWidth:20,
            lockMovementX: true,
            lockMovementY: true,
            lockScalingX: true,
            lockScalingY: true,
            lockRotation: true,
            selectable: false,
            originY:"center",
            originX:"center",
        });
        objectStyle(circle)
        canvas_created.viewportCenterObject(circle)

        canvas_created.add(circle)
        // canvas_created.bringToFront(circle)

        canvas_created.renderAll()


        

        document.querySelector('#clip-save').onclick = () => {
            let clip_image_url = canvas_created.toDataURL('png')
      
            fabric.Image.fromURL(clip_image_url, (img)=>{

            img.clip_image_src_org = image_to_clip

            img.left = object.left;
            img.top = object.top
       
            this.objectSizeOnCanvas(img)
            this.canvas.add(img);
            this.canvas.renderAll()
            this.canvas.remove(this.canvas.getActiveObject());
            canvas_created.clear()
            document.querySelector('.modal-clip-content').innerHTML = ''
            document.querySelector('#modal-clip').style.display = "none"
            })
         
        }
        document.querySelector('#clip-cancel').onclick = () =>{
        canvas_created.clear()
        document.querySelector('.modal-clip-content').innerHTML = ''
        document.querySelector('#modal-clip').style.display = "none"
        }

        document.querySelector('#clip-stroke-size').oninput = (e) =>{
          
        circle.strokeWidth = parseInt(e.target.value) 
        circle.dirty = true
        circle.objectCaching = false,
        canvas_created.renderAll()

        }

        document.querySelector('#clip-stroke-color').oninput = (e) =>{
        circle.stroke = e.target.value;
        circle.objectCaching = false,
        circle.dirty = true;
        canvas_created.renderAll()
        }
         document.querySelector('#clip-background-color').oninput = (e) =>{
        canvas_created.backgroundColor = e.target.value
        canvas_created.renderAll()
        }

       
        })

      


    }







    log(){
        document.querySelector('#log').addEventListener('click', ()=>{
            let object = this.canvas.getActiveObject()

        console.log(object)

        })
    }

    position(){
        document.querySelector('#position').onclick = ()=>{
        let object = this.canvas.getActiveObject()
        object.clipPath.absolutePositioned = true;
        this.canvas.renderAll()
        }
    
    }

    crop_test(){
         document.querySelector('#crop_test').onclick = ()=>{
            let objects = this.canvas.getActiveObjects();
            let image = objects[0]
            let shape = objects[1]
            shape.width = shape.width + 10
            this.canvas.renderAll()
            console.log(image.width)
            console.log(image.getScaledWidth())

            console.log(shape.width)

            console.log('scaledWith' + shape.getScaledWidth())

            image =  image._originalElement

           const img = new  fabric.Image(image, {
                width: shape.getScaledWidth() - 70,//ang kalaparan sa horizontal
                cropX:0,//asa mag sugod ang crop sa horizontal
            })
             console.log(shape.getScaledWidth())
            //   this.objectSizeOnCanvas(img)
            console.log(img.width)
            this.canvas.add(img)

         }
    }
}