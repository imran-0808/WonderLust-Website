// this middleware.js file is for check the authentication of user, matlab agar user login hai to hi vo kuch routes ko access kar paye warna vo login page pe redirect ho jaye
const listing = require("./models/listing.js");

module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) { //ye check karta hai ki user authenticated hai ya nahi
        req.session.redirectUrl  = req.originalUrl; //ye line isliye hai taaki jab user login kare to vo usi page pe wapas aa jaye jaha se vo gaya tha login page pe, (originalUrl express ka ek property hai jo current url ko return karta hai)
        req.flash("error", "You must be signed in first!");//flash message set kiya
        return res.redirect("/login");
    }
    next();
};     

// yah middleware hai jo redirectUrl ko res.locals mein set karta hai taaki vo login route ke baad access ho sake jis page pe user jana chahta tha
module.exports.saveRedirectUrl = (req, res, next) => {
    if(req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};  

// ye middleware hai jo listing ka owner check karta hai, matlab jo listing create ki hai uska owner hi us listing ko edit ya delete kar paye
module.exports.isOwner = async (req, res, next) => {
    const { id } = req.params;
    const Listing = await listing.findById(id);
    if(!Listing.owner.equals(req.user._id)) {
        req.flash("error", "You do not have permission to do that!");
        return res.redirect(`/listings/${id}`);
    }
}