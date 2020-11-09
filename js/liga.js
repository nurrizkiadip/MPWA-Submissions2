//*Event Listener
document.addEventListener('DOMContentLoaded', init);

//* Function
function init(){
  M.Sidenav.init(document.querySelectorAll('nav .sidenav'));

  let page = window.location.hash.substr(1);

  // *Calling function
  loadFooter();
  loadPage(page);


  // *Declaration Function
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

  function loadPage(page) {
    if(page != '' && page != 'home'){
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
          })
        .catch(error => console.log("Error : " + error))
    }
  }

  // Saved Artikel
  const isFromSaved = new URLSearchParams(window.location.search).get("saved");
  const saveBtn = document.getElementById('save');
  const deleteBtn = document.getElementById('delete');
  let ligas = new URLSearchParams(window.location.search).get("id_liga");

  if(isFromSaved){
    saveBtn.style.display = 'none';
    deleteBtn.style.display = 'inline-block';

    getSavedLigaById();
  } else {
    ligas = getTeams();
  }

  saveBtn.addEventListener('click', function(){
    ligas.then(teams => saveFavLiga(teams))
    window.location.href = "./index.html#saved";
  })

  deleteBtn.addEventListener('click', function(){
    deleteFavLiga(parseInt(ligas)).then(_ => getSavedLiga());
    window.location.href = "./index.html#saved";
  })
}
