module.exports = (function () {
    'use strict';

    var mongoose = require('mongoose');

    var userSchema = mongoose.Schema({
        name: String,
        password: String,
        admin: Boolean
    });

    var User = mongoose.model('User', userSchema);

    var res = {
        schema : userSchema,
        model  : User
    };

    return res;
}());
