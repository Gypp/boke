define(["mithril", "services/model"], function (m, model) {
    'use strict';

    var Settings = {
        controller: function () {
            var site = m.prop();

            model.getSite(function(data) {
                site(data[0]);
            });

            return {
                site: site,
            };
        },
        view: function (ctrl) {
            return m("div", {class: "admin-settings"}, [
                m("form", [
                    m("h3", "Propriétés du site"),
                    m("label", "Titre"),
                    m("input", {oninput: m.withAttr("value", function(data) {ctrl.site().title = data}), value: ctrl.site().title}),
                    m("label", "Image de fond"),
                    m("input", {type: "file",
                        config: function (elem, init) {
                             if (!init) {
                                 elem.addEventListener('change', function () {
                                     var reader = new FileReader();
                                     reader.addEventListener('load', function () {
                                         ctrl.site().background = {
                                             data: reader.result,
                                             extension: elem.files[0].name.match(/\.([0-9a-z]+)/i)[1]
                                         };
                                     }, false);

                                     reader.readAsDataURL(elem.files[0]);
                                 }, false);
                             }
                        }
                    }, "Charger une image"),
                    m("button", {onclick: function(){
                        model.updateSite(ctrl.site(), function() {
                            m.redraw();
                        });
                    }}, "Mettre à jour")
                ])
            ]);
        }
    };

    return Settings;
});
