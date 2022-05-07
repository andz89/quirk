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
log(){
    document.querySelector('#log').onclick = ()=>{
                  let object = this.canvas.getActiveObject();
            console.log(object.type)
    }
    
}
  bold_text(){

      document.querySelector('#bold').onclick =()=>{
          let object = this.canvas.getActiveObject();

        if(object && object.bold === undefined){
            console.log('ee')
            if(object.getSelectedText() == ""){//empty
            object.removeStyle('fontWeight')
            object.set({fontWeight: "bold" })
            object.dirty = true;
            this.canvas.renderAll()
            bold.style.backgroundColor = 'rgba(87, 86, 86, 0.733)'
            object.bold = true
            }else{
            object.setSelectionStyles({fontWeight: "bold" })
            bold.style.backgroundColor = 'rgba(87, 86, 86, 0.733)'
            object.bold = true
            object.dirty = true;
            this.canvas.renderAll()
            }
        }else{
            
        if(object.getSelectedText() == ""){//empty
            object.removeStyle('fontWeight')
      
        //to check if some text is normal and bold
            if(object.fontWeight == 'normal'){
            object.set({fontWeight: "bold" })
            this.canvas.renderAll()
            }else{
                object.set({fontWeight: "normal" })
            object.dirty = true;
            this.canvas.renderAll()
            bold.style.backgroundColor = ''
            object.bold = undefined
            }
      
        }else{
        object.setSelectionStyles({fontWeight: "normal" })
        object.dirty = true;
        bold.style.backgroundColor = ''
        this.canvas.renderAll()
        object.bold = undefined
        }
      

        }

      }

  }

  italic_text(){
      let italic = document.querySelector('#italic')
      italic.onclick= ()=>{

let object = this.canvas.getActiveObject();

if(object.italic === undefined){

    if(object.getSelectedText() == ""){
          object.removeStyle('fontStyle')
    
        object.set({fontStyle:'italic' })

    object.dirty = true;
    this.canvas.renderAll()
    object.italic = true;
     italic.style.backgroundColor = 'rgba(87, 86, 86, 0.733)'
    }else{
 
    object.setSelectionStyles({fontStyle:'italic' })
    object.dirty = true;
    this.canvas.renderAll()
    object.italic = true;
    italic.style.backgroundColor = 'rgba(87, 86, 86, 0.733)'
    }
}else{


  

    if(object.getSelectedText() == ""){
    object.removeStyle('fontStyle')
    console.log(object.fontStyle )
    //to check if some text is normal and italic
    if(object.fontStyle == 'normal'){
    object.set({fontStyle: "italic" })
    this.canvas.renderAll()
    }else{
    object.set({fontStyle: "" })
    object.dirty = true;
    this.canvas.renderAll()
    italic.style.backgroundColor = ''
    object.italic = undefined;
    }

    }else{
           console.log('jare')
  object.setSelectionStyles({fontStyle: "normal" })

    object.dirty = true;
    this.canvas.renderAll()
    object.italic = undefined;
italic.style.backgroundColor = ''
  }


}



}
  }

  stroke_color(){
      let strokeColor = document.querySelector('#stroke_color');
        strokeColor.oninput = (e) =>{
        let object = this.canvas.getActiveObject();
        object.stroke =  e.target.value;
        // if(object.type == 'textbox' && object.strokeWidth == 1){
        //        object.strokeWidth = 1
        // }
        
        if(object.type == 'rect' && object.strokeWidth == 1){
            object.strokeWidth = 30
            document.querySelector('#stroke_width').value =object.strokeWidth
        }

        if(object.type == 'image' && object.strokeWidth == 0){
            object.strokeWidth = 10
            document.querySelector('#stroke_width').value =object.strokeWidth
        }
   
     
        object.objectCaching = false,
        object.dirty = true;
        object.paintFirst = "stroke";
        this.canvas.renderAll()
        }
  }
    stroke_width(){
      let strokeWidth = document.querySelector('#stroke_width');
      strokeWidth.oninput = (e) =>{
        let value = e.target.value
        if(e.target.value == ''){
            value = 0
        }
        let object = this.canvas.getActiveObject();
        console.log(object.stroke);
        if(object.stroke == null){object.stroke =  'teal';}
        object.strokeWidth = parseInt(value, 10);
        object.objectCaching = false,
        object.dirty = true;
        object.paintFirst = "stroke";
        this.canvas.renderAll()
      
        
      }
  }

  
  opacity(){
   let opacity = document.querySelector('#opacity')
      opacity.oninput = (e) =>{
      
  let object = this.canvas.getActiveObject();

 if(!object){return false;}
  if(e.target.value == 10){
  object.opacity = 1;
  }
  if(e.target.value == 9){
  object.opacity = 0.9;
  }
  if(e.target.value == 8){
  object.opacity = 0.8;
  }
  if(e.target.value == 7){
  object.opacity = 0.7;
  }
  if(e.target.value == 6){
  object.opacity = 0.6;
  }
  if(e.target.value == 5){
  object.opacity = 0.5;
  }
  if(e.target.value == 4){
  object.opacity = 0.4;
  }
  if(e.target.value == 3){
  object.opacity = 0.3;
  }
   if(e.target.value == 2){
  object.opacity = 0.2;
  }
   if(e.target.value == 1){
  object.opacity = 0.1;
  }
     if(e.target.value == 0){
  object.opacity = 0;
  }

 
  
  this.canvas.renderAll()
}
  }


}   