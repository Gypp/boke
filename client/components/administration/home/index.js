define(["mithril", "components/ui/material-icons/index"], function (m, MaterialIcons) {
    'use strict';
    var Home = {
        view: function () {
            return m("div", {class: "administrate"}, [
                m("div", {style: "background:rgb(76, 175, 80);", onclick: function () {m.route("/administrate/albums"); }}, [
                    m.component(MaterialIcons, {code: "collections"})
                ]),
                m("div", {style: "background:rgb(63, 81, 181);", onclick: function () {m.route("/administrate/about"); }}, [
                    m.component(MaterialIcons, {code: "face"})
                ]),
                m("div", {style: "background:rgb(244, 67, 54);", onclick: function () {m.route("/administrate/events"); }}, [
                    m.component(MaterialIcons, {code: "today"})
                ])
            ]);
        }
    };

    return Home;
});
