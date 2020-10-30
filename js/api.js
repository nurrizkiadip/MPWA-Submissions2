const API_KEY = "d8066161839b4368a7641c3c36364fbe";
const BASE_URL = "https://api.football-data.org/v2/";


//* FUNCTION
const ENDPOINT_COMPETITION = LEAGUE_ID => `${BASE_URL}competitions/${LEAGUE_ID}/standings`;

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
  else if(league === "Germany") return"German"
  else if(league === "Europe") return"Eropa"

}


function getAllPosterTeam(id_liga) {
  // if ("caches" in window) {
  //   caches.match(ENDPOINT_COMPETITION).then(function (response) {
  //     if (response) {
  //       response.json().then(function (data) {
  //         console.log("Competition Data: " + data);
  //         showStanding(data);
  //       })
  //     }
  //   })
  // }
  // console.log(ENDPOINT_COMPETITION(id_liga))
  fetchAPI(ENDPOINT_COMPETITION(id_liga))
    .then(data => {
      showBlogs(data);
    })
    .catch(error => {
      console.log(error)
    })
}

function showBlogs(data){
  let logo = '';
  let gambar = '';

  data.standings[0].table.forEach(function(tab){
    gambar += `
      <img src="${tab.team.crestUrl.replace(/^http:\/\//i, 'https://')}" alt="Gambar Logo Team">
    `
  })
  // .replace(/^http:\/\//i, 'https://')
  logo = `
    <div class="blog">
      <div class="blog-image">
        ${gambar}
      </div>
      <div class="blog-desc">
        <div class="row">
          <div class="col l9 s12">
            <h5>Liga ${ligaInIndo(data.competition.area.name)}</h5>
            <span>${data.competition.lastUpdated}</span>
          </div>
          <div class="col l3 s12">
            <a href="#">Lebih Lanjut</a>
          </div>
        </div>
      </div>
    </div>
  `;

  document.querySelector('main .blogs').innerHTML += logo;
}

function showStanding(data) {
  let standings = "";
  let standingElement = document.getElementById("homeStandings");

  
  data.standings[0].table.forEach(function (standing) {
    standings += `
      <tr>
        <td><img src="${standing.team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="30px" alt="badge"/></td>
        <td>${standing.team.name}</td>
        <td>${standing.won}</td>
        <td>${standing.draw}</td>
        <td>${standing.lost}</td>
        <td>${standing.points}</td>
        <td>${standing.goalsFor}</td>
        <td>${standing.goalsAgainst}</td>
        <td>${standing.goalDifference}</td>
      </tr>
    `;
  });

  standingElement.innerHTML = `
    <div class="card" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">

      <table class="striped responsive-table">
        <thead>
          <tr>
            <th></th>
            <th>Team Name</th>
            <th>W</th>
            <th>D</th>
            <th>L</th>
            <th>P</th>
            <th>GF</th>
            <th>GA</th>
            <th>GD</th>
          </tr>
        </thead>
        <tbody id="standings">
          ${standings}
        </tbody>
      </table>
    
    </div>
  `;
}