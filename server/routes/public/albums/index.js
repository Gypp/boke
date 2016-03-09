module.exports.set = function (app) {
    "use strict";
    /*jslint unparam: true*/

    var Album = require('../../../models/album');

    app.get('/albums', function (req, res) {
        Album.model.find(function (err, docs) {
            res.send(docs);
        });
    });

    app.get('/albums/:id', function (req, res) {
        Album.model.findById(req.params.id, function (err, doc) {
            if (err) {
                return res.send(err);
            }
            res.send(doc);
        });
    });
};
