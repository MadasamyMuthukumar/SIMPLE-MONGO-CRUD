//neccessary imports
const express = require('express')
const bp = require('body-parser')
const exhs = require('express-handlebars')
const db = require('./db') //db object
// const ObjectID = db.ObjectID

/**MONGOOSE */
db.getDatabase() //only one time db will connect
const BookModel = require('./models/bookModel')

const app = express()


//registering handlebar as templating engine
app.engine('hbs', exhs.engine({ 
    layoutsDir: "views/", 
    defaultLayout: "main", 
    extname: "hbs", runtimeOptions:{
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault:true

    } }))  //hbs will be extension .engine() provides fn to compile hbs
app.set('view engine', 'hbs')  //sets defualt engine tohbs
app.set('views', 'views') //pecifies the directory where Express should look for view files.


app.use(bp.urlencoded()) //using bp to get data form form 

//in home page the main.hbs will render
app.get('/', async (req, res) => {
    let msg = "";
    // let database = await db.getDatabase(); //getting the db
    // const collection = database.collection('books') //getting book table
    // const cursor = collection.find({}) //getting all doc

    // const books = await cursor.toArray(); //converting all data to array
     
    /**MONGOOSE */
    let books = await BookModel.find({})

    const status = req.query.status //taking status from url
    const edit_id = req.query.edit_id
    const delete_id = req.query.delete_id
    let edit_book

    if (edit_id) {
        /* var obj_id = new ObjectID(edit_id)
        // console.log(obj_id);
        // edit_book = await collection.findOne({ _id: obj_id }) */

        /**MONGOOSE */
        edit_book = await BookModel.findOne({_id: edit_id})
    }
    if (delete_id) {
        // await collection.deleteOne({ _id: new ObjectID(delete_id) })

        /**MONGOOSE */
        await BookModel.deleteOne({_id:delete_id})

        return res.redirect("/?status=3")
    }
    switch (status) {
        case '1':
            msg = "Inserted Successfully!"
            break
        case '2':
            msg = "Updated Successfully!"
            break
        case '3':
            msg = "Deleted Successfully!"
            break
        default:
            msg = ""
            break;
    }
    res.render('main', { msg, books, edit_id, edit_book})

})

//create new book 
app.post('/store_book', async (req, res) => {
     // let database = await db.getDatabase(); //getting the db
     // const collection = database.collection('books') //getting book table

    // const book = { title: req.body.title, author: req.body.author }

    // // await collection.insertOne(book);
    // return res.redirect('/?status=1') //after insertion redirect to home url with status

    /**MONGOOSE */
   const book = { title: req.body.title, author: req.body.author }
   const book_data = new BookModel(book)
   book_data.save() //will insert the doc into collection
   return res.redirect('/?status=1')
})


app.post('/update_book/:id', async (req, res) => {
    const edit_id = req.params.id
    // let database = await db.getDatabase(); //getting the db
    // const collection = database.collection('books') //getting book table
        // const obj_id = new ObjectID(edit_id)
    // console.log(obj_id);

    const book = { title: req.body.title, author: req.body.author }
    // await collection.updateOne({ _id: new ObjectID(obj_id) }, { $set: book });

     /**MONGOOSE */
     //find the object and updates it
    await BookModel.findOneAndUpdate({_id:edit_id}, book)
    return res.redirect('/?status=2') //after insertion redirect to home url with status

})

app.listen(8000, () => {
    console.log("Listening to port 8000");
})