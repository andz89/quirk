import {Modification} from "./_modification.js";

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

    const file = await fileHandle.getFile();
    const arrayBuffer = await file.arrayBuffer();
    const arrayBufferView = new Uint8Array(arrayBuffer);
    const blob = new Blob([arrayBufferView], { type: file });
    const urlCreator = window.URL || window.webkitURL;
    const mediaUrl =  urlCreator.createObjectURL(blob);


    //========= display modal with uploaded image ===========//
    let imageElement = document.createElement('img')
    imageElement.id = 'image';
    imageElement.src = mediaUrl
    document.querySelector(".modal-content-cropper").appendChild(imageElement)
    document.querySelector(".modal-cropper").style.display = "block"
    let cropper = new Cropper(imageElement);

    
    this.crop_image(cropper)
    this.crop_canceled(cropper, imageElement)

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

    let json = this.canvas.toJSON(['borderColor','cornerColor','cornerSize','cornerStyle','transparentCorners',
    "lockMovementX","lockMovementY","lockScalingX","lockScalingY","selectable","textAlign","fontFamily", "id", "name","clipPath", "absolutePositioned", "clip_id","clip_target"])


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
        console.log('andz')
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
    



   

   
    
    


}