
let container = document.createElement("div");
container.classList.add("container", "mt-5", "bg-white");
document.body.appendChild(container);
let rowData = document.createElement("div");
rowData.classList.add("row");
rowData.setAttribute("id", "countryInfo");
container.appendChild(rowData);


document.addEventListener("DOMContentLoaded", () => {
  const countriesToDisplay = ["India", "Australia", "Japan"];

  countriesToDisplay.forEach((countryName) => {
    let url = "https://restcountries.com/v3.1/all";
    fetch(url)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((val) => {
        let countryDetails = val.filter(
          (element) => element.name.common === countryName
        );
        countryDetails.forEach((ele) => {
          let countryName1 = ele.name.common;
          let countryCapital = ele.capital;
          let countryRegion = ele.region;
          let countryCode = ele.cca3;
          let countryFlag = ele.flags;
          let lat = ele.latlng[0];
          let lon = ele.latlng[1];
          const card = getDetails(
            countryName1,
            countryCapital,
            countryRegion,
            countryCode,
            countryFlag.png,
            lat,
            lon
          );
          document.getElementById("countryInfo").appendChild(card);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });

  function getDetails(
    countryName1,
    countryCapital,
    countryRegion,
    countryCode,
    countryFlag,
    lat,
    lon
  ) {
    let card = document.createElement("div");
    card.classList.add("col-md-4", "mb-3");

    card.innerHTML = `<div id="card1" class="card bg-light m-4 " style="width: 18rem;"><div class=" card-header bg-dark p-2" id="countryName">${countryName1}</div>
 <div class="card-body">
 <img src="${countryFlag} "id = "flag" class="p-2 mb-2">
   <p class="card-text bg-dark p-2">Capital : ${countryCapital}</p>
   <p class="card-text bg-dark p-2">Region : ${countryRegion}</p>
   <p class="card-text bg-dark p-2">Country Code : ${countryCode}</p>
   
 </div><span><button  class="btn btn-primary m-2" type="text" id="btn-${countryName1.replace(
   " ",
   "-"
 )}">Click for Weather</button> </span><div class="bg-info" id="weather-${countryName1.replace(
      " ",
      "-"
    )}" class="mt-3"></div>
 
</div></div>`;

    const weatherButton = card.querySelector(
      `#btn-${countryName1.replace(" ", "-")}`
    );
    weatherButton.addEventListener("click", () => {
      buttonData(countryName1, lat, lon);
    });
    return card;
  }

  function buttonData(countryName1, lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=80836a1de1d836417c5982e04efbdf5b
    `)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((weatherData) => {
        const weatherDiv = document.getElementById(
          `weather-${countryName1.replace(" ", "-")}`
        );
        const temperature = (weatherData.main.temp - 273.15).toFixed(2); // Convert Kelvin to Celsius
        const weatherDescription = weatherData.weather[0].description;
        weatherDiv.innerHTML = `Weather: ${temperature}°C, ${weatherDescription}`;
      })
      .catch((error) =>
        console.error(`Error fetching weather data for ${countryName1}:`, error)
      );
  }
});