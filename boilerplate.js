// import {Modal} from "./js_file/_modal.js";

// let first_modal = new Modal('#myfirst_modal', {
//     backgroundColor: 'rgba(51, 51, 51, 0.705)',
//      width:'300px',
//      height:'200px',
//      title: 'Login',
//      showButton:'#modal-btn-open',
//      modalHeaderColor:'teal',
//      windowClickClose: true,
//      modalContentBackgroundColor:'wheat'
//     })

//     let firstElement = `
   
//     <form action="">
//        <label for="account_name">Account Name:</label>
   
//         <input type="text" name="account-name" id="" autoComplete ="off">
      
//         <label for="password">Password:</label>
    
//         <input type="password" class="password">
//     </form>

//     `

let dataStored = [];
const butDir = document.getElementById('butDirectory');
butDir.addEventListener('click', async () => {
 const dirHandle = await window.showDirectoryPicker();
const promises = [];
for await (const entry of dirHandle.values()) {
if (entry.kind !== 'file') {
break;
}
promises.push(entry.getFile().then((file) => file.text()));
}
let file = await Promise.all(promises)

let  jas
file.forEach((e)=>{
jas = JSON.parse(e)
dataStored.push(jas)
})


})
document.querySelector('#showData').addEventListener('click',()=>{
  
dataStored.forEach(element => {
  let li =  document.createElement('li');
  li.className ='list'
  li.innerHTML= `${element.title}`
  document.querySelector('#title').appendChild(li);
});


document.querySelector('#title').addEventListener('click',(e)=>{
let data =  dataStored.filter((d)=>{
  return  d.title == e.target.innerHTML
  })
  data.forEach((d)=>{
document.querySelector('#lyrics').innerHTML = d.lyrics

  })
})

})


      
