module.exports.set = function (app) {
    "use strict";
    /*jslint unparam: true*/

    var Event       = require('../../../models/event');

    app.post('/events', function (req, res) {
            var myEvent = new Event.model({
            title       : req.body.title,
            adress      : req.body.adress,
            location    : req.body.location,
            dates       : req.body.dates,
            description : req.body.description,
            url         : req.originalUrl
        });

        myEvent.save(function (err, doc) {
            if (err) {
                console.log(err);
                return res.send(err);
            }
            res.send(doc);
        });
    });

    app.put('/events/:id', function (req, res) {
        Event.model.update({_id: req.params.id}, {
            title       : req.body.title,
            adress      : req.body.adress,
            location    : req.body.location,
            dates       : req.body.dates,
            description : req.body.description
        }, {upsert: false}, function (err, doc) {
            if (err) {
                return res.send(err);
            }
            res.send(doc);
        });
    });

    app.delete('/events/:id', function (req, res) {
        Event.model.remove({ _id: req.params.id}, function (err, doc) {
            if (err) {
                return res.send(err);
            }
            res.send(doc);
        });
    });
};
