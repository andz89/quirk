

export function header(){

document.querySelector('header').onclick = function(e){

document.querySelectorAll('.dropdown .dropdown-content').forEach((e)=>{e.style.display = 'none'})

let element = e.target

if(element.classList.contains('dropbtn-files')){

document.querySelector(".dropdown-files .dropdown-content").style.display = 'block';
}

if(element.classList.contains('dropbtn-insert-shape')){
document.querySelector(".dropdown-insert-shape .dropdown-content").style.display = 'block';
}

if(element.classList.contains('dropbtn-clip-image')){
document.querySelector(".dropdown-clip-image .dropdown-content").style.display = 'block';
}



}

//sub header area
document.querySelector('#canvas-property-btn').addEventListener('click', ()=>{
document.querySelector('.canvas-options').style.display = "block"


})


document.querySelector('.align_canvas').addEventListener('click', ()=>{
document.querySelector('.align_canvas_container').style.display = "block"

})






}
