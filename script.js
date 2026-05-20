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
    name: "Los Angeles International Airport",
    city: "Los Angeles",
    country: "USA",
    iata: "LAX"
  },
  {
    name: "Dubai International Airport",
    city: "Dubai",
    country: "UAE",
    iata: "DXB"
  },
  {
    name: "Heathrow Airport",
    city: "London",
    country: "UK",
    iata: "LHR"
  },
  {
    name: "Singapore Changi Airport",
    city: "Singapore",
    country: "Singapore",
    iata: "SIN"
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

  data.forEach(airport => {
    results.innerHTML += `
      <div class="card">
        <div class="airport-name">${airport.name}</div>

        <div class="airport-info">
          City: ${airport.city}<br>
          Country: ${airport.country}<br>

          <span class="code">${airport.iata}</span>
        </div>
      </div>
    `;
  });
}

displayAirports(airports);

searchInput.addEventListener("input", (e) => {

  const value = e.target.value.toLowerCase();

  const filtered = airports.filter(airport =>
    airport.name.toLowerCase().includes(value) ||
    airport.city.toLowerCase().includes(value) ||
    airport.country.toLowerCase().includes(value) ||
    airport.iata.toLowerCase().includes(value)
  );

  displayAirports(filtered);
});
