module.exports.set = function (app) {
    "use strict";
    /*jslint unparam: true*/

    var Site = require('../../../models/site');

    app.get('/site', function (req, res) {
        Site.model.find(function (err, docs) {
            res.send(docs);
        });
    });
};
