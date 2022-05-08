

export class Modification{

    constructor(property) {
      
        this.canvas = property.canvas
        this.canvasScale = property.canvasScale;
        this.SCALE_FACTOR = property.SCALE_FACTOR;
        this.fileHandle = property.fileHandle;
        this.width = property.width;
        this.height = property.height;

    }

    objectSizeOnCanvas(object) {
    if(this.width > 3000){
    object.scaleToWidth(700);
    }else if(this.height > 2000){

    object.scaleToWidth(450);
    }
    else if(this.height == 800 && this.width == 400){
    object.scaleToWidth(200);
    }
    else{
    object.scaleToWidth(250);
    }
    // object.originX ="center"
    // object.originY ="center"
    }  




 

    getDataUrl(img){
      // Create canvas
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      // Set width and height
      canvas.width = img.width;
      canvas.height = img.height;
      // Draw the image
      ctx.drawImage(img, 0, 0);
      return  canvas.toDataURL();
      }

    crop_image( cropper, image_original_url, top, left){

      let crop_image = document.querySelector('#crop-image')
      crop_image.onclick = ()=>{
        this.loaderShow()
        setTimeout(()=>{
             document.querySelector(".modal-cropper").style.visibility = "hidden"
      let img = cropper.getCroppedCanvas();

      let crop_size = cropper.getCropBoxData()
      console.log(cropper.getCropBoxData())
      let dataURL =   this.getDataUrl(img)
      fabric.Image.fromURL(dataURL, (img)=>{

      img.name = img.type
      img.orig_url = image_original_url
      img.cropBoxData = crop_size
      img.left = left;
      img.top = top
      img.id = this.uniqueId()
      this.objectSizeOnCanvas(img)
      this.canvas.add(img);
      this.canvas.renderAll()
      this.canvas.remove(this.canvas.getActiveObject());
        this.loaderHide()
      });

      cropper.destroy();
      cropper.clear()
      cropper = null;
      document.querySelector(".modal-content-cropper").innerHTML = ""
        },100)
     

      }
      }

       crop_canceled(){
      let crop_cancel = document.querySelector('#crop-cancel')
      crop_cancel.onclick = ()=>{
        document.querySelector(".modal-cropper").style.visibility = "hidden"



      document.querySelector(".modal-content-cropper").innerHTML = ""
      
      }

    

      }



  adding_object_style(object){
  this.canvas.setActiveObject(object);
  this.objectSizeOnCanvas(object)
  this.canvas.viewportCenterObject(object)
  this.canvas.add(object);
  this.canvas.renderAll()
}


        loaderShow(){

        document.querySelector(".modal-loader").classList.add("spinner-1");
        document.querySelector(".modal-loader").style.display = "block";

        }
        loaderHide(){
        document.querySelector(".modal-loader").classList.remove("spinner-1");
        document.querySelector(".modal-loader").style.display = "none";
        }


      groupObjectStyle(object){
      object.set("borderColor","#333");
      object.set("cornerColor","#17a2b8");
      object.set("cornerSize",15);
      object.set("cornerStyle","circle");
      object.set("transparentCorners",false);
      object.set("lockUniScaling",true);
      }

      uniqueId(){
    let d = new Date();
    let dateString =  d.getFullYear().toString() + d.getMonth().toString() + d.getDate().toString() + d.getHours().toString() + d.getSeconds().toString() + d.getMilliseconds().toString()
    let random = Math.floor(Math.random() * 1000000).toString()
    return dateString + random
    }

    display_lockObjects(object) {

  if(object.length > 0){
    
  object.forEach(e=>{
    let li = document.createElement("li");
      li.className = "list_objects"
    li.id = e.id
  li.innerHTML = `
  <input spellcheck = false type="text" id="${e.id}" class="object_name_input" value="${e.name}">  <span class="unlock" style="font-style: italic">unlock </span>
  `

     let lockContainer = document.querySelector('.lock-object-container')

  lockContainer.prepend(li)
  document.querySelector('.object_name_input').disabled = true;

  lockContainer.scrollTop = 0;
  });



  }else{

  let li = document.createElement("li");
  li.className = "list_objects"
  li.id = object.id;
  li.innerHTML = `
  <input spellcheck = false type="text" id="${object.id}" class="object_name_input" value="${object.name}">  <span class="unlock" style="font-style: italic">unlock </span>
  `
  // unlockObject()
  let lockContainer = document.querySelector('.lock-object-container')

  lockContainer.prepend(li)
  document.querySelector('.object_name_input').disabled = true;

  lockContainer.scrollTop = 0;
  // lockName()




  }

    document.querySelector(".lock-object-container").onclick = (e)=>{

      if(e.target.id){
      let objects = this.canvas.getObjects();
      let obj = objects.filter((object)=>{
      return object.id === e.target.id
      })

      this.canvas.setActiveObject(obj[0]);
      this.canvas.renderAll()
      }
      //unlock
      if(e.target.classList.contains('unlock')){
       let parent_id = e.target.parentElement.id
        let objects = this.canvas.getObjects();
      let obj = objects.filter((object)=>{
      return object.id === parent_id
      })

      obj[0].selectable = true;
      obj[0].set("lockMovementX", false)
      obj[0].set("lockMovementY", false)
      obj[0].set("lockScalingX", false)
      obj[0].set("lockScalingY", false)
      obj[0].set("lockRotation", false)
      this.canvas.setActiveObject(obj[0]);
      this.canvas.renderAll()
      e.target.parentElement.remove()
      }


  
  }
   document.querySelector('.lock-object-container').ondblclick = (e) =>{
    if(e.target.classList.contains('object_name_input')){
      e.target.disabled = false
      e.target.focus()
      e.target.addEventListener('blur', (e) =>{
      e.target.disabled = true
 
    let objects = this.canvas.getObjects();
    let obj = objects.filter((object)=>{
    return object.id === e.target.id
    })

    obj[0].name = e.target.value
    this.canvas.renderAll()
    
      })
    }
    

   }


  

          
    
 
    }

}

