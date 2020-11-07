//*Event Listener
document.addEventListener('DOMContentLoaded', init);

//* Function
function init(){
  M.Sidenav.init(document.querySelectorAll('nav .sidenav'));

  let page = window.location.hash.substr(1);
  if(page == "") page = "home";
  console.log(page);

  // *Calling function
  loadNav();
  loadFooter();
  headerInit(page);
  loadPage(page);


  // *Declaration Function
  function loadNav(){
    fetch('../navbar.html')
      .then(function(result){
        if(result.status !== 200){
          console.log("Error : " + result.status);
          return Promise.reject(new Error(result.statusText));
        } else {
          return Promise.resolve(result);
        }
      })
      .then(result => result.text())
      .then(result => {
        const menus = document.querySelectorAll("nav .topnav, nav .sidenav");
        menus.forEach(function (menu){
          menu.innerHTML += result;
        })

        document.querySelectorAll('nav .topnav a, nav .sidenav a, nav #logo-container')
          .forEach(function(nav){
            nav.addEventListener('click', function(e){
              // Menutup sidebar yg terbuka
              M.Sidenav.getInstance(document.querySelector('nav .sidenav')).close();

              // mengaktifkan anchor
              page = e.target.getAttribute('href').substr(1);
              loadPage(page);
              headerInit(page);
            })
          })
      })
      .catch(function(error){
        console.log("Halaman tidak ditemukan");
        console.log("Pesan Error: " + error);
      })
    
  }

  function loadFooter(){
    fetch("../footer.html")
      .then(result => {
        if(result.status !== 200){
          console.log("Error : " + result.status);
          return Promise.reject(new Error(result.statusText));
        } else {
          return Promise.resolve(result);
        }
      })
      .then(result => result.text())
      .then(result => {
        document.querySelector('footer').innerHTML = result;
      })
      .catch(error => console.log("Error : " + error))
  }

  function headerInit(page) {
    if (page == "" || page == "home") {
      const header = document.querySelector("header");
      header.style.display = "block";
      fetch("../header.html")
        .then(result => {
          if(result.status !== 200){
            console.log("Error : " + result.status);
            return Promise.reject(new Error(result.statusText));
          } else {
            return Promise.resolve(result);
          }
        })
        .then(result => result.text())
        .then(result => {
          header.innerHTML = result;

          const textCaption = header.getElementsByTagName('p')[0];
          const huruf = [...textCaption.textContent].map(h => `<span>${h}</span>`).join('');
          textCaption.innerHTML = huruf;

          // const textAnim = Array.from(header.getElementsByTagName('span'));
          // const lengthText = textAnim.length;

          // textAnim.forEach(function(char, i){
          //   setInterval(function(){

          //   })
          // })
      })
      .catch(error => console.log("Error : " + error))
    
    } else {
      document.querySelector("header").style.display = "none";
    }
  }

  function loadPage(page) {
    fetch(`../pages/${page}.html`)
      .then(result => {
        if(result.status === 200){
          return Promise.resolve(result);
        }else if (this.status === 404){
          document.querySelector("main").innerHTML = `<h6 style="text-align: center;">Halaman tidak ditemukan</h6>`;
        } else {
          document.querySelector("main").innerHTML = `<h6 style="text-align: center;">Halaman tidak dapat diakses</h6>`;
        }
      })
      .then(result => result.text())
      .then(result => {
          document.querySelector("main").innerHTML = result;

          if(page == "" || page == "home"){
            const blogs = document.querySelector('main .blogs');
            blogs.innerHTML = "";

            getAllPosterTeam(2001);
            getAllPosterTeam(2002);
            getAllPosterTeam(2003);
            getAllPosterTeam(2021);
            getAllPosterTeam(2015);
            getAllPosterTeam(2014);
          }

          

        })
      .catch(error => console.log("Error : " + error))
  }

  //* Animation
  
}