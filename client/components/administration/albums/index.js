define(["mithril", "services/model", "components/ui/crud/index"], function (m, model, Crud) {
    'use strict';

    var Albums = {
        controller: function () {
            var albums              = m.prop([]);
            var newAlbumName        = m.prop("");
            var updateAlbumName     = m.prop("");
            var newAlbumCover       = m.prop(false);
            var updateAlbumCover    = m.prop(false);

            var preloadUpdateAlbum = function (album){
                updateAlbumName(album.name);
            }

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
                model.updateAlbum({name: updateAlbumName()}, album, function (data) {
                    model.addCover({name: "cover", base64: updateAlbumCover().data, extension: updateAlbumCover().extension}, album._id, function () {
                        getAlbums();
                    });
                    if (typeof callback === "function") {callback(); }
                });
            };

            var newAlbumProperties = m.prop([
                {type: "h3", label: "Nouvel album"},
                {type: "label", label: "Nom de l'abum", properties:{for: "album-name"}},
                {type: "input", mandatory: true, properties: {type: "text", name: "album-name"}, value: newAlbumName},
                {type: "label", label: "Couverture de l'album", properties:{for: "album-cover"}},
                {type: "input", mandatory: true, properties: {type: "file", name: "album-cover", id: "cover"}, value: newAlbumCover}
            ]);

            var updateAlbumProperties = m.prop([
                {type: "h3", label: "Mettre à jour l'album"},
                {type: "label", label: "Nom de l'abum", properties:{for: "album-name"}},
                {type: "input", mandatory: true, properties: {name: "album-name"}, value: updateAlbumName},
                {type: "label", label: "Couverture de l'album", properties:{for: "album-cover"}},
                {type: "input", mandatory: true, properties: {type: "file", name: "album-cover", id: "cover"}, value: updateAlbumCover}
            ]);

            return {
                getAlbums               : getAlbums,
                addAlbum                : addAlbum,
                removeAlbum             : removeAlbum,
                updateAlbum             : updateAlbum,
                newAlbumProperties      : newAlbumProperties,
                updateAlbumProperties   : updateAlbumProperties,
                albums                  : albums,
                preloadUpdateAlbum      : preloadUpdateAlbum
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
                elements                : ctrl.albums,
                preloadUpdate           : ctrl.preloadUpdateAlbum
            });
        }
    };

    return Albums;
});
