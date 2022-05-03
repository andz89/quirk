import {Modification} from "./_modification.js";

export class Right_tools extends Modification {



    
 

    fontSize(selector){
        let fontSize = document.querySelector(selector)
        fontSize.oninput= (e)=>{
        let object =  this.canvas.getActiveObject();
        if(object){
      
        if(object.getSelectedText() != ""){

        object.setSelectionStyles({fontSize: e.target.value })
        //  fontSizeinput = e.target.value
        object.dirty = true;
        this.canvas.renderAll()
        // object.set({fontSize: e.target.value })

        }else{

        object.removeStyle('fontSize');
        object.set({fontSize: e.target.value })
        object.dirty = true;
         this.canvas.renderAll()
        }

        }
        }
    }

    //background color
backgroundColor(){
let shapeFill = document.querySelector('#shapeFill')
shapeFill.oninput = (e)=>{
    let object = this.canvas.getActiveObject();


    //many objects
    if(object.type === "activeSelection" && object !== undefined){
    object._objects.forEach((obj)=>{
    obj.type == 'textbox' ? obj.set("backgroundColor", e.target.value): obj.set('fill', e.target.value )
    obj.dirty = true;
    this.canvas.renderAll()
    })
    }


    //one object
    if(object !== undefined && object.type !== "activeSelection"){
        
    if( object.type !== "textbox"){
        object.set('fill', e.target.value )
    
    }else{
        if(object.getSelectedText() == ""){ 
        object.removeStyle('textBackgroundColor');
        object.set("backgroundColor", e.target.value)
      
        }else{
        object.setSelectionStyles({textBackgroundColor: e.target.value })
     
        }
        
    }

    object.dirty = true;
    this.canvas.renderAll()

    } 

}


}

//remove background color
remove_fill_color(){
let removeColor =  document.querySelector('#removeColor')
removeColor.onclick =  ()=>{
let object = this.canvas.getActiveObject()

    if(object !== undefined && object.type === "activeSelection"){
        object._objects.forEach((e)=>{
            if(e.type !== 'textbox'){
            e.set('fill', null )
         
            }else{
            e.set("backgroundColor", null)
         
            }

            e.dirty = true;
            this.canvas.renderAll()
        })

    }

    if(object !== undefined && object.type !== "activeSelection" ){

        if(object.type !== "textbox"){
        object.set('fill', null )
    

        }else{

        object.removeStyle('textBackgroundColor');
        object.set("backgroundColor", null)
       
        }

        object.dirty = true;
        this.canvas.renderAll()

    }

}
}

//font color change
fontColor(selector){

    let color = document.querySelector(selector)
color.addEventListener('input', (e)=>{


let object = this.canvas.getActiveObject();

if(object != undefined){

if(window.getSelection().toString() != ""){
object.setSelectionStyles({fill:e.target.value})
canvas.renderAll()
} else if(window.getSelection().toString() == ""){

object.removeStyle('fill');
object.set('fill', e.target.value)
object.dirty = true;
this.canvas.renderAll()
}
}
})
}
   

// clip_image(){

// let object = this.canvas.getActiveObject()
// document.querySelector('#clip').addEventListener('click', ()=>{
//     // let image = document.querySelector('#img-test').src
//  fabric.Image.fromURL(image, (img)=> {
//     // var scalar = 1, abort;
//     var path = 'M 230 230 A 45 45, 0, 1, 1, 275 275 L 275 230 Z';
//     var shell = new fabric.Path(path, { 
//       fill: '',
//       stroke: 'blue',
//       strokeWidth: 5,
//       scaleX: 2,
//       scaleY: 2,
//     //   lockScalingX: true,
//     //   lockScalingY: true,
//     //   lockSkewingX: true,
//     //   lockSkewingY: true,
//       originX: 'center',
//       originY: 'center',
//     });
    
//     var clipPath = new fabric.Path(path, {
//       absolutePositioned: true,
//       originX: 'center',
//       originY: 'center',
//       scaleX: 2,
//       scaleY: 2
//     });
   
    
//     // function animate() {
//     //   abort = fabric.util.animate({
//     //     startValue: 0,
//     //     endValue: 360 * scalar,
//     //     duration: 1000,
//     //     easing: fabric.util.ease.easeInOutSine,
//     //     onChange: function (value) {
//     //       shell.set('angle', value);
//     //       clipPath.set('angle', value);
//     //       img.set('dirty', true);
//     //     },
//     //     onComplete: function () {
//     //       scalar += Math.sign(scalar);
//     //       scalar *= -1;
//     //       animate();
//     //     }
//     //   });
//     // }

//     img.scale(0.5).set({
//       left: 200,
//       top: 180,
//       clipPath: clipPath
//     });
//     shell.on('moving', ({ e, transform, pointer }) => {
//       //  only because they are absolutePositioned
//       clipPath.setPositionByOrigin(shell.getCenterPoint(), 'center', 'center');
//       img.set('dirty', true);
//     });
//     // shell.on('rotating', () => {
//     //   clipPath.set({ angle: shell.angle });
//     //   img.set('dirty', true);
//     // });
//     // shell.on('selected', () => {
//     //   abort();
//     // });
//     // shell.on('deselected', () => {
//     //   scalar = 1;
//     // //   animate()
//     // });
//     img.clipPath = clipPath;
//     this.canvas.add(img, shell);
//     this.canvas.setActiveObject(img);

//     // animate();
//   });
// })
 

// }

// crop_image(){
      
        
//         document.querySelector('#crop').addEventListener('click', ()=>{
//         let objects = this.canvas.getActiveObjects();
//         let img = objects[0]._originalElement;
//         let cropper_objects = objects[1]
//         // console.log()
//      console.log( `height` + ` `+ cropper_objects.getScaledHeight())


//         let  imgInstance = new fabric.Image(img, {
//         height:cropper_objects.getScaledHeight(), //unsa katas on ang pag crop
//         // cropY:0//asa ng sugod ang crop
//         });
       
//         // console.log()
//      console.log( `height` + ` `+ img.height)

//         this.adding_object_style(imgInstance);
//         // this.canvas.add(imgInstance)
//         })
     

        
// }



}   