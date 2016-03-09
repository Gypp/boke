module.exports.set = function (app) {
    "use strict";
    /*jslint unparam: true*/

    var Album       = require('../../../models/album');
    var Picture     = require('../../../models/picture');
    var Cover       = require('../../../models/cover');

    app.post('/albums', function (req, res) {
        var myAlbum = new Album.model({ name: req.body.name, url: req.originalUrl});
        myAlbum.save(function (err, doc) {
            if (err) {
                console.log(err);
                return res.send(err);
            }

            res.send(doc);
        });
    });

    app.put('/albums/:id', function (req, res) {
        console.log(req.params);
        Album.model.update({_id: req.params.id}, {name: req.body.name}, {upsert: false}, function (err, doc) {
            if (err) {
                return res.send(err);
            }
            res.send(doc);
        });
    });

    app.delete('/albums/:id', function (req, res) {
        Album.model.remove({ _id: req.params.id}, function (err, doc) {
            if (err) {
                return res.send(err);
            }

            Picture.model.remove({"relations" : {$elemMatch : {href:req.originalUrl}}}, function (err, doc) {
                if (err) {
                    return res.send(err);
                }
                Cover.model.remove({"relations" : {$elemMatch : {href:req.originalUrl}}}, function (err, doc) {
                    if (err) {
                        return res.send(err);
                    }
                    res.send(doc);
                });
            });
        });
    });
};
