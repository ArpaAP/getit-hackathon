const dotenv = require("dotenv");
dotenv.config();
const HTTP_PORT = process.env.PORT;
const HOST = process.env.HOST;

const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const { sequelize } = require("./models");
sequelize.sync();

module.exports = { app };

const kakaoController = require("./api/kakao/kakaoController");
app.use("/kakao", kakaoController);

const placeController = require("./api/places/placeController");
app.use("/places", placeController);

app.listen(HTTP_PORT, HOST, () => {
  console.log(`Server is running at http://${HOST}:${HTTP_PORT}`);
});
