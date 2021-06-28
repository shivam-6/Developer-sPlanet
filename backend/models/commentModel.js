
const mongoose = require('../connection');

const schema = mongoose.Schema({

  text: String,
  developer: { type: mongoose.Types.ObjectId, ref: 'Users' },
  created: Date,
})


const model = mongoose.model('comments', schema);

module.exports = model;