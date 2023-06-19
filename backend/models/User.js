const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name:{
        type: String,
        required: true,
        minlength:3,
        maxlength:30,
    },
    email:{
        type: String,
        required: true,
        minlength:3,
        maxlength:200,
        unique: true,

    },

    isVerified:{
        type: Boolean,
       
    }, 

    password:{
        type: String,
        required: true,
        minlength:3,
        maxlength:1024,
    },
    date:{
        type: Date,
        default: Date.now,
    },
    role:{
        type: String,
       
    },
    image:{
        type: String,
    },
    number:{
        type: String ,
    },
    isblock:{
        type: Boolean ,
    }
  });

  //module.exports = mongoose.model('user', UserSchema);
  const User = new  mongoose.model('user', UserSchema);
  
  module.exports = User;