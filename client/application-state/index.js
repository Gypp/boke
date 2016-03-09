define(["mithril"], function (m) {
    'use strict';
    var appState = {
        header: {
            title: m.prop(),
            back: m.prop()
        },
        navigation: {
            visible: m.prop(false),
            disabled: m.prop(true)
        }
    };

    return appState;
});
