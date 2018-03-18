var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TradeSchema = new Schema({
    requester: {type: Schema.ObjectId, ref: 'User', required: true },
    owner: {type: Schema.ObjectId, ref: 'User', required: true },
    offer: {type: Schema.ObjectId, ref: 'Book', required: true },
    wanted: {type: Schema.ObjectId, ref: 'Book', required: true },
    status:  {type: String, required: true, enum: ['Pending', 'Accepted', 'Declined'], default: 'Pending'},
  }
);


TradeSchema.virtual('color').get(function(){
  switch(this.status){
    case 'Pending':
      return 'badge badge-warning';
    case 'Accepted':
      return 'badge badge-success';
    case 'Declined':
      return 'badge badge-danger';
  };
})

TradeSchema.virtual('statusCheck').get(function(){
  if(this.status=='Pending'){
    return true
  } else {
    return false
  }
})
  
//Export model
module.exports = mongoose.model('Trade', TradeSchema);