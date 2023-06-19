const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({
    productName:{
        type: String,
        required: true,
        minlength:3,
        maxlength:30,
    },
    description:{
        type: String,
        required: true,
        minlength:3,
        maxlength:30,
    },
    price:{
        type: String,
        required: true,

        maxlength:30,
    },

    image:{
        type: String,
    },

  });

  //module.exports = mongoose.model('user', UserSchema);
  const Product = new  mongoose.model('products', ProductSchema);
  
  module.exports = Product;