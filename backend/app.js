const dotenv = require('dotenv');
dotenv.config();
const HTTP_PORT = process.env.PORT;
const HOST = process.env.HOST;

const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
const { sequelize } = require('./models');
sequelize.sync();

module.exports = { app };

const postController = require('./api/post/postController');
app.use('/', postController);

app.listen(HTTP_PORT, HOST, () => {
    console.log(`Server is running at http://${HOST}:${HTTP_PORT}`);
});