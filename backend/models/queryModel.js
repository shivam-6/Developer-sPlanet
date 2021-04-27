const { stringifyConfiguration } = require('tslint/lib/configuration');
const mongoose = require('../connection');

const schema = mongoose.Schema({
  title: String ,
  data : Object ,
  developer : {type:mongoose.Types.ObjectId, ref:'developers' },
  community:{type:mongoose.Types.ObjectId, ref:'communities' },
  created: Date,

})


const model = mongoose.model('Users', schema);

module.exports = model;