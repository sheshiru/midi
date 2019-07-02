require("dotenv").config();
require("./config/db_connection"); // database initial setup
require("./utils/helper");

const express = require("express");
const hbs = require("hbs");
const app = express();
const mongoose = require("mongoose");
const basePageRouter = require("./routes/index");
const restaurantsRouter = require("./routes/restaurant-details");
const googleRouter = require("./routes/google_distance");
// const randomRouter = require("./routes/random");
// const authRou\er = require("./routes/auth");

app.set("view engine", "hbs"); //
app.set("views", __dirname + "/views"); //
app.use(express.static("public"));
hbs.registerPartials(__dirname + "/views/partials");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(basePageRouter);
app.use(restaurantsRouter);
app.use(googleRouter);
// app.use(randomRouter);
// app.use("/", authRouter);

app.locals.site_url = process.env.SITE_URL;
// used in front end to perform ajax request on a url var instead of hardcoding it

app.use(function(req, res, next) {
  res
    .status(404)
    .send("This route does not exists! Check if everything is ok!");
});

const listener = app.listen(process.env.PORT || 7000, () => {
  console.log(`app started at ${process.env.SITE_URL}`);
});
