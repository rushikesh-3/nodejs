const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const Tour = require('./../../models/tourModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log('✅ DB Connection Successful');
  })
  .catch((err) => {
    console.error('❌ Database Connection Error');
    console.error(err);
  });

// Read JSON File

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'),
);

// IMPORT DATA TO DATABASE

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data Loaded to DATABASE');
  } catch (err) {
    console.log('Failed to load data :', err);
  }
  process.exit();
};

// DELETE DATA FROM DATABASE

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data Deleted From DATABASE');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

console.log(process.argv);

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
