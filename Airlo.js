const DATA_URL =
  "https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat";

let airports = [];

/* LOAD AIRPORTS */

async function loadAirports(){

  try{

    const response =
      await fetch(DATA_URL);

    const text =
      await response.text();

    airports = parseCSV(text);

    document.getElementById("status").innerText =
      `Loaded ${airports.length} airports`;

  }

  catch(error){

    document.getElementById("status").innerText =
      "Failed to load airport database.";

    console.log(error);

  }

}

/* PARSE CSV */

function parseCSV(data){

  const lines = data.split("\n");

  return lines.map(line => {

    const parts = splitCSV(line);

    return {

      name: removeQuotes(parts[1]),
      city: removeQuotes(parts[2]),
      country: removeQuotes(parts[3]),
      iata: removeQuotes(parts[4]),
      icao: removeQuotes(parts[5]),
      lat: removeQuotes(parts[6]),
      lon: removeQuotes(parts[7])

    };

  }).filter(airport => airport.name);

}

/* SPLIT CSV */

function splitCSV(line){

  const result = [];

  let current = "";

  let insideQuotes = false;

  for(let i = 0; i < line.length; i++){

    const char = line[i];

    if(char === '"'){

      insideQuotes = !insideQuotes;

    }

    else if(char === "," && !insideQuotes){

      result.push(current);

      current = "";

    }

    else{

      current += char;

    }

  }

  result.push(current);

  return result;

}

/* REMOVE QUOTES */

function removeQuotes(str){

  return str
    ? str.replace(/^"|"$/g, "")
    : "";

}

/* SEARCH */

function searchAirport(){

  const query = document
    .getElementById("searchInput")
    .value
    .trim()
    .toLowerCase();

  const resultsDiv =
    document.getElementById("results");

  resultsDiv.innerHTML = "";

  if(!query){

    return;

  }

  const filtered = airports.filter(airport => {

    return (

      airport.name.toLowerCase().includes(query)

      ||

      airport.city.toLowerCase().includes(query)

      ||

      airport.country.toLowerCase().includes(query)

      ||

      airport.iata.toLowerCase() === query

    );

  }).slice(0, 50);

  if(filtered.length === 0){

    resultsDiv.innerHTML =
      "<h2>No airports found.</h2>";

    return;

  }

  filtered.forEach(airport => {

    const card =
      document.createElement("div");

    card.className = "card";

    card.innerHTML = `

      <div class="airport-name">
        ${airport.name}
      </div>

      <div class="info">
        <strong>City:</strong>
        ${airport.city}
      </div>

      <div class="info">
        <strong>Country:</strong>
        ${airport.country}
      </div>

      <div class="info">
        <strong>ICAO:</strong>
        ${airport.icao || "N/A"}
      </div>

      <div class="info">
        <strong>Coordinates:</strong>
        ${airport.lat}, ${airport.lon}
      </div>

      <div class="iata">
        ${airport.iata || "No IATA"}
      </div>

      <br>

      <a
        class="map-btn"
        href="https://www.google.com/maps?q=${airport.lat},${airport.lon}"
        target="_blank"
      >
        View on Map
      </a>

      <button
        class="save-btn"
        onclick="saveAirport(
          '${airport.name}',
          '${airport.city}',
          '${airport.country}',
          '${airport.iata}'
        )"
      >
        Save Airport
      </button>

    `;

    resultsDiv.appendChild(card);

  });

}

/* SAVE AIRPORT */

function saveAirport(name, city, country, iata){

  let savedAirports =

    JSON.parse(
      localStorage.getItem("savedAirports")
    )

    ||

    [];

  const airportData = {

    name:name,
    city:city,
    country:country,
    iata:iata

  };

  savedAirports.push(airportData);

  localStorage.setItem(

    "savedAirports",

    JSON.stringify(savedAirports)

  );

  alert("Airport Saved Successfully!");

  loadSavedAirports();

}

/* LOAD SAVED */

function loadSavedAirports(){

  const savedAirports =

    JSON.parse(
      localStorage.getItem("savedAirports")
    )

    ||

    [];

  const savedDiv =

    document.getElementById("savedResults");

  savedDiv.innerHTML = "";

  savedAirports.forEach(airport => {

    const card =
      document.createElement("div");

    card.className = "card";

    card.innerHTML = `

      <div class="airport-name">
        ${airport.name}
      </div>

      <div class="info">
        <strong>City:</strong>
        ${airport.city}
      </div>

      <div class="info">
        <strong>Country:</strong>
        ${airport.country}
      </div>

      <div class="iata">
        ${airport.iata || "No IATA"}
      </div>

    `;

    savedDiv.appendChild(card);

  });

}

/* ENTER KEY */

document
  .getElementById("searchInput")
  .addEventListener("keypress", function(e){

    if(e.key === "Enter"){

      searchAirport();

    }

  });

loadAirports();

loadSavedAirports();
