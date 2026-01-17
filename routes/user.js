const express = require("express");
const router = express.Router();
const { listingSchema } = require("../schema.js");
const User = require("../models/user.js");
const {saveRedirectUrl} = require("../middleware.js")

// router.get for signup page
router.get("/signup", (req, res) => {
  res.render("users/signup.ejs");
});

// router.post for signup form after submit
router.post("/signup", async (req, res) => {
  try {
    const result = listingSchema.validate(req.body); //yaha schema validate kiya jo humne schema.js mein (joi) banaya hai
    console.log(result);
    const { email, username, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    //automatically login the user after signup
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Welcome, You are succesfully Signed up!"); //flash message set kiya
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
});
    
const passport = require("passport");

// GET login page
router.get("/login", (req, res) => {
  res.render("users/login.ejs");
});

// POST login form after submit
router.post(
  "/login", saveRedirectUrl,
  passport.authenticate("local", {  //check karega credentials. If valid, user ko login kar dega, otherwise failureRedirect pe bhej dega
    failureRedirect: "/login",
    failureFlash: true,
  }), 
  async(req, res) => {
    req.flash("success", "Welcome, You are succesfully logged in!");
    res.redirect(res.locals.redirectUrl);
  }
);

// logout route
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "Logged you out!");
    res.redirect("/listings");
  });
});

module.exports = router;
