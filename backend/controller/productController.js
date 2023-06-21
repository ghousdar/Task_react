const Products = require("../models/Products");
const { validationResult } = require("express-validator");
// my secret jwt
const JWT_SECRET = "Ghousisagoodb$oy";
var jwt = require("jsonwebtoken");

const products = require ("../products");

// ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required
exports.createproduct = async (req, res) => {
  
    let success = false;
    
// console.log(req.file)
    try {
  
      // Create a new user
      // console.log(req.file);
      const profilePic = req.file ? req.file.filename : null;
      let  product = await Products.create({
        productName: req.body.productName,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        image: profilePic,
      });
  
      const data = {
        // user: {
        _id: product._id,
        productName: product.productName,
        description: product.description,
        price: product.price,
        quantity:product.quantity,
        image: product.image,
        // },
      };
    

        res.json(data);
      
  
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  };



exports.getproduct = async (req,res) => {
//  res.send(products);

try {
  const user = await Products.find({});
  res.json(user);
} catch (error) {
  console.error(error.message);
  res.status(500).send("Internal Server Error");
}
};
  