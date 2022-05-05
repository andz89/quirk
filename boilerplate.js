
  function uploadImageLocalFile(selector){

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
    // const arrayBuffer = await file.arrayBuffer();
    // const arrayBufferView = new Uint8Array(arrayBuffer);
    // const blob = new Blob([arrayBufferView], { type: file });
    // const urlCreator = window.URL || window.webkitURL;
    // const mediaUrl =  urlCreator.createObjectURL(blob);

    console.log(file)
        let reader = new FileReader();
        reader.readAsDataURL(file)

        reader.onload = () => {
        fabric.Image.fromURL(reader.result, (img)=>{
        img.name = img.type

        this.adding_object_style(img)
        // new_image_element.remove()
        this.loaderHide()
        })

        };

    // let new_image_element = document.createElement('img')
    //  new_image_element.src = mediaUrl;
    //  document.querySelector('body').appendChild(new_image_element)
    //  new_image_element.style.display = 'none';
    // setTimeout(()=>{
    //     let dataURL =   this.getDataUrl(new_image_element)
    //     fabric.Image.fromURL(dataURL, (img)=>{
    //     img.name = img.type
      
    //     this.adding_object_style(img)
    //     new_image_element.remove()
    //      this.loaderHide()
    // })
    
    // }, 100);

    })
    
}   