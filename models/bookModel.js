/**MONGOOSE */
const mongoose= require('mongoose')

//defines the structure of our book schema, it only accepts the defined structure

const bookSchema = new mongoose.Schema({
    title: String,
    author: String
})

//creating and eporting model
const bookModel = mongoose.model('book',bookSchema) //book will be model name

module.exports = bookModel //bookModel contains Model object of mongoose