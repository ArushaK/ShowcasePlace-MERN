const axios = require("axios");

const API_KEY = "AIzaSyAIFs1UgqyCOAdjossm7Uyu3yYkhctmjDw";
const HttpError = require("../models/http-error");

async function getCoordsForAddress(address) {
  // const response = await axios.get(
  //   `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
  //     address
  //   )}&key=${API_KEY}`
  // );

  // const data = response.data;
  // if (!data || data.status === "ZERO_RESULTS") {
  //   const error = new HttpError(
  //     "Could not find location for the specified address",
  //     422
  //   );
  //   throw error;
  // }
  // console.log(data);
  //const coordinates = data.results[0].geometry.location;

  //return coordinates;
  return { lat: 65.6582711, lng: -22.5269889 };
}

module.exports = getCoordsForAddress;
