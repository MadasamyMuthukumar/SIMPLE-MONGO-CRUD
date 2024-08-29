const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema ({
    _id: String,
    customer: String,
    products: [
        {
            type: String, //array going to have string type
            ref: 'Product'  //This products field will refer product model we have created
        }
    ],
    total: Number
})

const orderModel = mongoose.model('Order',orderSchema)

module.exports = orderModel;