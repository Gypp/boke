module.exports.set = function (app) {
    "use strict";
    /*jslint unparam: true*/

    var Album       = require('../../../models/album');
    var Picture     = require('../../../models/picture');

    app.get('/albums/:albumId/pictures', function (req, res) {
        Picture.model.find({"relations": { $elemMatch: {href: "/albums/" + req.params.albumId}}}, function (err, docs) {
            res.send(docs);
        });
    });

    app.get('/albums/:albumId/pictures/:pictureId', function (req, res) {
        Picture.model.findById(req.params.pictureId, function (err, doc) {
            if (err) {
                return res.send(err);
            }
            res.send(doc);
        });
    });

};
