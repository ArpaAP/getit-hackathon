const axios = require("axios");

const getKeywordSearch = async (params) => {
  try {
    let r = await axios.get(
      "https://dapi.kakao.com/v2/local/search/keyword.json",
      {
        params,
        headers: {
          Authorization: `KakaoAK ${process.env.KAKAO_API_REST_KEY}`,
        },
      }
    );

    return r.data;
  } catch (err) {
    console.error("kakaoService.getKeywordSearch error");
    console.error(err.response.data);

    throw err;
  }
};

const getCategorySearch = async (params) => {
  try {
    let r = await axios.get(
      "https://dapi.kakao.com/v2/local/search/category.json",
      {
        params,
        headers: {
          Authorization: `KakaoAK ${process.env.KAKAO_API_REST_KEY}`,
        },
      }
    );

    return r.data;
  } catch (err) {
    console.error("kakaoService.getCategorySearch error");
    console.error(err.response.data);

    throw err;
  }
};

module.exports = { getKeywordSearch, getCategorySearch };
