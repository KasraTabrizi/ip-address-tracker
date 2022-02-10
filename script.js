const ipAPI =
  "https://geo.ipify.org/api/v2/country,city?apiKey=at_sk0QeXSyRd5htfsgJj8NxwHuHijia&ipAddress=213.118.163.190";

let latValue = 0;
let lngValue = 0;

const ipAddress = document.getElementById("ip_address");
const ipLocation = document.getElementById("ip_location");
const timeZone = document.getElementById("time_zone");
const isp = document.getElementById("isp");
const input = document.getElementById("ip_input");
const searchButton = document.getElementById("search_button");

searchButton.addEventListener("click", () => {
  console.log(input.value);
});

fetch(ipAPI)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    ipAddress.textContent = data.ip;
    ipLocation.textContent = `${data.location.city}, ${data.location.country} ${data.location.postalCode}`;
    timeZone.textContent = "UTC " + data.location.timezone;
    isp.textContent = data.isp;
    latValue = data.location.lat;
    lngValue = data.location.lng;

    var map = L.map("map", { zoomControl: false }).setView(
      [latValue, lngValue],
      15
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
  });
