const mongoose = require("mongoose");

const imgSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: {
    type: String, // Store price as a string to keep formatting
  },
  img: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = ImageModel = mongoose.model("Image", imgSchema);
