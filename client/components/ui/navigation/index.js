define(["mithril", "components/ui/material-icons/index", "utils", "application-state/index"], function (m, MaterialIcons, utils, appState) {
    'use strict';


    var Navigation = {
        controller: function (options) {
            var toggle = function () {
                appState.navigation(!appState.navigation());
            };

            return {
                items: options.items,
                toggle: toggle
            };
        },
        view: function (ctrl) {
            return m("div", {id: "menu", config: function (elem, isInit) {
                if (!isInit) {
                    utils.otel(window, "mousedown", function (e) {
                        if (e.target === elem) {
                            ctrl.toggle();
                            m.redraw();
                            return true;
                        }
                    });
                }
            }}, [
                m("div", {style: "animation-name: slideFromTop;animation-duration: 0.2s;animation-fill-mode: forwards;animation-delay:0s"}, [
                    ctrl.items().map(function (item) {
                        return m("div", {onclick: item.onClick, style: "animation-name: slideFromRight;animation-duration: 0.2s;animation-fill-mode: forwards;animation-delay:" + (0.2 + item.delay) + "s"}, [
                            m("div", {class: "navigation-icon"}, [
                                m.component(MaterialIcons, {code: item.iconCode})
                            ]),
                            m("div", {class: "navigation-title"}, item.title)
                        ]);
                    })
                ])
            ]);
        }
    };

    return Navigation;
});
