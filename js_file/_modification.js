

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





    
}

