let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserSchema = Schema({
    username: String,
    password: String,
    admin: Boolean
});

module.exports = mongoose.model('User', UserSchema);