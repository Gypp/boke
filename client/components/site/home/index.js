define(["mithril"], function (m) {
    'use strict';
    var Home = {
        view: function () {
            return m("div", {class: "home"}, [
                m("div", {style: "color: rgb(114, 114, 114);font-size: 68px;margin-bottom:10%;"}, "BitGallery"),
                m("div", {class: "subtitle", onclick: function () {m.route("/about"); }}, "About me"),
                m("div", {class: "subtitle", onclick: function () {m.route("/albums"); }}, "Gallery"),
                m("div", {class: "subtitle", onclick: function () {m.route("/events"); }, style: "margin-bottom:10%;"}, "Upcomings events")
            ]);
        }
    };

    return Home;
});
