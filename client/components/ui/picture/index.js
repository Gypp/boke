define(["mithril"], function (m) {
    'use strict';
    var Picture = {
        controller: function (options) {
            return {
                picture: options.picture,
                onClick: options.onClick
            };
        },
        view: function (ctrl) {
            return m("img", {
                class: "picture",
                onclick: ctrl.onClick,
                src: ctrl.picture.location + ctrl.picture.extension
            });
        }
    };

    return Picture;
});
