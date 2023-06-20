const express = require("express");
const cors = require("cors");
const compression = require('compression')
const session = require("express-session");
const cookieParser = require("cookie-parser");
const path = require('path');

// folders & files
const connectToMongo = require("./config/database");

const userroutes = require("./routes/userRoute");
const productroutes = require("./routes/productRoute")
const stock = require("./routes/stock.js");



// const products = require ("./products");


// connection will database function call
connectToMongo();

  
//app is an instance of express.
const app = express();
const port = 5000;



// PARSING DATA & SESSION & COMPRESSION
app.use(cors());
app.use(express.json());
//app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression(
  {level: 6,  // best optimization for cpu usage
  threshold:  0,   // 0 means compress all data // or 100*1000 any data less than 100kb should not compress
  filter:(req,res) => {
if(req.headers['x-no-compression'])
{
 
  return false
}
else
{
  return compression.filter(req,res)
}

  }
}
));
const oneDay = 1000 * 60 * 60 * 24;
app.use(
  session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);

// // // to get images
app.use("/backend", express.static("../backend"));



// Available Routes
app.use("/api/auth", userroutes);
// app.get("/api/products",(req,res) => {
// res.send(products)
// })
app.use("/api/products",productroutes)

app.use("/api/stock", stock);

// listen at port no
app.listen(port, () => {
  console.log(` backend listening at http://localhost:${port}`);
});