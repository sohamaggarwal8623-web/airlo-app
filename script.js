const airports = [
  {
    name: "Indira Gandhi International Airport",
    city: "Delhi",
    country: "India",
    iata: "DEL"
  },
  {
    name: "Chhatrapati Shivaji Maharaj International Airport",
    city: "Mumbai",
    country: "India",
    iata: "BOM"
  },
  {
    name: "Kempegowda International Airport",
    city: "Bengaluru",
    country: "India",
    iata: "BLR"
  },
  {
    name: "John F. Kennedy International Airport",
    city: "New York",
    country: "USA",
    iata: "JFK"
  },
  {
    name: "Dubai International Airport",
    city: "Dubai",
    country: "UAE",
    iata: "DXB"
  }
];

const searchInput = document.getElementById("searchInput");
const results = document.getElementById("results");

function displayAirports(data) {

  results.innerHTML = "";

  if (data.length === 0) {
    results.innerHTML = `
      <div class="card">
        <div class="airport-name">No Airport Found</div>
      </div>
    `;
    return;
  }

  data.forEach((airport) => {

    results.innerHTML += `
      <div class="card">

        <div class="airport-name">
          ${airport.name}
        </div>

        <div class="airport-info">
          <p><strong>City:</strong> ${airport.city}</p>
          <p><strong>Country:</strong> ${airport.country}</p>

          <span class="code">${airport.iata}</span>

          <div class="actions">
            <button onclick="saveAirport('${airport.iata}')">
              Save
            </button>

            <button onclick="helpAirport('${airport.name}')">
              Help
            </button>
          </div>
        </div>

      </div>
    `;
  });
}

searchInput.addEventListener("input", (e) => {

  const value = e.target.value.toLowerCase().trim();

  if (value === "") {
    results.innerHTML = "";
    return;
  }

  const filtered = airports.filter((airport) =>

    airport.name.toLowerCase().includes(value) ||
    airport.city.toLowerCase().includes(value) ||
    airport.country.toLowerCase().includes(value) ||
    airport.iata.toLowerCase().includes(value)

  );

  displayAirports(filtered);
});

function saveAirport(code) {
  alert(code + " saved successfully!");
}

function helpAirport(name) {
  alert("Help for " + name);
}
