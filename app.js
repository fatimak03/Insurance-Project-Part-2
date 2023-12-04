const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require('express-session');
const bcrypt = require('bcrypt');
const claimsRouter = require('./routes/claims');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));
app.set("view engine", "ejs");

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/InsuranceProject", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define or import User model here...

// Middleware to check if the user is authenticated
function checkAuthenticated(req, res, next) {
  if (req.session.userId) {
    return next();
  }
  res.redirect('/login');
}

// Regular routes
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/services", (req, res) => {
  res.render("services");
});

// Authentication routes
// ... (register and login routes)

// Use the claims routes from claims.js
app.use('/claims', claimsRouter);

// ... (other routes)

const PORT = process.env.PORT || 4040;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




