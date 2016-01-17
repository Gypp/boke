define(["mithril", "components/ui/material-icons/index"], function (m, MaterialIcon) {
    'use strict';
    var Home = {
        view: function () {
            return m("div", {class: "home"}, [
                m("div", {id: "login", onclick: function () {m.route("/login"); }},
                    m.component(MaterialIcon, {code:"person"}),
                    m("div", "Connexion")
                ),
                m("div", {style: "color: rgb(114, 114, 114);font-size: 68px;margin-bottom:10%;"}, "BitGallery"),
                m("div", {class: "subtitle", onclick: function () {m.route("/about"); }}, "About me"),
                m("div", {class: "subtitle", onclick: function () {m.route("/albums"); }}, "Gallery"),
                m("div", {class: "subtitle", onclick: function () {m.route("/events"); }, style: "margin-bottom:10%;"}, "Upcomings events")
            ]);
        }
    };

    return Home;
});
