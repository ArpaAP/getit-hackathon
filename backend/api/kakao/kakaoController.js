const express = require("express");
const router = express.Router();
const kakaoService = require("./kakaoService");

const getKakaoKeywordSearch = async (req, res, next) => {
  try {
    let data = await kakaoService.getKeywordSearch(req.query);
    res.status(200).json(data);
  } catch (err) {
    res.status(404);
    next(err);
  }
};

const getKakaoCategorySearch = async (req, res, next) => {
  try {
    let data = await kakaoService.getCategorySearch(req.query);
    res.status(200).json(data);
  } catch (err) {
    res.status(404);
    next(err);
  }
};

router.get("/keywordSearch", getKakaoKeywordSearch);
router.get("/categorySearch", getKakaoCategorySearch);
module.exports = router;
