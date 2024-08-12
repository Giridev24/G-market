// controllers/productController.js
const imageModel = require('../models/product');
const fs = require('fs');
const path = require('path');

const uploadImage = async (req, res) => {
  try {
    const saveImage = new imageModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      img: {
        data: fs.readFileSync(path.join('uploads', req.file.filename)),
        contentType: 'image/png'
      }
    });
    await saveImage.save();
    res.json({ msg: "Product added successfuy" });
  } catch (err) {
    console.error("Error adding product:", err);
    res.status(500).json({ msg: "Product adding failed" });
  }
};

const getAllImages = async (req, res) => {
  try {
   
    const allData = await imageModel.find();
    res.json(allData);
   
  } catch (error) {
    res.status(500).send('Error fetching data');
  }
};

const allDataforAdmin =  async (req, res) => {
  try {
    const allData = await imageModel.find(); 
    return res.json({
      success: true,
      msg: "Success token authorized",
      images: allData, // Changed field name to 'images'
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
}

const getImageById = async (req, res) => {
  try {
    const cardId = req.params.id;
    const image = await imageModel.findById(cardId);
    res.json(image);
  } catch (error) {
    res.status(500).send('Error fetching data');
  }
};

const productUpdate = async (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;
 console.log(name,description,price);
  try {
    const updatedProduct = await imageModel.findByIdAndUpdate(
      id,
      { name, description, price },
      { new: true } // Return the updated document
    );

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({ success: true, msg: "Product Updated" });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ success: false, message: 'Error updating product' });
  }
};

const deleteImageById = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteproduct = await imageModel.findByIdAndDelete(id);
    if (!deleteproduct) return res.status(404).json({ error: 'Product not found' });
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { uploadImage, getAllImages, getImageById, deleteImageById, allDataforAdmin, productUpdate };
