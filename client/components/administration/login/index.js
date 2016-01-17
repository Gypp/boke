define(["mithril", "services/model"], function (m, model) {
    'use strict';
    var Login = {
        controller: function () {
            var login       = m.prop("");
            var password    = m.prop("");

            var authenticate = function authenticate() {
                model.authenticate({login: login(), password: password()}, function (data) {
                    if (!data.success) {
                        return;
                    }
                    sessionStorage.setItem('token', data.token);
                    m.route("/administrate/albums");
                });
            }

            return {
                login: login,
                password: password,
                authenticate: authenticate
            };
        },
        view: function (ctrl) {
            var formData = new FormData();
            formData.append('name', "azerty");
            formData.append('password', "azerty");
            return m("div", {class: "login", style: ""}, [
                m("div", [
                    m("div", {class: "title"}, "Login"),
                    m("input", {onchange: m.withAttr("value", ctrl.login), placeholder: "Indentifiant"}),
                    m("input", {type: "password", onchange: m.withAttr("value", ctrl.password), placeholder: "Mot de passe"}),
                    m("button", {onclick: ctrl.authenticate}, "Connexion"),
                    m("button", {style: "color:grey", onclick: function() {m.route("/home")}}, "Retour")
                ])
            ]);
        }
    };

    return Login;
});
