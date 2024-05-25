const axios = require("axios");
const { Place } = require("../../models");

const getPlaces = async () => {
  try {
    let r = await Place.findAll();

    return r;
  } catch (err) {
    console.error("placeService.getPlaces error");

    throw err;
  }
};

module.exports = { getPlaces };
