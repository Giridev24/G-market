// config/db.js
const mongoose = require('mongoose');
const uri = process.env.MONGO_URL;

mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Error connecting to MongoDB Atlas', err));
