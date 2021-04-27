const { stringifyConfiguration } = require('tslint/lib/configuration');
const { arrayify } = require('tslint/lib/utils');
const mongoose = require('../connection');

const schema = mongoose.Schema({
  title: String ,
  desc:String,
  thumb:String,
  data : Object ,
  query :{type:mongoose.Types.ObjectId, ref:'queries' } ,
  developer : {type:mongoose.Types.ObjectId, ref:'Developers' },
  upvote: Number,
  comments: Array,
  video : {type:mongoose.Types.ObjectId, ref:'Videos' },
  created: Date,

})


const model = mongoose.model('Solutions', schema);

module.exports = model;