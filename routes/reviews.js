const express = require("express")
const router = express.Router();
const Review = require("../models/review.js");
const Listing1 = require("../models/listing.js");
const { isloggedIn, isLoggedIn } = require("../middleware.js");

// Reviews route
router.post("/:id/reviews", isLoggedIn, Asyncwrap(async (req, res) => {
  let listing = await Listing1.findById(req.params.id);
  const newReview = new Review(req.body.review);
  listing.reviews.push(newReview); //pushing object id into array
  await newReview.save();
  await listing.save();                                   
  console.log(listing); 
  req.flash("success", "Successfully added a new review!");//flash message set kiya
  res.redirect(`/listings/${listing._id}`); 
}));
 
// Delete Review Route
router.delete("/:reviewId/:listingId", isLoggedIn, Asyncwrap(async (req, res) => {
  let { reviewId, listingId} = req.params;
  let deleteReview = await Review.findByIdAndDelete(reviewId);
  console.log(deleteReview);
  req.flash("success", "Successfully deleted the review!");//flash message set kiya
  res.redirect(`/listings/${listingId}`);
}));

// Asyncwrap, is a error handler that is also return a function and there is no need write try catch in every route, jis bhi route mein error aayega vo is function ke through handle hoga
function Asyncwrap(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch((err) => next(err));
  };
}

module.exports = router;


