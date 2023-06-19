const mongoose = require("mongoose");

const mongoURI =
  "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.0";


const connectToMongo = () => {


mongoose.connect(mongoURI, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
  })
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((e) => {
      console.log('not connected'+ e.message);
    });
};

module.exports = connectToMongo;
