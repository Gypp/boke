define(["mithril", "components/ui/markdown/index", "services/model", "components/ui/material-icons/index"], function (m, MarkDown, model, MaterialIcons) {
    'use strict';
    var About = {
        controller: function () {
            var markdown  = m.prop("");

            model.getBiography(function (data) {
                markdown(data.markdown);
            });

            return {
                markdown: markdown
            };
        },
        view: function (ctrl) {
            return m("div", {class: "adminAbout"}, [
                m("div", [
                    m("h2", "Zone d'édition MarkDown"),
                    m("textarea", {oninput: m.withAttr("value", ctrl.markdown), "value" : ctrl.markdown()})
                ]),
                m("div", [
                    m("h2", "Prévisualisation"),
                    m.component(MarkDown, {content: ctrl.markdown})
                ]),
                m("div", {class: "addElement", onclick: function () {
                    model.addBiography({content: ctrl.markdown()});
                }}, [
                    m.component(MaterialIcons, {code: "save"})
                ])
            ]);
        }
    };

    return About;
});
