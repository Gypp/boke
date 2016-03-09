define(["mithril"], function (m) {
    'use strict';

    var DateViewer = {
        view: function (ctrl, args) {
            return m("div", [
                args.dates().map(function(date) {
                    return m("div", date.toLocaleDateString())
                })
            ])
        }
    };

    return DateViewer;
});
