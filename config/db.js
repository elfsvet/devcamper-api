const mongoose = require('mongoose');
const colors = require('colors');
const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    // options to stop warnings
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log(`MongoDB Connected: ${conn.connection.host}`.bgGrey);
};

module.exports = connectDB;
