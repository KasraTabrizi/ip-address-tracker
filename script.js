//Global variables
let ipAPI = "";
let latValue = 50;
let lngValue = 5;
let zoomLevel = 3;
let map;

//Define regular expression for checking on IP addresses and domain names.
const ipAddressRegex = new RegExp(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/);
const domainNameRegex = new RegExp(/([a-z0-9]+\.)*[a-z0-9]+\.[a-z]+/);

//Get Elements
const ipAddress = document.getElementById("ip_address");
const ipLocation = document.getElementById("ip_location");
const timeZone = document.getElementById("time_zone");
const isp = document.getElementById("isp");
const input = document.getElementById("ip_input");
const searchButton = document.getElementById("search_button");
const additionalInfoContainer = document.getElementsByClassName(
  "additional__information "
)[0];

//Default state
//hide additional information
window.onload = () => {
  //show map of the world
  showMap(latValue, lngValue, zoomLevel);
};

searchButton.addEventListener("click", () => {
  if (ipAddressRegex.test(input.value)) {
    ipAPI = `https://geo.ipify.org/api/v2/country,city?apiKey=at_sk0QeXSyRd5htfsgJj8NxwHuHijia&ipAddress=${input.value}`;
  } else if (domainNameRegex.test(input.value)) {
    ipAPI = `https://geo.ipify.org/api/v2/country,city?apiKey=at_sk0QeXSyRd5htfsgJj8NxwHuHijia&domain=${input.value}`;
  } else {
    input.value = "Invalid input. Please try again.";
    input.style.color = "red";
  }

  fetch(ipAPI)
    .then((res) => res.json())
    .then((data) => {
      ipAddress.textContent = data.ip;
      ipLocation.textContent = `${data.location.city}, ${data.location.country} ${data.location.postalCode}`;
      timeZone.textContent = "UTC " + data.location.timezone;
      isp.textContent = data.isp;
      latValue = data.location.lat;
      lngValue = data.location.lng;
      zoomLevel = 15;
      additionalInfoContainer.classList.add("additional__information");
      additionalInfoContainer.classList.add("active");

      //remove old layer to update map with new coordinates
      if (map != undefined) {
        map.remove();
      }

      showMap(latValue, lngValue, zoomLevel);
    });
});

function showMap(latValue, lngValue, zoomLevel) {
  map = L.map("map", { zoomControl: false }).setView(
    [latValue, lngValue],
    zoomLevel
  );

  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
      accessToken:
        "pk.eyJ1Ijoia2FzcmF0YWJyaXppIiwiYSI6ImNremZnMnN1YjJzZW8yb245YmQ1NXQwajgifQ.5WusdASChE1YPhQyXj3P8Q",
    }
  ).addTo(map);

  let customIcon = L.icon({
    iconUrl: "images/icon-location.svg",
    iconSize: [46, 56],
    iconAnchor: [12, 56],
  });

  L.marker([latValue, lngValue], { icon: customIcon }).addTo(map);
}
