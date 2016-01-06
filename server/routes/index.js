module.exports.set = function (app, fs, path) {
    "use strict";
    /*jslint unparam: true*/

    var mongoose        = require('mongoose');
    var User            = require('../models/user'); // get our mongoose model
    var jwt             = require('jsonwebtoken'); // used to create, sign, and verify tokens
    var config          = require('../config');

    this.public         = require('./public');
    this.protected      = require('./protected');



    this.public.set(app);

    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname + "../../../client/index.html"));
    });

    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        if (req.method === "GET") {
            next();
            return;
        }
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        if (token) {
            jwt.verify(token, config.secret, function(err, decoded) {
                if (err) {
                    return {success: false, message: 'Failed to authenticate token.'};
                }
                req.decoded = decoded;
                next();
            });
        } else {
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });
        }
    });

    this.protected.set(app);
};
