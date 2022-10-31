// file to seed the db with data
// fs to get access to the file with json file
const fs = require('fs');
// mongoose to connect to the data base
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// load env vars
dotenv.config({ path: './config/config.env' });

// load models
// DATA for bootcamps
const Bootcamp = require('./models/Bootcamp');
// DATA for courses
const Course = require('./models/Course');

// Connect to db
mongoose.connect(process.env.MONGO_URI, {
  // options to stop warnings
  // in course Travis used old options that were replaced by these:
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// read json files

const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8')
);


const courses = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/courses.json`, 'utf-8')
);

// import into db
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    await Course.create(courses);
    console.log('Data imported...'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();
    await Course.deleteMany();
    console.log('Data Destroyed...'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// in the node seeder.js -i (-i) at position 2 in the argv
if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
