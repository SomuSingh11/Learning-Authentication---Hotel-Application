const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const db = require("./connection");
const Person = require("./model/Person");
const MenuItem = require("./model/MenuItems");
const personRoute = require("./routes/personRoutes");
const menuRoutes = require("./routes/menuRoutes");
const passport = require("./services/auth");

//// Initialising Passport
app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate("local", { session: false });

/////Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

////Routes , localAuthMiddleware
app.use("/person", personRoute);
app.use("/menu", menuRoutes);

app.listen(port, () => {
  console.log(`Listening on the PORT = ${port}`);
});
