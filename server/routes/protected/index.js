module.exports.set = function (app) {
    "use strict";
    /*jslint unparam: true*/

    var albums      = require('./albums');
    var pictures    = require('./pictures');
    var events      = require('./events');
    var covers      = require('./covers');
    var biography   = require('./biography');

    albums.set(app);
    pictures.set(app);
    events.set(app);
    covers.set(app);
    biography.set(app);
};
