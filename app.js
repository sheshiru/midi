require("dotenv").config();
require("./config/db_connection"); // database initial setup
require("./utils/helper");

const express = require("express");
const hbs = require("hbs");
const app = express();
const mongoose = require("mongoose");
const basePageRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const restaurantsRouter = require("./routes/restaurant-details");
const contributeRouter = require("./routes/contribute");
const adminFormRouter = require("./routes/admin-forms");
const randomRouter = require("./routes/random");
const editRestau = require("./routes/edit");
const deleteRestau = require("./routes/delete");
const userAccount = require("./routes/user-account");
const apiRouter = require("./routes/api-routes");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const cookieParser = require("cookie-parser");
const favorites = require("./routes/favorites");

app.set("view engine", "hbs"); //
app.set("views", __dirname + "/views"); //
app.use(express.static("public"));
hbs.registerPartials(__dirname + "/views/partials");
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 6000000 }, // in millisec
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60 // 1 day
    }),
    saveUninitialized: true,
    resave: true
  })
);

function isLoggedIn(req, res, next) {
  app.locals.isLoggedIn = Boolean(req.session.currentUser);
  next();
}

app.use(isLoggedIn);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(basePageRouter);
app.use("/", authRouter);
app.use("/api", apiRouter);
app.use(restaurantsRouter);
app.use(contributeRouter);
app.use(adminFormRouter);
app.use(randomRouter);
app.use(editRestau);
app.use(deleteRestau);
app.use(userAccount);
app.use(favorites);
app.use(cookieParser());

app.locals.site_url = process.env.SITE_URL;
// used in front end to perform ajax request on a url var instead of hardcoding it
app.locals.api_key = process.env.API_KEY;

app.use(function(req, res, next) {
  res
    .status(404)
    .send("This route does not exists! Check if everything is ok!");
});

const listener = app.listen(process.env.PORT || 7000, () => {
  console.log(`app started at ${process.env.SITE_URL}`);
});
