import {Right_tools} from "./_right-tools.js";
import {Menu_tools} from "./_menu-tools.js";
import { Modification } from "./_modification.js";



import {Utilities} from "./_utilities.js";


export class Canvas extends Modification{


 create_main_canvas =()=>{

let utils = new Utilities({
        canvas : this.canvas,
        width : this.width,
        height :this.height,
        canvasScale: this.canvasScale,
        SCALE_FACTOR: this.SCALE_FACTOR , 
        fileHandle: this.fileHandle,
        })

        utils.deleteObjects()
        utils.canvasOn({fontSize:'#fontSize'})
        utils.discardActiveObject()
      
        let objects = this.canvas._objects
        objects.forEach((e)=>{
                console.log(e.type)
           
        })
        // console.log(this.canvas._objects)

let menu_tools = new Menu_tools({
        canvas : this.canvas,
        width : this.width,
        height :this.height,
        canvasScale: this.canvasScale,
        SCALE_FACTOR: this.SCALE_FACTOR,
        fileHandle: this.fileHandle
        })


    
        menu_tools.insertText('.dropbtn-insert-text')
        menu_tools.uploadImageLocalFile('#upload_image')
        menu_tools.save_file_json()
        menu_tools.canvasBackgroundColor()
        menu_tools.bringToFront_object()
        menu_tools.bringToBack_object()
        menu_tools.crop_image_init()


        //shapes
        menu_tools.insert_shape('#square',()=>{
        var object = new fabric.Rect({
        width:549,
        height:549,
        shape: 'square',
        fill: 'gray'
        });
        object.name ="square"
        this.adding_object_style(object)
   
        })
          menu_tools.insert_shape('#circle',()=>{
        var object = new fabric.Circle({
        radius: 20, 
        fill: 'gray',
        left: 100,
        top: 100,
        });
        object.name ="circle"
      
        this.adding_object_style(object)
        })

        menu_tools.insert_shape('#diamond',()=>{
        var object = new fabric.Rect({
        left: 100,
        top: 100,
        fill: 'red',
        width: 20,
        height: 20,
        angle: 45,
        });
        object.name ="diamond"
        this.adding_object_style(object)
        })

let right_tools = new Right_tools({
        canvas : this.canvas,
        width : this.width,
        height :this.height,
        canvasScale: this.canvasScale,
        SCALE_FACTOR: this.SCALE_FACTOR,
        fileHandle: this.fileHandle,
        })

        right_tools.fontSize('#fontSize')
        right_tools.backgroundColor()
        right_tools.remove_fill_color()
        right_tools.fontColor('#color')


        menu_tools.log()
        menu_tools.clip()
        menu_tools.position()
        menu_tools.crop_test()
        
   

          
}



}

