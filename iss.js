const request = require("request");

const fetchMyIP = function(callback) {

  request("https://api.ipify.org?format=json", (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP. Response: ${body}`), null);
      return;
    }
    const IP = JSON.parse(body).ip;
    return callback(null, IP);
  });
};

const fetchCoordsByIP = function(IP, callback) {

  request(`https://ipvigilante.com/${IP}`, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP. Response: ${body}`), null);
      return;
    }

    const lat = JSON.parse(body).data.latitude;
    const long = JSON.parse(body).data.longitude;
    const coords = {lat, long};

    return callback(null, coords);
  });
};
    
module.exports = { fetchMyIP, fetchCoordsByIP };