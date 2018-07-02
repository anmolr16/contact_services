var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contactSchema = new mongoose.Schema({
    'name': { type: String },
    'contact': { type: String },
});

module.exports = mongoose.model('contact', contactSchema);