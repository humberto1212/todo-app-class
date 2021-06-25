const mongoose = require('mongoose')


let TodoSchema = new mongoose.Schema({
   title: String, 
   description: String
})


let TodoModel = mongoose.model('todo', TodoSchema )


module.exports = TodoModel