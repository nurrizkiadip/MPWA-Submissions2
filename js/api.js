const API_KEY = "d8066161839b4368a7641c3c36364fbe";
const BASE_URL = "https://api.football-data.org/v2/";


//* FUNCTION
const ENDPOINT_COMPETITION = LEAGUE_ID => `${BASE_URL}competitions/${LEAGUE_ID}/standings`;
const ENDPOINT_TEAMS = id_tim => `${BASE_URL}competitions/${id_tim}/teams`;

const fetchAPI = url => {
  return fetch(url, {
    headers: {
      'X-Auth-Token': API_KEY
    }
  })
  .then(res => {
    if (res.status !== 200) {
        console.log("Error: " + res.status);
        return Promise.reject(new Error(res.statusText))
    } else {
        return Promise.resolve(res)
    }
  })
  .then(res => res.json())
  .catch(err => {
    console.log(err)
  })
};

const ligaInIndo = league => {
  if(league === "England") return "Inggris"
  else if(league === "France") return "Prancis"
  else if(league === "Spain") return"Spanyol"
  else if(league === "Netherlands") return"Belanda"
  else if(league === "Germany") return"Jerman"
  else if(league === "Europe") return"Eropa"
}

function getAllPosterTeam(id_liga) {
  if ("caches" in window) {
    caches.match(ENDPOINT_COMPETITION(id_liga)).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          console.log(data);
          return showBlogs(data);
        })
      } else {
        fetchAPI(ENDPOINT_COMPETITION(id_liga))
        .then(data => {
          console.log(data);
          return showBlogs(data);
        })
        .catch(error => {
          console.log(error)
        })
      }
    })
  }
}

function showBlogs(data){
  function gambarLiga(){
    const liga = data.competition.area.name;
    if(liga === "England") return "liga-inggris"
    else if(liga === "France") return "liga-prancis"
    else if(liga === "Spain") return"liga-spanyol"
    else if(liga === "Netherlands") return"liga-belanda"
    else if(liga === "Germany") return"liga-jerman"
    else if(liga === "Europe") return"liga-eropa"
  }

  const logo = `
    <div class="blog col l5 s12">
      <div class="blog-image">
        <img src="./assets/img/liga/${gambarLiga()}.jpg" alt="Gambar Logo Team">
      </div>
      <div class="blog-desc">
        <div class="row">
          <h5>Liga ${ligaInIndo(data.competition.area.name)}</h5>
          <span>${data.competition.lastUpdated}</span>
          <div class="button">
            <a href="./liga.html?id_liga=${data.competition.id}">Lebih Lanjut</a>
          </div> 
        </div>
      </div>
    </div>
  `;

  document.querySelector('main .blogs').innerHTML += logo;
}


function getTeams() {
  return new Promise(function(resolve, reject){
    // Ambil nilai query parameter (?id=)
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id_liga"); 
    
    if ("caches" in window) {
      caches.match(ENDPOINT_COMPETITION(idParam)).then(function(response) {
        if (response) {
          response.json().then(function(data) {
            caches.match(ENDPOINT_TEAMS(data.competition.id))
            .then(function(response) {
              if (response) {
                response.json().then(function(dataTeams) {
                  showTeams(dataTeams);
                  
                  resolve(dataTeams)
                });
              } else {
                fetchAPI(ENDPOINT_COMPETITION(idParam))
                .then(data => {
                  fetchAPI(ENDPOINT_TEAMS(data.competition.id))
                  .then(dataTeams => {
                    showTeams(dataTeams);
          
                    resolve(dataTeams);
                  })
                });
              }
            });
          });
        } else {
          fetchAPI(ENDPOINT_COMPETITION(idParam))
          .then(data => {
            fetchAPI(ENDPOINT_TEAMS(data.competition.id))
            .then(dataTeams => {
              showTeams(dataTeams);
    
              resolve(dataTeams);
            })
          });
        }
      });
    }
  });
}


