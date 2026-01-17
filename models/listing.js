const mongoose = require("mongoose");
const Review1 = require("./review");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    // required: true,
  },
  description: String,
  image: {
    type: String,
    //yaha image ko store kiya, and yaha default image set ki agar koi image nahi hai to ye default image show
    default:
      "https://unsplash.com/photos/modern-minimalist-living-space-with-open-layout-5aJpyxXaCyA",
    Set: (
      v //aur yaha condition use kiya its process like if else
    ) =>
      v === ""
        ? "https://unsplash.com/photos/modern-minimalist-living-space-with-open-layout-5aJpyxXaCyA"
        : v,
  },
  price: {
    type: Number,
    required: true,
    default:0,
  },
  location: String,
  country: String,
  // ye review ko listing schema mein isliye add kiya taaki hum ek listing ke saath uske reviews ko bhi access/delete kar sake
  reviews: [ //array of object ids
    {
      type: Schema.Types.ObjectId, //reference to review model from review.js
      ref: "Review",//reference to review model from review.js
    }
  ],
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    }
  ]
});
    
// Middleware for cascading delete (automatic deletion of related documents), Listing delete karte waqt uske reviews bhi automatically delete ho jaaye
listingSchema.post("findOneAndDelete", async function (listing) {
  if (listing) {
    // listing.reviews me sab review IDs hain
    await Review1.deleteMany({ _id: { $in: listing.reviews } });
    console.log("Related reviews deleted successfully ✅");
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;