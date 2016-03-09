module.exports.set = function (app) {
    "use strict";
    /*jslint unparam: true*/

    var Site       = require('../../../models/site');
    var uuid       = require('node-uuid');

    app.put('/site', function (req, res) {

        var title               = req.body.title;
        var background          = req.body.background;
        var biographyLabel      = req.body.biographyLabel;
        var picturesLabel       = req.body.picturesLabel;
        var eventsLabel         = req.body.eventsLabel;
        var backgroundColor     = req.body.backgroundColor;

        var base64Data          = background.data;
        var pictureName         = uuid.v1();
        var pictureLocation     = './client/ressources/';
        var pictureExtension    = '.' + background.extension;

        var buff = new Buffer(base64Data.replace(/^data:image\/(png|gif|jpeg);base64,/,''), 'base64');
        require("fs").writeFile(escape(pictureLocation + pictureName + pictureExtension), buff, function (err) {
            console.log('done');
        });

        var site = {};

        if (title) site.title                       = title;
        if (background) site.background             = pictureLocation + pictureName + pictureExtension;
        if (biographyLabel) site.biographyLabel     = biographyLabel;
        if (picturesLabel) site.picturesLabel       = picturesLabel;
        if (eventsLabel) site.eventsLabel           = eventsLabel;
        if (backgroundColor) site.backgroundColor   = backgroundColor;


        Site.model.update({}, site, {upsert: false}, function (err, doc) {
            if (err) {
                return res.send(err);
            }
            res.send(doc);
        });
    });

};
