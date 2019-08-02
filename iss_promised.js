const request = require('request-promise-native');

const fetchMyIP = function() {
  return request("https://api.ipify.org?format=json");
};

const fetchCoordsByIP = function(body) {
  let IP = JSON.parse(body).ip;
  return request(`https://ipvigilante.com/${IP}`);
};

const fetchFlyOverTimes = function(body) {
  let lat = JSON.parse(body).data.latitude;
  let lon = JSON.parse(body).data.longitude;
  let alt = "1049";
  return request(`http://api.open-notify.org/iss-pass.json?lat=${lat}&lon=${lon}&alt=${alt}`)  
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};

module.exports = { nextISSTimesForMyLocation };