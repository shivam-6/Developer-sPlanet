
const mongoose = require('../connection');

const schema = mongoose.Schema({
  title: String ,
  desc:String,
  thumb:String,
  data : Object ,
  developer : {type:mongoose.Types.ObjectId, ref:'Developers' },
  video : {type:mongoose.Types.ObjectId, ref:'Videos' },


})


const model = mongoose.model('Solutions', schema);

module.exports = model;