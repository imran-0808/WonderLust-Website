const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing1 = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

//mongoDB setup
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    //called main function
    console.log("connected to DB");
  })
  .then((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect(MONGO_URL);
} //.

app.set("view engine", "ejs"); //yaha ejs ko set kiya
app.set("views", path.join(__dirname, "views")); //added views directory
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public"))); //static file

app.get("/", async (req, res) => {
  res.send("hey root node");
});
//index Route
app.get("/listings", async (req, res) => {
  const allListings1 = await Listing1.find({});
  res.render("index.ejs", { allListings1 });
});

//New Route
app.get("/listings/new", (req, res) => {
  res.render("new.ejs");
});

// Show Route, id ke according route open hoga
app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  let listingId = await Listing1.findById(id);
  res.render("show.ejs", { listingId });
});

// Create Route
app.post("/listings", async (req, res) => {
  const newListings = new Listing1(req.body.listing0);
  await newListings.save();
  res.redirect("/listings");
});

// Edit Route
app.get("/listings/:id/edit", async (req, res) => {
  let { id } = req.params;
  let listing2 = await Listing1.findById(id);
  res.render("edit.ejs", { listing2 });
});

// update Route after submit
app.put("/listings/:id", async (req, res) => {
  let { id } = req.params;
  await Listing1.findByIdAndUpdate(id, { ...req.body.listing2 }); //yaha object ko deconstruct kiya
  res.redirect(`/listings/${id}`);
});

// Delete Route
app.delete("/listings/:id", async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing1.findByIdAndDelete(id);
  console.log(deletedListing);
  res.redirect("/listings");
});

// Terms Route
app.get("/terms", async (req, res) => {
  res.render("terms.ejs");
});

// Privacy Route
app.get("/privacy", async (req, res) => {
  res.render("privacy.ejs");
});

app.listen(8080, () => {
  console.log("server is listening at port localhost:8080");
});
