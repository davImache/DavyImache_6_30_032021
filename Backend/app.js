const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const userRoutes  = require("./routes/userRoutes");
const sauceRoutes  = require("./routes/sauceRoutes");
const path = require('path');
const helmet = require("helmet");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});
app.use(helmet());
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use("/api/auth", userRoutes);
app.use("/api/sauces", sauceRoutes);

module.exports = app;
