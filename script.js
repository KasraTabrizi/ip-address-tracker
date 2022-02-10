//Global variables
let ipAPI = "";
let latValue = 0;
let lngValue = 0;
let map;

//Define regular expression for checking on IP addresses and domain names.
const ipAddressRegex = new RegExp(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/);
const domainNameRegex = new RegExp(/([a-z0-9]+\.)*[a-z0-9]+\.[a-z]+/);

//get Elements
const ipAddress = document.getElementById("ip_address");
const ipLocation = document.getElementById("ip_location");
const timeZone = document.getElementById("time_zone");
const isp = document.getElementById("isp");
const input = document.getElementById("ip_input");
const searchButton = document.getElementById("search_button");

//Default state

searchButton.addEventListener("click", () => {
  console.log(ipAddressRegex.test(input.value));
  console.log(domainNameRegex.test(input.value));

  if (ipAddressRegex.test(input.value)) {
    ipAPI = `https://geo.ipify.org/api/v2/country,city?apiKey=at_sk0QeXSyRd5htfsgJj8NxwHuHijia&ipAddress=${input.value}`;
  } else if (domainNameRegex.test(input.value)) {
    ipAPI = `https://geo.ipify.org/api/v2/country,city?apiKey=at_sk0QeXSyRd5htfsgJj8NxwHuHijia&domain=${input.value}`;
  } else {
    //error
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

      if (map != undefined) {
        map.remove();
      }

      map = L.map("map", { zoomControl: false }).setView(
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

      let customIcon = L.icon({
        iconUrl: "images/icon-location.svg",
        iconSize: [46, 56],
        iconAnchor: [12, 56],
      });

      L.marker([latValue, lngValue], { icon: customIcon }).addTo(map);
    });
});
