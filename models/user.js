
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required: false,
        unique: true
    }
})

userSchema.plugin(passportLocalMongoose); //passport-local-mongoose plugin use kiya for username and password handling, ye automatically salts and hashes karta hai password ko

module.exports = mongoose.model("User", userSchema);