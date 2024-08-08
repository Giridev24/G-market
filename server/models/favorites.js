const mongoose = require("mongoose");

const favoriteItemSchema = new mongoose.Schema({
  itemId: {
    type: String,
    required: true,
  },
  // You can add more fields as needed
});

const FavoriteItem = mongoose.model("favoriteItem", favoriteItemSchema);

module.exports = FavoriteItem;
