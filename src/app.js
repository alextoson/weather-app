const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define patha for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Alex Toson",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Alex Toson",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Alex Toson",
    message: "This is the help page",
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address;

  if (!address) {
    return res.send({
      error: "Address must be provided",
    });
  }

  geocode(address, (error, { longitude, latitude, location } = {}) => {
    if (error) {
      return res.send({
        error,
      });
    }
    forecast(longitude, latitude, (error, forecast) => {
      if (error) {
        return res.send({
          error,
        });
      }

      res.send({
        forecast,
        location,
        address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("not-found", {
    title: "404 Not Found",
    name: "Alex Toson",
    message: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("not-found", {
    title: "404 Not Found",
    name: "Alex Toson",
    message: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});