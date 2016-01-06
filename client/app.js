require.config({
    paths: {
        "mithril":  '../node_modules/mithril/mithril',
        "marked":   '../node_modules/marked/lib/marked',
        "postal":   '../node_modules/postal/lib/postal.lodash.bundle'
    }
});

require(["mithril", "components/site/albums/index", "components/site/pictures/index", "components/site/home/index",
    "components/site/about/index", "components/site/slider/index", "components/ui/header/index", "application-state/index",
    "components/ui/filter/index", "components/administration/login/index", "components/administration/about/index",
    "components/administration/albums/index", "components/administration/events/index", "components/administration/pictures/index",
    "components/ui/navigation/index", "components/site/events/index"],
    function (m, Albums, Pictures, Home, Aboutme, Slider, Header, appState, Filter, Login, AdminAbout, AdminAlbums, AdminEvents, AdminPictures, Navigation, Events) {
        'use strict';
        m.route.mode = "hash";

        var NavigationWithRoutes = m.component(Navigation, {
            items: m.prop([
                {onClick: function () {m.route("/administrate/albums"); }, delay: 0, iconCode: "collections", title: "Photographies"},
                {onClick: function () {m.route("/administrate/about"); }, delay: 0.05, iconCode: "face", title: "Biographie"},
                {onClick: function () {m.route("/administrate/events"); }, delay: 0.1, iconCode: "today", title: "Evenements à venir"}
            ])
        });

        m.route(document.body, "/", {
            "/": Home,
            "/login": Login,
            "/administrate/about": {
                controller: function () {
                    appState.header.title("About");
                    appState.navigation.visible(false);
                    appState.navigation.disabled(false);
                    return {title: appState.header.title};
                },
                view: function (ctrl) {
                    return m("div", {class: "wrapper"}, [
                        m.component(Header, ctrl),
                        appState.navigation.visible() ? NavigationWithRoutes : "",
                        m.component(AdminAbout, {})
                    ]);
                }
            },
            "/administrate/albums": {
                controller: function () {
                    appState.header.title("Albums");
                    appState.navigation.visible(false);
                    appState.navigation.disabled(false);
                    return {title: appState.header.title};
                },
                view: function (ctrl) {
                    return m("div", {class: "wrapper"}, [
                        m.component(Header, ctrl),
                        appState.navigation.visible() ? NavigationWithRoutes : "",
                        m.component(AdminAlbums, {})
                    ]);
                }
            },
            "/administrate/albums/:albumId/pictures": {
                controller: function () {
                    appState.header.title("Pictures");
                    appState.header.back("/administrate/albums");
                    appState.navigation.visible(false);
                    appState.navigation.disabled(false);
                    return {title: appState.header.title, back: appState.header.back};
                },
                view: function (ctrl) {
                    return m("div", {class: "wrapper"}, [
                        m.component(Header, ctrl),
                        appState.navigation.visible() ? NavigationWithRoutes : "",
                        m.component(AdminPictures, {})
                    ]);
                }
            },
            "/administrate/events": {
                controller: function () {
                    appState.header.title("Events");
                    appState.navigation.visible(false);
                    appState.navigation.disabled(false);
                    return {title: appState.header.title};
                },
                view: function (ctrl) {
                    return m("div", {class: "wrapper"}, [
                        m.component(Header, ctrl),
                        appState.navigation.visible() ? NavigationWithRoutes : "",
                        m.component(AdminEvents, {})
                    ]);
                }
            },
            "/about": {
                controller: function () {
                    appState.header.title("About");
                    appState.header.back("/");
                    appState.navigation.disabled(true);
                    return {title: appState.header.title, back: appState.header.back};
                },
                view: function (ctrl) {
                    return m("div", {class: "wrapper"}, [
                        m.component(Header, ctrl),
                        m.component(Aboutme, {})
                    ]);
                }
            },
            "/albums": {
                controller: function () {
                    appState.header.title("Albums");
                    appState.header.back("/");
                    appState.navigation.disabled(true);
                    var filter  = new Filter.controller();
                    var list    = new m.prop([]);
                    var visible = function (data) {
                        return data.name.toUpperCase().indexOf(filter.searchTerm().toUpperCase()) > -1;
                    };
                    return {
                        title: appState.header.title,
                        back: appState.header.back,
                        filter: filter,
                        list: list,
                        visible: visible
                    };
                },
                view: function (ctrl) {
                    return m("div", {class: "wrapper"}, [
                        m.component(Header, ctrl),
                        m("div", {id: "content"}, [
                            m.component(Albums, {
                                filter: ctrl.filter,
                                list: ctrl.list,
                                visible: ctrl.visible
                            })
                        ])
                    ]);
                }
            },
            "/events": {
                controller: function () {
                    appState.header.title("Events");
                    appState.header.back("/");
                    appState.navigation.disabled(true);
                    return {
                        title: appState.header.title,
                        back: appState.header.back
                    };
                },
                view: function (ctrl) {
                    return m("div", {class: "wrapper"}, [
                        m.component(Header, ctrl),
                        m("div", {id: "content"}, [
                            m.component(Events, {})
                        ])
                    ]);
                }
            },
            "/albums/:idAlbum": {
                controller: function () {
                    appState.header.back("/albums");
                    appState.navigation.disabled(true);
                    return {
                        title: appState.header.title,
                        back: appState.header.back
                    };
                },
                view: function (ctrl) {
                    return m("div", {class: "wrapper"}, [
                        m.component(Header, ctrl),
                        m.component(Pictures, {})
                    ]);
                }
            },
            "/albums/:idAlbum/:idPicture": {
                controller: function () {
                    appState.header.back("/albums/" + m.route.param("idAlbum"));
                    appState.navigation.disabled(true);
                    return {
                        title: appState.header.title,
                        back: appState.header.back
                    };
                },
                view: function (ctrl) {
                    return m("div", {class: "wrapper"}, [
                        m.component(Header, ctrl),
                        m.component(Slider, {})
                    ]);
                }
            }
        });
    });
