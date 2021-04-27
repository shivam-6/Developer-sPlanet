const { stringifyConfiguration } = require('tslint/lib/configuration');
const { arrayify } = require('tslint/lib/utils');
const mongoose = require('../connection');

const schema = mongoose.Schema({
 rating: Number,
 text : String,
 User : {type: mongoose.Types.ObjectId, ref:'User'},
 created: Date,

})


const model = mongoose.model('Solutions', schema);

module.exports = model;