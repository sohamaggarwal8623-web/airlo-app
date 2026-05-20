const searchInput = document.getElementById("searchInput");
const results = document.getElementById("results");
const count = document.getElementById("count");
const savedAirports = document.getElementById("savedAirports");

let airports = [];
let saved = [];

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

  if(value === "") return;

  const filtered = airports.filter((airport)=>

    airport.name.toLowerCase().includes(value) ||

    airport.city.toLowerCase().includes(value) ||

    airport.country.toLowerCase().includes(value) ||

    airport.iata.toLowerCase().includes(value)

  );

  displayAirports(filtered.slice(0, 30));

});

function displayAirports(data){

  if(data.length === 0){

    results.innerHTML = `
      <div class="card">
        <div class="airport-name">
          No Airport Found
        </div>
      </div>
    `;

    return;
  }

  data.forEach((airport)=>{

    results.innerHTML += `

      <div class="card">

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
            class="save-btn"
            onclick="saveAirport('${airport.iata}')"
          >
            Save
          </button>

          <button
            class="map-btn"
            onclick="openMap('${airport.name}')"
          >
            Maps
          </button>

        </div>

      </div>

    `;
  });

}

function saveAirport(code){

  if(saved.includes(code)) return;

  saved.push(code);

  savedAirports.innerHTML += `
    <div class="saved-item">
      ${code}
    </div>
  `;
}

function openMap(name){

  window.open(
    `https://www.google.com/maps/search/${name}`,
    "_blank"
  );

}
