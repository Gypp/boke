module.exports = (function () {
    'use strict';

    var mongoose = require('mongoose');

    var pictureSchema = mongoose.Schema({
        url       : String,
        title     : String,
        name      : String,
        location  : String,
        extension : String,
        relations  : [{}]
    });

    var Picture = mongoose.model('Picture', pictureSchema);

    var res = {
        schema : pictureSchema,
        model  : Picture
    };

    return res;
}());
