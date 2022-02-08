const ipAPI =
  "https://geo.ipify.org/api/v2/country,city?apiKey=at_sk0QeXSyRd5htfsgJj8NxwHuHijia&ipAddress=213.118.163.190";

let lat = 0;
let lng = 0;

const ipAddress = document.getElementById("ip_address");
const ipLocation = document.getElementById("ip_location");
const timeZone = document.getElementById("time_zone");
const isp = document.getElementById("isp");

fetch(ipAPI)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    ipAddress.textContent = data.ip;
    ipLocation.textContent = `${data.location.city}, ${data.location.country} ${data.location.postalCode}`;
    timeZone.textContent = data.location.timezone;
    isp.textContent = data.isp;
    lat = data.location.lat;
    lng = data.location.lng;
  });
