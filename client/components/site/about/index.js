define(["mithril", "services/model"], function (m, model) {
    'use strict';
    var Aboutme = {
        controller: function () {
            var content = m.prop("");
            model.getBiography(content);

            return {
                content: content
            };
        },
        view: function (ctrl) {
            return m("div", {class: "about-me", style: ""}, [
                m("div", [
                    m("div", {style: ""}, [
                        m.trust(ctrl.content().html)
                    ])
                ])
            ]);
        }
    };

    return Aboutme;
});
