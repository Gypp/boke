module.exports = (function () {
    'use strict';

    var mongoose = require('mongoose');

    var eventSchema = mongoose.Schema({
        url         : String,
        title       : String,
        adress      : String,
        location    : {lat: Number, long: Number},
        dates       : [Date],
        description : String
    });

    var Event = mongoose.model('Event', eventSchema);

    var res = {
        schema : eventSchema,
        model  : Event
    };

    return res;
}());
