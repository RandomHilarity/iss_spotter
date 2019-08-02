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
      return callback(Error(`Status Code ${response.statusCode} when fetching IP. Response: ${body}`), null);
    }

    const { latitude, longitude } = JSON.parse(body).data;

    console.log({ latitude, longitude});
    callback(null, { latitude, longitude });
  });
};
    
const fetchISSFlyOverTimes = function(coords, callback) {
  
  const lat = coords.latitude;
  const lon = coords.longitude;
  const alt = "1049";

  request(`http://api.open-notify.org/iss-pass.json?lat=${lat}&lon=${lon}&alt=${alt}`, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      return callback(Error(`Status Code ${response.statusCode} when fetching IP. Response: ${body}`), null);
    }

    const passes = JSON.parse(body).response;
    callback(null, passes);
  });
};

/*
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results.
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    fetchCoordsByIP(ip, (error, location) => {
      if (error) {
        return callback(error, null);
      }
      fetchISSFlyOverTimes(location, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }
        callback(null, nextPasses);
      });
    });
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };