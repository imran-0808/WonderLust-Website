// we have created this folder and files only for testing purpose like cookies and other features of express
const express = require("express");
const app = express();
const session = require("express-session");
const postRouter = require("./post.js");//importing post routes from post.js
const flash = require("connect-flash");
const path = require("path");

app.use("/post", postRouter);//using post routes

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const sessionOptions = { //session configuration, it is used to store data between different requests
    secret: "mysupersecret",
    resave: false,
    saveUninitialized: true
};   

app.use(session(sessionOptions));//using session middleware
app.use(flash());//using flash middleware

app.use((req, res, next) => { //middleware to set flash messages in res.locals so that they can be accessed in all views
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    next();
})

app.get("/register", (req, res) => {
    let { name = "anonymous" } = req.query;
    req.session.name = name; //storing name in session
    if (name === "anonymous") {
        req.flash("error", "Registration failed!");
    } else {
        req.flash("success", "Registration successful!");
    } 
    res.redirect("/hello");
})
app.get("/hello", (req, res) => {
    res.render("page.ejs", { name: req.session.name });
});
// app.get("/reqCount", (req, res) => {
//     if(req.session.views) {
//         req.session.views++;
//         res.send(`You have visited this page ${req.session.views} times`);
//     } else {
//         req.session.views = 1;
//         res.send("Hello, This is your first visit!");
//     }
// });

// app.get("/readCookies", (req, res) => {
//     let { mycookies } = req.cookies;
//     res.send(`Cookies received: ${mycookies}`);
//     res.send(req.cookies); 
// });

app.get("/", (req, res) => { 
    res.send("Hello World");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
