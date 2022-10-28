const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// load env vars
dotenv.config({ path: './config/config.env' });

// load models

const Bootcamp = require('./models/Bootcamp');

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

// import into db
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
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
