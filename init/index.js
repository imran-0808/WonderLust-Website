const mongoose = require("mongoose");
const initData1 = require("./data.js");
const Listing1 = require("../models/listing.js");

//call main function, mongoose setup
main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

const initDB = async () => {
  await Listing1.deleteMany({});
  await Listing1.insertMany(initData1.data);
  console.log("data was initialised")
};

initDB();