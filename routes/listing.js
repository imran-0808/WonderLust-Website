const express = require("express")
const router = express.Router();
const ExpressError1 = require("../ExpressError.js");
const { listingSchema } = require("../schema.js");
const Listing1 = require("../models/listing.js");
const { isLoggedIn } = require("../middleware.js");
const { isOwner } = require("../middleware.js")

//index Route
router.get("/", async (req, res) => {
  const allListings1 = await Listing1.find({});
  res.render("index.ejs", { allListings1 });
});
 
// create Route
router.get("/new", isLoggedIn, (req, res) => {
  res.render("create.ejs"); 
});

// Asyncwrap, is a error handler that is also return a function and there is no need write try catch in every route, jis bhi route mein error aayega vo is function ke through handle hoga
function Asyncwrap(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch((err) => next(err));
  };
}

// create Route, after submit 
router.post("/", async (req, res, next) => {
  let result = listingSchema.validate(req.body); //yaha schema validate kiya jo humne schema.js mein (joi) banaya hai
  console.log(result);
  if (result.error) {
    throw new ExpressError1(400, result.error); //yaha humne custom error class banaya hai jiska use hum yaha kar rahe hai
  }
  const newListings = new Listing1(req.body.listing0);
  newListings.owner = req.user._id; //ye line isliye hai taaki jab koi listing create kare to uska owner bhi set ho jaye
  await newListings.save();
  req.flash("success", "Successfully created a new listing!");//flash message set kiya
  res.redirect("/listings");
});

// Show Route, id ke according route open hoga
router.get("/:id", Asyncwrap(async (req, res, next) => { //Asyncwrap function, hum ek wrapper function likhte hain jo asynchronous fun ke error ko express ke next() middleware ko pass karta hai
    //called Asyncwrap function
    let { id } = req.params;
    let listingId = await Listing1.findById(id).populate("reviews"); // populate use karte hain agar relation hai 
    if(!listingId){ //agar hum aesa listing id ko access karne ki koshish karte hain jo db mein exist nahi karti to vo error dega isiliye humne ye check lagaya hai
      req.flash("error", "You requested a listing that does not exist!");
      return res.redirect("/listings");
    }
    res.render("show.ejs", { listingId });
  })
); 

// Edit Route
router.get("/:id/edit", isLoggedIn, async (req, res, next) => {
  try {
    //we used here try catch method
    let { id } = req.params;
    let listing2 = await Listing1.findById(id);
    res.render("edit.ejs", { listing2 });
  } catch (err) {
    next(err);
  }
});

// Edit Route after submit
router.put("/:id", isLoggedIn, async (req, res) => {
  let { id } = req.params;
  await Listing1.findByIdAndUpdate(id, { ...req.body.listing2 }); //yaha object ko deconstruct kiya
  req.flash("success", "Successfully updated the listing!");//flash message set kiya
  res.redirect(`/listings/${id}`);
});

// Delete Route
router.delete("/:id", isLoggedIn, isOwner, async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing1.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success", "Successfully deleted the listing!");//flash message set kiya
  res.redirect("/listings");
});

const handleValidationError = (err) => {
  console.log("This was a validation error");
  console.dir(err);
  return err;
};

router.use((err, req, res, next) => {
  console.log(err.name);
  if (err.name === "ReferenceError") {
    console.log("This Refrence Error is please follow the rule !");
    err = handleValidationError(err); //yaha is function ko call kiya aur arguement bhi pass kiya, ye jo bhi error kisi route mein aayega vo next ki help se is middleware mein aayega fir vo err args mein pass hokar is func ki under operation perform karega jaha bhi ye function created hoga
  }
  next(err);
});

//middleware
router.use((err, req, res, next) => {
  let { status = 500, message = "Some Error Occured !" } = err;
  // res.status(status).send(message);
  res.render("error.ejs", { message });
});

// router.all("*", (req, res, next) => { //router.all ki help se hum sabhi routes ko catch kar sakte hain jo defined nahi hain
//   res.status(404).send("Route not found")
// })

module.exports = router; 