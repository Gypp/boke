define(["mithril", "components/ui/filter/index", "application-state/index", "components/ui/material-icons/index"], function (m, Filter, appState, MaterialIcon) {
    'use strict';

    function createStateVM() {
        return {
            filter: m.prop(false),
            navigation: m.prop(false)
        };
    }


    var Header = {
        controller: function (options) {
            var title       = options.title  || m.prop();
            var back        = options.back   || m.prop();
            var filter      = options.filter;
            var stateVM     = createStateVM();

            var toggleFilter = function () {
                stateVM.filter(!stateVM.filter());
                filter.searchTerm("");
            };

            var toggleNavigation = function () {
                appState.navigation.visible(!appState.navigation.visible());
            };

            return {
                title : title,
                back  : back,
                filter: filter,
                toggleFilter: toggleFilter,
                toggleNavigation: toggleNavigation,
                stateVM: stateVM
            };
        },
        view: function (ctrl) {
            return m("div", {config: ctrl.initStateVM, class: "header"}, [

                m("div", {style: "text-align:left;display:flex;align-items:center;"}, [
                    ctrl.back() ? m("i", {class: "material-icons", style: "margin-left:15px;font-size:20px;line-height:100%;", onclick: function () {m.route(ctrl.back()); }}, "arrow_back") : ''
                ]),
                m("div", {style: "display: flex;justify-content: center;align-items: center;", onclick: function(){if (!appState.navigation.disabled()) {ctrl.toggleNavigation()}}}, [
                    !appState.navigation.disabled() ? m.component(MaterialIcon, {key: new Date().getTime(), code: appState.navigation.visible() ? "keyboard_arrow_up" : "keyboard_arrow_down"}) : '',
                    m("div", {class: "title", style: ctrl.title() === "undefined" ? "visibility:hidden;" : "position:relative;"}, ctrl.title())
                ]),
                m("div", {style: "height:100%;display: flex;align-items: center;justify-content: flex-end;"}, [
                    ctrl.stateVM.filter() && ctrl.filter ? m("i", {
                        class: "material-icons",
                        style: "color: black;z-index: 1;line-height:100%;margin-right:15px;",
                        onclick: ctrl.toggleFilter
                    }, "close") : '',
                    ctrl.stateVM.filter() && ctrl.filter ? Filter.view(ctrl.filter) :  ctrl.filter ? m("i", {class: "material-icons", style: "margin-right:15px;", onclick: ctrl.toggleFilter}, "search") : ''
                ])
            ]);
        }
    };

    return Header;
});
