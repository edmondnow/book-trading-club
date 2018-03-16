var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BookSchema = new Schema(
  {
    title: {type: String, required: true},
    author: {type: String, required: true},
    //lookup default settings in mongoose and url
    cover:  {type: String, default: '/images/placeholder.jpg'},
  }
);


//Export model
module.exports = mongoose.model('Book', BookSchema);