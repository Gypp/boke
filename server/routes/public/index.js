module.exports.set = function (app) {
    "use strict";
    /*jslint unparam: true*/

    var albums          = require('./albums');
    var pictures        = require('./pictures');
    var covers          = require('./covers');
    var events          = require('./events');
    var biography       = require('./biography');
    var authenticate    = require('./authenticate');
    var site            = require('./site');

    albums.set(app);
    pictures.set(app);
    covers.set(app);
    events.set(app);
    biography.set(app);
    authenticate.set(app);
    site.set(app);
};
