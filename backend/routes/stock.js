const express = require("express");
const router = express.Router();
const Product = require('../models/Products'); 




router.post("/checkout", async (req,res) =>{

    try {
        for (const product of req.body.cartItems) {
          const { _id, quantity, cartQuantity } = product;
          const updatedQuantity = parseInt(quantity) - parseInt(cartQuantity);
    
          await Product.findByIdAndUpdate(_id, { quantity: updatedQuantity });
        }
    
        res.status(200).json({ message: 'Product quantities updated successfully!' });
 
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating product quantities.' });
    }

});


module.exports = router;