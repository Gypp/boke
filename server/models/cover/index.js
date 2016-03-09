module.exports = (function () {
    'use strict';

    var mongoose = require('mongoose');

    var coverSchema = mongoose.Schema({
        url       : String,
        title     : String,
        name      : String,
        location  : String,
        extension : String,
        relations  : [{}]
    });

    var Cover = mongoose.model('Cover', coverSchema);

    var res = {
        schema : coverSchema,
        model  : Cover
    };

    return res;
}());
