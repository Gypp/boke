module.exports = (function () {
    'use strict';

    var mongoose = require('mongoose');

    var albumSchema = mongoose.Schema({
        url       : String,
        name      : String,
        relations : [{}]
    });

    var Album = mongoose.model('Album', albumSchema);

    var res = {
        schema : albumSchema,
        model  : Album
    };

    return res;
}());
