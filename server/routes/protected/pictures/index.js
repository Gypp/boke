module.exports.set = function (app) {
    "use strict";
    /*jslint unparam: true*/

    var Album       = require('../../../models/album');
    var Picture     = require('../../../models/picture');
    var uuid        = require('node-uuid');

    app.post('/albums/:albumId/pictures', function (req, res) {
        var base64Data        = req.body.base64;
        var pictureName       = req.body.name;
        var pictureLocation   = './data/pictures/' + uuid.v1();
        var pictureExtension  = '.' + req.body.extension;

        var buff = new Buffer(base64Data.replace(/^data:image\/(png|gif|jpeg);base64,/,''), 'base64');
        require("fs").writeFile(pictureLocation + pictureExtension, buff, function (err) {
            console.log('done');
        });

        var myPicture = new Picture.model({ name: pictureName, location: pictureLocation, extension: pictureExtension, url: req.originalUrl});
        myPicture.save(function (err, doc) {
            if (err) {
                return res.send(err);
            }
            doc.relations.push({type: 'Album', href: '/albums/' + req.params.albumId});
            doc.save();
            Album.model.findById(req.params.albumId, function (err, album) {
                if (err) {
                    return res.send(err);
                }
                album.relations.push({type: 'Picture', href: '/albums/' + req.params.albumId + '/pictures/' + doc._id});
                album.save(function (err, doc) {
                    if (err) {
                        return res.send(err);
                    }
                    res.send(doc);
                });
            });
        });
    });

    app.put('/albums/:albumId/pictures/:pictureId', function (req, res) {
        Picture.model.update({_id: req.params.pictureId}, {name: req.body.name}, {upsert: false}, function (err, doc) {
            if (err) {
                return res.send(err);
            }
            res.send(doc);
        });
    });

    app.delete('/albums/:albumId/pictures/:pictureId', function (req, res) {
        Picture.model.remove({ _id: req.params.pictureId}, function (err, doc) {
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
