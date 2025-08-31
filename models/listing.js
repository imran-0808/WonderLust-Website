const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
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
  price: Number,
  location: String,
  country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;