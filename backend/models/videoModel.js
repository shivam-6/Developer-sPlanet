
const mongoose = require('../connection');

const schema = mongoose.Schema({
  title: String ,
  desc:String,
  data : Object ,
  developer : {type:mongoose.Types.ObjectId, ref:'Developers' },
  created: String,
  category: String,


})


const model = mongoose.model('Videos', schema);

module.exports = model;