var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BookSchema = new Schema(
  {
    title: {type: String, required: true},
    author: {type: String, required: true},
    //lookup default settings in mongoose and url
    cover:  {type: String,  default: '/images/placeholder.jpg'}
  }
);

BookSchema.pre('save', function(next) {
    if (this.cover.length === 0 ) {
        this.cover = '/images/placeholder.jpg';
    }

    next();
});

BookSchema.virtual('url').get(function(){
    return '/instance/' + this._id;
})

//Export model
module.exports = mongoose.model('Book', BookSchema);