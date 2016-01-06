define(["mithril", "services/model", "components/ui/album/index"], function (m, model, Album) {
    'use strict';
    var Albums = {
        controller: function (options) {
            var albums  = options.list || m.prop([]);
            var visible = options.visible || function () {return null; };

            model.getAlbums(function (data) {
                albums(data);
                albums().forEach(function (album) {
                    album.picture = m.prop({});
                    album.relations.forEach(function (rel) {
                        if (rel.type === "Cover") {
                            model.getCover(rel, function (data) {
                                album.picture(data);
                                m.redraw();
                            });
                            return;
                        }
                    });
                });
            }, true);

            return {
                albums: albums,
                visible: visible,
            };
        },
        view: function (ctrl) {
            return m("div", {class: "albumList"}, [
                m("div", {class: "albums"}, [
                    ctrl.albums().filter(ctrl.visible).map(function (album) {
                        return m.component(Album, {
                            key: album._id,
                            name: album.name,
                            picture: album.picture,
                            onClick: function () {
                                m.route("/albums/" + album._id);
                            }
                        });
                    })
                ])
            ]);
        }
    };

    return Albums;
});
