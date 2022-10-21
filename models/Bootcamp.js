const mongoose = require('mongoose');

const BootcampSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    unique: true,
    trim: true,
    maxLength: [50, 'Name should be less than 50 characters'],
  },
  slug: String,
  description: {
    type: String,
    required: [true, 'Please add a name'],
    maxLength: [500, 'Name should be less than 50 characters'],
  },
  website: {
    type: String,
    match: [
      /https?:\/\/(www\.)?[a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*) /, //regex for https http websites js regex url whats a good regex f
      'Please use a valid URL with HTTP or HTTPS',
    ],
  },
  phone: {
    type: String,
    match: [20, 'Phone number can not be longer than 20 characters'],
  },
  email: {
    type: String,
    match: [
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please add a valid email',
    ],
  },
});
