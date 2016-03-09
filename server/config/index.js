module.exports = (function () {
    'use strict';

    var secret   = "this is my super secret ! Woot \\(O_O)/";

    var res = {
        secret : secret,
        mongo: {
            adress: "127.0.0.1",
            port: "27017",
            database: "test"
        }
    };

    return res;
}());
