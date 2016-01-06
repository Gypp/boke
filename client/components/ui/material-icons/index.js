define(["mithril"], function (m) {
    'use strict';
    var MaterialIcons = {
        controller: function (options) {
            return {
                code : options.code,
                onClick: options.onClick
            };
        },
        view: function (ctrl) {
            return m("i", {onclick: ctrl.onClick, class: "material-icons "}, ctrl.code);
        }
    };

    return MaterialIcons;
});
