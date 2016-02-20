(function () {
    "use strict";
    /*jslint unparam: true*/

    var express     = require('express');
    var app         = express();
    var fs          = require('fs');
    var path        = require("path");
    var routes      = require('./server/routes');
    var bodyParser  = require('body-parser');
    var mongoose    = require('mongoose');
    var mkdirp      = require('mkdirp');
    var Site        = require('./server/models/site');

    mkdirp('./data', function(err) {
        mkdirp('./data/pictures');
        mkdirp('./data/covers/');
    });

    app.use(bodyParser.json({limit: '50mb'}));
    app.enable('etag');

    app.use('/client', express.static(__dirname + '/client'));
    app.use('/node_modules', express.static(__dirname + '/node_modules'));
    app.use('/data', express.static(__dirname + '/data'));

    routes.set(app, fs, path);

    mongoose.connect('mongodb://localhost');
    var db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function (callback) {
        console.log("We are connected to MongoDB \\o/");
        //var user = new User.model({ name: "name", password: "password"});
        //user.save();

        Site.model.find(function (err, docs) {
            if (docs.length ===  0) {
                var site = new Site.model({title: "Boke", background: "./client/ressources/landscape1920.jpg"});
                site.save();
            }
        });

        var server = app.listen(3000, function () {
            var host = server.address().address;
            var port = server.address().port;

            console.log('Example app listening at http://%s:%s', host, port);
        });
    });

}());
