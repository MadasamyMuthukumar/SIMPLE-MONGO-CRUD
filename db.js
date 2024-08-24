// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient; //class used to make connections
// const ObjectID = mongodb.ObjectId

//USIGN **MONGOOSE**
const mongoose = require('mongoose')

// let database;

async function getDatabase() {
    // const client = await MongoClient.connect('mongodb://127.0.0.1:27017') //connection string
    // database = client.db('library') //getting library database
    // if(!database){
    //     console.log("Database not connected!");
        
    // }
    // return database

    //**MONGOOSE**

    //directly giving db name in connection string
    //connect will return promise so we can use then and catch
    mongoose.connect('mongodb://127.0.0.1:27017/library').then(()=>{
        console.log("Database connected");
        
    }).catch(()=>{
        console.log("Error with DB connection!");
        
    })


}

module.exports = { getDatabase , 
                //**MONGOOSE**
                 //ObjectID    no need for obejctId class mongoose will internally take care
                  }