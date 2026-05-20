const searchInput = document.getElementById("searchInput");
const results = document.getElementById("results");
const count = document.getElementById("count");
const suggestionsBox = document.getElementById("suggestionsBox");
const favoriteAirports = document.getElementById("favoriteAirports");

let airports = [];

let favorites =
  JSON.parse(localStorage.getItem("favorites")) || [];



async function loadAirports() {

  try {

    const response = await fetch(
      "https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat"
    );

    const data = await response.text();

    const lines = data.split("\n");

    airports = lines.map(line => {

      const parts = line.split(",");

      return {

        name: parts[1]?.replace(/"/g, "") || "",

        city: parts[2]?.replace(/"/g, "") || "",

        country: parts[3]?.replace(/"/g, "") || "",

        iata: parts[4]?.replace(/"/g, "") || ""

      };

    }).filter(airport =>
      airport.iata &&
      airport.iata !== "\\N"
    );

    count.innerText = airports.length;

  }

  catch(error){

    console.error(error);

    count.innerText = "Error";

  }

}

loadAirports();



searchInput.addEventListener("input", (e) => {

  const value = e.target.value
    .toLowerCase()
    .trim();

  results.innerHTML = "";
  suggestionsBox.innerHTML = "";

  if(value === "") return;

  const filtered = airports.filter((airport)=>

    airport.name.toLowerCase().includes(value) ||

    airport.city.toLowerCase().includes(value) ||

    airport.country.toLowerCase().includes(value) ||

    airport.iata.toLowerCase().includes(value)

  );



  /* DROPDOWN SUGGESTIONS */

  filtered.slice(0,8).forEach((airport)=>{

    suggestionsBox.innerHTML += `

      <div
        class="suggestion-item"
        onclick="selectAirport('${airport.iata}')"
      >

        ${airport.name}
        (${airport.iata})

      </div>

    `;

  });



  displayAirports(filtered.slice(0, 30));

});



function selectAirport(code){

  searchInput.value = code;

  suggestionsBox.innerHTML = "";

  const filtered = airports.filter((airport)=>

    airport.iata === code

  );

  displayAirports(filtered);

}



function displayAirports(data){

  results.innerHTML = "";

  if(data.length === 0){

    results.innerHTML = `
      <div class="card">
        <div class="card-content">
          <div class="airport-name">
            No Airport Found
          </div>
        </div>
      </div>
    `;

    return;
  }

  data.forEach((airport)=>{

    const isFavorite =
      favorites.includes(airport.iata);

    results.innerHTML += `

      <div class="card">

        <div class="card-content">

          <div class="airport-name">
            ${airport.name}
          </div>

          <div class="airport-info">

            <strong>City:</strong>
            ${airport.city}<br>

            <strong>Country:</strong>
            ${airport.country}<br>

            <span class="code">
              ${airport.iata}
            </span>

          </div>

          <div class="actions">

            <button
              class="favorite-btn"
              onclick="toggleFavorite('${airport.iata}')"
            >

              ${isFavorite ? "❤️ Favorited" : "🤍 Favorite"}

            </button>

            <button
              class="map-btn"
              onclick="openMap('${airport.name}')"
            >
              Maps
            </button>

          </div>

        </div>

      </div>

    `;
  });

}



function toggleFavorite(code){

  if(favorites.includes(code)){

    favorites =
      favorites.filter(item => item !== code);

  }

  else{

    favorites.push(code);

  }

  localStorage.setItem(
    "favorites",
    JSON.stringify(favorites)
  );

  renderFavorites();

  const value = searchInput.value
    .toLowerCase()
    .trim();

  const filtered = airports.filter((airport)=>

    airport.name.toLowerCase().includes(value) ||

    airport.city.toLowerCase().includes(value) ||

    airport.country.toLowerCase().includes(value) ||

    airport.iata.toLowerCase().includes(value)

  );

  displayAirports(filtered.slice(0,30));

}



function renderFavorites(){

  favoriteAirports.innerHTML = "";

  if(favorites.length === 0){

    favoriteAirports.innerHTML = `
      <p style="color:#94a3b8;">
        No favorite airports yet.
      </p>
    `;

    return;
  }

  favorites.forEach((code)=>{

    favoriteAirports.innerHTML += `

      <div class="code">
        ❤️ ${code}
      </div>

    `;

  });

}



function openMap(name){

  window.open(
    `https://www.google.com/maps/search/${name}`,
    "_blank"
  );

}



/* HIDE DROPDOWN WHEN CLICK OUTSIDE */

document.addEventListener("click",(e)=>{

  if(!e.target.closest(".search-box")){

    suggestionsBox.innerHTML = "";

  }

});



renderFavorites();
