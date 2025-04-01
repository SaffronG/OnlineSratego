const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const app = express();
mongoose.connect("mongodb://localhost:27017/userDB");

const userSchema = new mongoose.Schema({
   email: String,
   password: String,
});

const User = new mongoose.model("User", userSchema);
app.get("/",(req,res)=>{
   res.send("Hello");
}
app.listen(process.env.PORT || 3000);