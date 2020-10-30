const API_KEY = "d8066161839b4368a7641c3c36364fbe";
const BASE_URL = "https://api.football-data.org/v2/";

const LEAGUE_ID = 2021;

const ENDPOINT_COMPETITION = `${BASE_URL}competitions/${LEAGUE_ID}/standings`;

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

function getAllStandings() {
  if ("caches" in window) {
      caches.match(ENDPOINT_COMPETITION).then(function (response) {
          if (response) {
              response.json().then(function (data) {
                  console.log("Competition Data: " + data);
                  showStanding(data);
              })
          }
      })
  }

  fetchAPI(ENDPOINT_COMPETITION)
      .then(data => {
          showStanding(data);
      })
      .catch(error => {
          console.log(error)
      })
}