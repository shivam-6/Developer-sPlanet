const mongoose = require('../connection');

const schema = mongoose.Schema({
    firstname: String,
    lastname: String,
    avatar: String,
    email: String,
    password: String,
    age: Number,
    gender : String,
    mobile : Number,
    created: Date,
    isadmin: Boolean
})


const model = mongoose.model('Users', schema);

module.exports = model;