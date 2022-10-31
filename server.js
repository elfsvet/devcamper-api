const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
// to colorize messages in CLI
const colors = require('colors');
const errorHandler = require('./middleware/error');
// logger from third party libraries
const morgan = require('morgan');
const connectDB = require('./config/db');
const fileupload = require('express-fileupload');
// load env vars
dotenv.config({ path: './config/config.env' });

connectDB();
// route files
const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');

const app = express();

// Body parser
app.use(express.json());

// dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// File uploading
app.use(fileupload());

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// mount routes
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);
// Middleware for custom error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on http://localhost:${PORT}`
      .bgMagenta.italic
  )
);

// Handle unhandled promise rejection
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // close server & exit process
  server.close(() => process.exit(1));
});
