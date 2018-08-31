'use strict';
var mongoose = require('mongoose');

let conn = mongoose.createConnection('mongodb://localhost/mongousers');
var userSchema = mongoose.Schema({
    name: {type: String},
    age: {type: Number},
    wx: {type: String},
    mobile: {type: String}
});

module.exports = conn.model('users',userSchema);

// exports.connapp = mongoose.createConnection('mongodb://localhost/mongousers');