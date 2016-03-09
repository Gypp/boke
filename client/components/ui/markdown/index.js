define(["mithril", "marked"], function (m, marked) {
    'use strict';
    var Markdown = {
        view: function (ctrl, args) {
            return m("div", {class: "markdown"}, m.trust(marked(args.content())));
        }
    };

    return Markdown;
});
