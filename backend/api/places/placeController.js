const express = require("express");
const router = express.Router();
const placeService = require("./placeService");

const getPlaces = async (req, res, next) => {
  try {
    let data = await placeService.getPlaces();
    res.status(200).json(data);
  } catch (err) {
    res.status(404);
    next(err);
  }
};

router.get("/", getPlaces);
module.exports = router;
