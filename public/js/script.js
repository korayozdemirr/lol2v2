let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");
let searchBtn = document.querySelector(".bx-search");

closeBtn.addEventListener("click", ()=>{
  sidebar.classList.toggle("open");
  menuBtnChange();//calling the function(optional)
});

searchBtn.addEventListener("click", ()=>{ // Sidebar open when you click on the search iocn
  sidebar.classList.toggle("open");
  menuBtnChange(); //calling the function(optional)
});

// following are the code to change sidebar button(optional)
function menuBtnChange() {
 if(sidebar.classList.contains("open")){
   closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");//replacing the iocns class
 }else {
   closeBtn.classList.replace("bx-menu-alt-right","bx-menu");//replacing the iocns class
 }
}
function addAccount(){
  const steps = ['1', '2', '3']
  const swalQueue = Swal.mixin({
    progressSteps: steps,
    confirmButtonText: 'Next >',
  })

  await swalQueue.fire({
    title: 'Uno', currentProgressStep: 0,
    html:`<input type="text" id="login" class="swal2-input" placeholder="Username">
    <input type="password" id="password" class="swal2-input" placeholder="Password">`
    
  })
  await swalQueue.fire({ title: 'Dos', currentProgressStep: 1 })
  await swalQueue.fire({ title: 'Tres', currentProgressStep: 2, confirmButtonText: 'OK' })
}
  
