const mongoose = require('mongoose');

const productSchema = new mongoose.Schema ({ 
    _id: String,
    name: String,
    Price : Number
})

const productModel = mongoose.model('Product',productSchema);

module.exports = productModel;