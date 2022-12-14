const mongoose = require('mongoose');
const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    // options to stop warnings
    // in course Travis used old options that were replaced by these:
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
};

module.exports = connectDB;
