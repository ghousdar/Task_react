const User = require("../models/User");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { OAuth2Client } = require("google-auth-library");
const SMTPTransport = require('nodemailer-smtp-transport');
const CLIENT_ID =
  "604127393037-27t6tbpk0o7118il3bph78pg3ckrd9ef.apps.googleusercontent.com";

// my secret jwt
const JWT_SECRET = "Ghousisagoodb$oy";
require("dotenv").config();
// const oAuth2Client = new google.auth.OAuth2(
//   process.env.CLIENT_ID,
//   process.env.CLIENT_SECRET,
//   process.env.REDIRECT_URL
// );





// ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required
exports.createuser = async (req, res) => {
  // If there are errors, return Bad request and the errors

  // Finds the validation errors in this request and wraps them in an object with handy functions
  let success = false;
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  //
  if (!errors.isEmpty()) {
    // console.log(errors.mapped());
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    // Check whether the user with this email exists already
    let user = await User.findOne({ email: req.body.email });

    if (user) {
      return res.status(400).json({
        success,
        error: "Sorry a user with this email already exists",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(req.body.password, salt);
    // Create a new user
    // console.log(req.file);
    const profilePic = req.file ? req.file.filename : null;
    user = await User.create({
      name: req.body.name,
      password: securePassword,
      email: req.body.email,
      number: req.body.number,
      role: req.body.role,
     
      isVerified: false,
      image: profilePic,
    });

    const data = {
      // user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
      image: user.image,
      // },
    };
    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;
    // nechy wali line ko tb uncomment krna jb testing krni ho werna br br gmail pr message jye ga

 ///*  sendVerifyEmail(req.body.name,req.body.email,user._id)  *///
      res.json(authtoken);
    


    // // to see image detail
    // console.log(req.file);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};

// ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required
exports.login = async (req, res) => {
  let success = false;

  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  //
  if (!errors.isEmpty()) {
    // console.log(errors.mapped());
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      success = false;
      return res.status(400).json({
        success,
        error: "Please try to login with correct credentials",
      });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      success = false;
      return res.status(400).json({
        success,
        error: "Please try to login with correct credentials",
      });
    }

    const data = {
      // user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isVerified:user.isVerified,
      image: user.image,
      // },
    };

    let session = req.session;
    //session.userid=req.body.email;
    session.userid = user._id;
    // console.log(req.session)

    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;
    const role = user.role;



    res.json(authtoken);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};

// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
exports.getuser = async (req, res) => {
  try {
    let userId = req.user._id;
    // const user = await User.findById(userId).select("-password")
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};






//  Route 7 logout user
exports.logout = async (req, res) => {
  try {
    // let  userId = req.user._id;
    // const user = await User.findById(userId).select("-password")
    req.session.destroy();
    res.clearCookie("token", { path: "/" });
    res.status(200).send("user logout");

    // res.redirect('/');
    // res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }

  // res.clearCookie('token',{path:'/'});
};



