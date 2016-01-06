module.exports.set = function (app) {
    "use strict";
    /*jslint unparam: true*/

    var Biography       = require('../../../models/biography');

    app.post('/biography', function (req, res) {
      Biography.save(req.body.content);
      res.send({status: true, message:"Biography added"});
    });
};
