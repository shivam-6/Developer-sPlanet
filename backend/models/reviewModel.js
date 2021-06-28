const mongoose = require('../connection');

const schema = mongoose.Schema({
    rating: Number,
    text: String,
    user: { type: mongoose.Types.ObjectId, ref: 'User' },
    created: Date,

})


const model = mongoose.model('reviews', schema);

module.exports = model;
