define(["mithril", "components/ui/material-icons/index", "utils"], function (m, MaterialIcons, utils) {
    'use strict';

    function createStateVM() {
        return {
            showMenu: m.prop(false)
        };
    }

    var Menu = {
        controller: function (options) {
            var state = createStateVM();

            return {
                items: options.items,
                state: state
            };
        },
        view: function (ctrl) {
            return m("div", {onclick: function () {ctrl.state.showMenu(!ctrl.state.showMenu()); }}, [
                m.component(MaterialIcons, {code: "more_vert"}),
                ctrl.state.showMenu() ? m("div", {class: "menu-list", config: function (elem, isInit) {
                    if (!isInit) {
                        utils.otel(window, "mousedown", function (e) {
                            if (e.target !== elem && e.target.parentElement !== elem) {
                                if (ctrl.state.showMenu()) {ctrl.state.showMenu(!ctrl.state.showMenu()); }
                                m.redraw();
                                return true;
                            }
                        });
                    }

                }}, [
                    ctrl.items().map(function (item) {
                        return m("div", {onclick: item.onClick}, item.label);
                    })
                ]) : ""
            ]);
        }
    };

    return Menu;
});
