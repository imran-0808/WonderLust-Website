// humne is project ko Restructure kar diya hai isiliye har route ko ek alag file mein rakha gya hai
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");           //importing passport for authentication
const LocalStrategy = require("passport-local"); //importing passport-local for local strategy  authentication
const User = require("./models/user.js");       //importing User model

const listingRouter = require("./routes/listing.js");//importing listing routes
const reviewRouter = require("./routes/reviews.js");//importing review routes
const userRouter = require("./routes/user.js")

//mongoDB setup
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
main()
  .then(() => {
    console.log("connected to DB"); 
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect(MONGO_URL);
} //.

const ejsMate = require("ejs-mate");


app.set("view engine", "ejs"); //yaha ejs ko set kiya
const path = require("path");
app.set("views", path.join(__dirname, "views")); //added views directory
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public"))); //static file
app.use(express.urlencoded({ extended: true })); //body parser middleware

const methodOverride = require("method-override");
app.use(methodOverride("_method")); 

const session = require("express-session");     //importing express-session for session management
const sessionOptions = {
  secret: "mysecret",
  resave: false,
  saveUninitialized: true,
  cookie : { //here set the cookie time limit, till this time cookie will be valid
    expires :Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge : 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  }
};
app.use(session(sessionOptions));//using session middleware

const flash = require("connect-flash");         //importing connect-flash for flash messages
app.use(flash());//using flash middleware

app.use(passport.initialize()); //a middleware that initializes passport
app.use(passport.session()); //yah middleware is used to persistent login sessions
passport.use(new LocalStrategy(User.authenticate()));//using local strategy for authentication

passport.serializeUser(User.serializeUser()); //it is used to store user in session, for ex: when user login karta hai to uska id session mein store kar diya jata hai
passport.deserializeUser(User.deserializeUser()); //it is used to get user from session

app.use((req, res, next) => {//middleware to set flash messages in res.locals so that can be accessed in all views directory(templates(ejs))
  res.locals.successMsg = req.flash("success");
  res.locals.errorMsg = req.flash("error");
  res.locals.currentUser = req.user; //req.user is set by passport and contains the authenticated user, agar user login hai to vo yaha milega nahi to undefined milega
  next();  
})

app.use("/listings", reviewRouter); //yaha review routes ko use kiya
app.use("/listings", listingRouter); //yaha listing routes ko use kiya
// app.use("/", listingRouter); //home route ke liye listing routes ko use kiya

app.use("/", require("./routes/terms&conditions.js")); //terms and conditions routes ko use kiya
app.use("/", userRouter); //user routes ko use kiya

app.listen(8080, () => {
  console.log("server is listening at port localhost:8080");
});


