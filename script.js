const airports = [

  {
    name: "Indira Gandhi International Airport",
    city: "Delhi",
    country: "India",
    iata: "DEL",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05"
  },

  {
    name: "Chhatrapati Shivaji Maharaj International Airport",
    city: "Mumbai",
    country: "India",
    iata: "BOM",
    image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3"
  },

  {
    name: "John F. Kennedy International Airport",
    city: "New York",
    country: "USA",
    iata: "JFK",
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd"
  },

  {
    name: "Dubai International Airport",
    city: "Dubai",
    country: "UAE",
    iata: "DXB",
    image: "https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad"
  },

  {
    name: "Heathrow Airport",
    city: "London",
    country: "UK",
    iata: "LHR",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05"
  }

];

const searchInput = document.getElementById("searchInput");
const results = document.getElementById("results");

results.innerHTML = "";

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

    results.innerHTML += `

      <div class="card">

        <img src="${airport.image}" alt="${airport.name}">

        <div class="card-content">

          <div class="airport-name">
            ${airport.name}
          </div>

          <div class="airport-info">

            City: ${airport.city}<br>
            Country: ${airport.country}<br>

            <span class="code">
              ${airport.iata}
            </span>

          </div>

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

searchInput.addEventListener("input",(e)=>{

  const value = e.target.value.toLowerCase().trim();

  if(value === ""){
    results.innerHTML = "";
    return;
  }

  const filtered = airports.filter((airport)=>

    airport.name.toLowerCase().includes(value) ||
    airport.city.toLowerCase().includes(value) ||
    airport.country.toLowerCase().includes(value) ||
    airport.iata.toLowerCase().includes(value)

  );

  displayAirports(filtered);

});

function saveAirport(code){

  alert(code + " saved successfully!");

}

function helpAirport(name){

  alert("Help for " + name);

}
