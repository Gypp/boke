define([], function () {
    'use strict';
    var exports = {};

    exports.otel = function (element, eventName, callback) {
        element.addEventListener(eventName, function handler(event) {
            if (callback(event)) {
                element.removeEventListener(eventName, handler);
            }

        });
    };

    return exports;
});
