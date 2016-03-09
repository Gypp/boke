module.exports.set = function (app) {
    "use strict";
    /*jslint unparam: true*/

    var Album       = require('../../../models/album');
    var Cover       = require('../../../models/cover');

    app.get('/albums/:albumId/covers', function (req, res) {
        Cover.model.find({"relations": { $elemMatch: {href: "/albums/" + req.params.albumId}}}, function (err, docs) {
            res.send(docs);
        });
    });

    app.get('/albums/:albumId/covers/:coverId', function (req, res) {
        Cover.model.findById(req.params.coverId, function (err, doc) {
            if (err) {
                return res.send(err);
            }
            res.send(doc);
        });
    });

};