function showTeams(dataTeams) {
  let standings = "";
  console.log(dataTeams.teams)
  dataTeams.teams.forEach(function (team) {
      standings += `
        <tr>
          <td><img src="${team.crestUrl}" style="margin: 6px" width="40px" alt="Logo Tim" /></td>
          <td>${team.name} (${team.shortName})</td>
          <td>${team.clubColors}</td>
          <td>${team.address}</td>
          <td>${team.phone}</td>
          <td>${team.email}</td>
          <td>${team.website}</td>
        </tr>
      `;
  });

  document.getElementById('body-content').innerHTML += `
  <div class="container">
    <h3 class="judulLiga">Daftar Tim Liga ${ligaInIndo(dataTeams.competition.area.name)}</h3>

    <div class="card teams-details" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">

      <table class="striped responsive-table">
        <thead>
          <tr>
              <th>Logo</th>
              <th>Nama Tim</th>
              <th>Warna Kostum</th>
              <th>Alamat</th>
              <th>Telepon</th>
              <th>E-mail</th>
              <th>Website</th>
          </tr>
        </thead>
        <tbody id="standings">
          ${standings}
        </tbody>
      </table>
      
    </div>
  </div>
  `;
}

//? Saved
function getSavedLiga() {
  return new Promise(function(resolve, reject){
    getAll().then(function(ligas) {
      function gambarLiga(liga){
        if(liga === "England") return "liga-inggris"
        else if(liga === "France") return "liga-prancis"
        else if(liga === "Spain") return"liga-spanyol"
        else if(liga === "Netherlands") return"liga-belanda"
        else if(liga === "Germany") return"liga-jerman"
        else if(liga === "Europe") return"liga-eropa"
      }

      const savedPage = document.querySelector("#body-content .blogs")
      // Menyusun komponen card artikel secara dinamis
      let ligaCard = "";
      ligas.forEach(function(liga) {
        
        ligaCard += `
          <div class="blog col l5 s12">
            <div class="blog-image">
              <img src="./assets/img/liga/${gambarLiga(liga.name)}.jpg" alt="Gambar Logo Team">
            </div>
            <div class="blog-desc">
              <div class="row">
                <h5>Liga ${ligaInIndo(liga.name)}</h5>
                <span>${liga.lastUpdated}</span>
                <div class="button">
                  <a href="./liga.html?id_liga=${liga.id}&saved=true">Lebih Lanjut</a>
                </div>
              </div>
            </div>
          </div>
        `;
      });
      console.log(ligas)
      
      if (!(Array.isArray(ligas) && ligas.length)) {
        savedPage.parentElement.innerHTML = '';
        ligaCard = `<h5 style="text-align:center; margin:50px 0">Tidak ada Liga favorit</h5>`
        document.querySelector("#body-content .container").parentElement.innerHTML = ligaCard;
      } else savedPage.innerHTML = ligaCard;

      resolve(true);
    })
    .catch(err => reject(err));
  })
}

function getSavedLigaById() {
  const urlParams = new URLSearchParams(window.location.search);
  const idParam = urlParams.get("id_liga"); //typedata string
  let ligaDetails = '';

  // idParam must convert to number before using it bcs of the DB 
  getLigaById(parseInt(idParam)).then(function(liga) {
    liga.teams.forEach(function(team){
      ligaDetails += `
        <tr>
          <td><img src="${team.crestUrl}" width="30px" alt="badge"/></td>
          <td>${team.name} (${team.shortName})</td>
          <td>${team.clubColors}</td>
          <td>${team.address}</td>
          <td>${team.phone}</td>
          <td>${team.email}</td>
          <td>${team.website}</td>
        </tr>
      `;

    })
  
    document.getElementById('body-content').innerHTML = `
    <div class="container">
      <h3 class="judulLiga">Daftar Tim Liga ${ligaInIndo(liga.name)}</h3>

      <div class="card teams-details" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">

        <table class="striped responsive-table">
          <thead>
            <tr>
                <th style="height:65px">Logo</th>
                <th>Nama Tim</th>
                <th>Warna Kostum</th>
                <th>Alamat</th>
                <th>Telepon</th>
                <th>E-mail</th>
                <th>Website</th>
            </tr>
          </thead>
          <tbody id="standings">
            ${ligaDetails}
          </tbody>
        </table>
        
      </div>
    </div>
    `;
  });
}

