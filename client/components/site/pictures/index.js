define(["mithril", "services/model", "application-state/index"], function (m, model, appState) {
    'use strict';
    var Pictures = {
        controller: function () {
            var idAlbum = m.route.param("idAlbum");
            var pictures = m.prop([]);

            model.getPictures(idAlbum, pictures);

            model.getAlbum(idAlbum, function (data) {
                if (!data) {
                    return;
                }
                appState.header.title(data.name);
                m.redraw(true);
            });

            return {
                pictures : pictures,
                idAlbum: idAlbum
            };
        },
        view: function (ctrl) {
            return m("div", {class: "pictures"}, [
                ctrl.pictures().map(function (picture) {
                    return m("div", {
                        class: "picture",
                        onclick: function () {
                            m.route("/albums/" + ctrl.idAlbum + "/" + picture._id);
                        },
                        style: "background: url(" + picture.location + picture.extension + ")no-repeat; background-size:cover;"
                    });
                })
            ]);
        }
    };

    return Pictures;
});
