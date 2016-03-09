define(["mithril"], function (m) {
    'use strict';
    var Filter = {
        controller: function () {
            var searchTerm = m.prop("");

            return {
                searchTerm: searchTerm
            };
        },
        view: function (ctrl) {
            return m("input", {placeholder: "Type to search", oninput: m.withAttr("value", ctrl.searchTerm),
                config: function (el, init) {
                    if (init) {
                        return;
                    }
                    el.focus();
                }
                });
        }
    };

    return Filter;
});
