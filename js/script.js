//* Daftar Service Worker
if('serviceWorker' in navigator){
  window.addEventListener("load", function(){
    navigator.serviceWorker.register("../sw.js")
      .then(function(){
        console.log("Service Worker bekerja")
      })
      .catch(function(){
        console.log("Service Worker tidak bekerja")
      });
  })
} else {
  console.log("Service Worker tidak didukung di versi/browser ini");
}

//* Daftar Indexed DB


//* Daftar push notification


//*Event Listener
document.addEventListener('DOMContentLoaded', homeInit);

//* Function
function homeInit(){
  M.Sidenav.init(document.querySelectorAll('nav .sidenav'));

  loadNav();

  function loadNav(){
    fetch('../nav-menus.html')
      .then(function(result){
        if(result.status !== 200){
          console.log("Error : " + result.status);
          return Promise.reject(new Error(result.statusText));
        } else {
          return Promise.resolve(result);
        }
      })
      .then(function(result){
        return result.text();
      })
      .then(result => {
        const menus = document.querySelectorAll("nav .topnav, nav .sidenav");
        menus.forEach(function (menu){
          menu.innerHTML += result;
        })
      })
      .catch(function(error){
        console.log("Halaman tidak ditemukan");
        console.log("Pesan Error: " + error);
      })
    
  }
}