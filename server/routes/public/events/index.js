module.exports.set = function (app) {
    "use strict";
    /*jslint unparam: true*/

    var Event = require('../../../models/event');

    app.get('/events', function (req, res) {
        Event.model.find(function (err, docs) {
            res.send(docs);
        });
    });

    app.get('/events/:id', function (req, res) {
        Event.model.findById(req.params.id, function (err, doc) {
            if (err) {
                return res.send(err);
            }
            res.send(doc);
        });
    });
};
