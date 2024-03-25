const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

dotenv.config({ path: 'config/config.env' });

const user = require('./routes/userRoutes.js');
const product = require('./routes/productRoutes.js');
const reviewProduct = require('./routes/reviewProductRoute.js');

app.use('/api/v1', user);
app.use('/api/v1', product);
app.use('/api/v1', reviewProduct);

module.exports = app;