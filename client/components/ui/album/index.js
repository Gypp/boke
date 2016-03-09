define(["mithril", "components/ui/menu/index"], function (m, Menu) {
    'use strict';
    var Album = {
        controller: function (options) {
            return {
                picture : options.picture,
                onClick : options.onClick,
                name    : options.name,
                items   : options.items
            };
        },
        view: function (ctrl) {
            if (!ctrl.picture().name) {
                return m("div");
            }
            return m("div", {class: "album", onclick: ctrl.onClick}, [
                m("div", [
                    m("div", {class: "background", style: "background-image: url('" + ctrl.picture().location + ctrl.picture().extension + "');"}),
                    m("div", {class: "label-bar", style: ""}, [
                        m("div", {style: "width:15%;"}),
                        m("div", {style: "width:70%;", class: "label"}, ctrl.name),
                        ctrl.items ? m("div", {style: "width:15%;", class: "menu"}, [
                            m.component(Menu, {items: ctrl.items})
                        ]) : ""
                    ])
                ])
            ]);
        }
    };

    return Album;
});
