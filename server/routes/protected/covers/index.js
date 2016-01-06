module.exports.set = function (app) {
    "use strict";
    /*jslint unparam: true*/

    var Album       = require('../../../models/album');
    var Cover       = require('../../../models/cover');
    var uuid        = require('node-uuid');

    app.post('/albums/:albumId/covers', function (req, res) {
        var base64Data      = req.body.base64;

        var coverName       = req.body.name;
        var coverLocation   = './data/covers/' + uuid.v1();
        var coverExtension  =  '.' + req.body.extension;

        var buff = new Buffer(base64Data.replace(/^data:image\/(png|gif|jpeg);base64,/,''), 'base64');
        require('fs').writeFile(coverLocation + coverExtension, buff, function (err) {
            console.log('done');
        });

        var myCover = new Cover.model({ title: req.body.title, name: coverName, location: coverLocation, extension: coverExtension, url: req.originalUrl});
        myCover.save(function (err, doc) {
            if (err) {
                return res.send(err);
            }
            doc.relations.push({type: 'Album', href: '/albums/' + req.params.albumId});
            doc.save();
            Album.model.findById(req.params.albumId, function (err, album) {
                if (err) {
                    return res.send(err);
                }
                album.relations.push({type: 'Cover', href: '/albums/' + req.params.albumId + '/covers/' + doc._id});
                album.save(function (err, doc) {
                    if (err) {
                        return res.send(err);
                    }
                    res.send(doc);
                });
            });
        });
    });

    app.put('/albums/:albumId/covers/:coverId', function (req, res) {
        Cover.model.update({_id: req.params.coverId}, {name: req.body.name}, {upsert: false}, function (err, doc) {
            if (err) {
                return res.send(err);
            }
            res.send(doc);
        });
    });

    app.delete('/albums/:albumId/covers/:coverId', function (req, res) {
        Cover.model.remove({ _id: req.params.coverId}, function (err, doc) {
            if (err) {
                return res.send(err);
            }
            Album.model.findById(req.params.albumId, function (err, album) {
                if (err) {
                    return res.send(err);
                }
                album.relations.splice(album.relations.map(function (o) {return o.href; }).indexOf(req.url), 1);
                album.save(function (err, album) {
                    if (err) {
                        return res.send(err);
                    }
                    res.send(doc);
                });
            });
        });
    });
};
