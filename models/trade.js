var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TradeSchema = new Schema({
    requester: {type: Schema.ObjectId, ref: 'User', required: true },
    owner: {type: Schema.ObjectId, ref: 'User', required: true },
    offer: {type: Schema.ObjectId, ref: 'Book', required: true },
    wanted: {type: Schema.ObjectId, ref: 'Book', required: true },
    status:  {type: String, required: true, enum: ['Pending', 'Accepted', 'Denied'], default: 'Pending'},
  }
);


//Export model
module.exports = mongoose.model('Trade', TradeSchema);