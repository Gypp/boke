module.exports = (function () {
    'use strict';

    var mongoose = require('mongoose');

    var siteSchema = mongoose.Schema({
        title: String,
        background: String,
    });

    var Site = mongoose.model('Site', siteSchema);

    var res = {
        schema : siteSchema,
        model  : Site
    };

    return res;
}());
