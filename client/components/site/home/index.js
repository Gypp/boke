define(["mithril", "components/ui/material-icons/index", "services/model"], function (m, MaterialIcon, model) {
    'use strict';
    var Home = {
        controller: function() {
            var site = m.prop();
            model.getSite(function(data) {
                site(data[0]);
            });

            return {
                site: site
            };
        },
        view: function (ctrl) {
            return m("div", {class: "home", style:"background: transparent url('" + escape(ctrl.site() ? ctrl.site().background : "") + "') no-repeat scroll center center / cover;"}, [
                m("div", {id: "login", onclick: function () {m.route("/login"); }},
                    m.component(MaterialIcon, {code:"person"}),
                    m("div", "Connexion")
                ),
                m("div", {class: "title"}, ctrl.site() ? ctrl.site().title  : ""),
                m("div", {class: "subtitle", onclick: function () {m.route("/about"); }}, ctrl.site() ? ctrl.site().biographyLabel : ""),
                m("div", {class: "subtitle", onclick: function () {m.route("/albums"); }}, ctrl.site() ? ctrl.site().picturesLabel : ""),
                m("div", {class: "subtitle", onclick: function () {m.route("/events"); }, style: "margin-bottom:10%;"}, ctrl.site() ? ctrl.site().eventsLabel : "")
            ]);
        }
    };

    return Home;
});
