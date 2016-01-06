define(["mithril", "services/model", "components/ui/crud/index"], function (m, model, Crud) {
    'use strict';

    var Albums = {
        controller: function () {
            var albums              = m.prop([]);
            var newAlbumName        = m.prop("");
            var updateAlbumName     = m.prop("");
            var newAlbumCover       = m.prop(false);

            var getAlbums = function (callback) {
                model.getAlbums(function (data) {
                    albums(data);
                    albums().forEach(function (album) {
                        album.picture = m.prop({});
                        album.relations.forEach(function (rel) {
                            if (rel.type === "Cover") {
                                model.getCover(rel, function (data) {
                                    album.picture(data);
                                    album.pictureRef = data.location + data.extension;
                                    album.content = m("div", album.pictureRef !== undefined ?
                                            {class: "background", style: "background-image: url('" + album.pictureRef + "');", onclick: function () {
                                                m.route("/administrate/albums/" + album._id + "/pictures");
                                            }} : {});
                                    m.redraw(true);
                                });
                            }
                        });
                    });
                    m.redraw(true);
                    if (typeof callback === "function") {callback(); }
                }, true);
            };

            var addAlbum = function (callback) {
                model.addAlbum({name: newAlbumName()}, function (data) {
                    model.addCover({name: "cover", base64: newAlbumCover().data, extension: newAlbumCover().extension}, data._id, function () {
                        getAlbums();
                    });
                    if (typeof callback === "function") {callback(); }
                });
            };

            var removeAlbum = function (albumId, callback) {
                model.removeAlbum(albumId, function () {
                    getAlbums();
                    if (typeof callback === "function") {callback(); }
                });
            };

            var updateAlbum = function (album, callback) {
                model.updateAlbum({name: updateAlbumName()}, album, callback);
            };

            var newAlbumProperties = m.prop([
                function () {return m("h3", "Nouvel album"); },
                function () {return m("label", {for: "album-name"}, "Nom de l'abum"); },
                function () {return m("input", {name: "album-name", onchange:  m.withAttr("value", newAlbumName), value: newAlbumName()}); },
                function () {return m("label", {for: "album-cover"}, "Couverture de l'album"); },
                function () {return m("input", {name: "album-cover", type: "file", id: "cover", config: function (elem, init) {
                    if (!init) {
                        elem.addEventListener('change', function () {
                            var reader = new FileReader();
                            reader.addEventListener('load', function () {
                                newAlbumCover({data: reader.result, extension: elem.files[0].name.match(/\.([0-9a-z]+)/i)[1]});
                            }, false);
                            reader.readAsDataURL(elem.files[0]);
                        }, false);
                    }
                }
                    });
                    }
            ]);

            var updateAlbumProperties = m.prop([
                function () {return m("h3", "Mettre à jour l'album"); },
                function () {return m("label", {name: "album-name", for: "album-name"}, "Nom de l'abum"); },
                function () {return m("input", {onchange:  m.withAttr("value", updateAlbumName), value: updateAlbumName()}); }
            ]);

            return {
                getAlbums               : getAlbums,
                addAlbum                : addAlbum,
                removeAlbum             : removeAlbum,
                updateAlbum             : updateAlbum,
                newAlbumProperties      : newAlbumProperties,
                updateAlbumProperties   : updateAlbumProperties,
                albums                  : albums
            };
        },
        view: function (ctrl) {
            return m.component(Crud, {
                getElements             : ctrl.getAlbums,
                addElement              : ctrl.addAlbum,
                removeElement           : ctrl.removeAlbum,
                updateElement           : ctrl.updateAlbum,
                newElementProperties    : ctrl.newAlbumProperties,
                updateElementProperties : ctrl.updateAlbumProperties,
                elements                : ctrl.albums
            });
        }
    };

    return Albums;
});
