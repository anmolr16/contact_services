var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new mongoose.Schema({
    'name': { type: String },
    'otp': { type: String },
    'sentAt': { type: Date, default: new Date() },
});

module.exports = mongoose.model('message', messageSchema);