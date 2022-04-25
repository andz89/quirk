

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



}

  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.style.display == 'block') {
          openDropdown.style.display = 'none';
    
  
        }
      }
      document.querySelectorAll('.dropbtn').forEach((e)=>{
      e.style.backgroundColor = '';
      })
    }
  }




}
