/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const { fetchMyIP } = require("./iss.js");
const { fetchCoordsByIP } = require("./iss.js");
const { fetchISSFlyOverTimes } = require("./iss.js");

/*
fetchMyIP((error, IP) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }
  console.log("It worked! Returned IP:", IP);
  // use request to fetch IP address from JSON API
});

fetchCoordsByIP("184.68.214.222", (error, coords) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }
  console.log(coords);
});


fetchISSFlyOverTimes({ lat: '51.12640', lon: '-114.14190' }, (error, passTimes) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }
  console.log(passTimes);
});

*/
const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    
    const duration = pass.duration;
    
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  printPassTimes(passTimes);
});