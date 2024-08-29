//  const mongodb = require('mongodb')
//  const MongoClient = mongodb.MongoClient;

/**MONGOOSE */
const mongoose = require('mongoose');
const OrderModel = require('./models/orderModel')
require('./models/productModel');
//MANY-MANY REALTINSHIP
(async ()=>{
    // let database;
    // const client = await MongoClient.connect('mongodb://127.0.0.1:27017')
    // database = client.db('customers')
    // if(!database){
    //     console.log("Not connected");
        
    // }else{
    //     console.log("Connected");
        
    // }

    /**MONGOOSE */
    mongoose.connect('mongodb://127.0.0.1:27017/customers').then(()=> console.log("connected"))
    .catch(()=> console.log("NOt connected"))
    

     
//    const result = await database.collection('orders').aggregate([
//         {
//             $lookup : {
//                 $from: 'products',
//                 $localField: 'products',
//                 $foreignFiled : '_id',
//                 as : 'product_ordered'

//             }
//         }
//     ]).toArray()

    // console.log(JSON.stringify(result));
    //if we call the referenced field in orders collection then it will populate data
    const orders = await OrderModel.find({}).populate('products') 
    console.log(JSON.stringify(orders));
    


}

)()



//ORDER :  { _id: "o1", customer: "Alice", products: ["p1", "p3"], total: 1350 },
//PRODUCTS :   { _id: "p1", name: "Laptop", price: 1200 },