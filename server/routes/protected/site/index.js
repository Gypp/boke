module.exports.set = function (app) {
    "use strict";
    /*jslint unparam: true*/

    var Site       = require('../../../models/site');
    var uuid       = require('node-uuid');

    app.put('/site', function (req, res) {


        var title = req.body.title;
        var background = req.body.background;
        console.log(title);
        var base64Data        = background.data;
        var pictureName       = uuid.v1();
        var pictureLocation   = './client/ressources/';
        var pictureExtension  = '.' + background.extension;

        var buff = new Buffer(base64Data.replace(/^data:image\/(png|gif|jpeg);base64,/,''), 'base64');
        require("fs").writeFile(escape(pictureLocation + pictureName + pictureExtension), buff, function (err) {
            console.log('done');
        });


        Site.model.update({}, {
            title       : title,
            background  : pictureLocation + pictureName + pictureExtension,
        }, {upsert: false}, function (err, doc) {
            if (err) {
                return res.send(err);
            }
            res.send(doc);
        });
    });

};
