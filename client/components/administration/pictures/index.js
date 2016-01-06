define(["mithril", "services/model", "components/ui/crud/index"], function (m, model, Crud) {
    'use strict';

    var Pictures = {
        controller: function () {
            var pictures            = m.prop([]);
            var newPictureName      = m.prop("");
            var updatePictureName   = m.prop("");
            var newPicture          = m.prop(false);

            var getPictures = function () {
                model.getPictures(m.route.param("albumId"), function (data) {
                    pictures(data);
                    pictures().forEach(function (picture) {
                        picture.pictureRef = picture.location + picture.extension;
                        picture.content = m("div", picture.pictureRef !== undefined ? {class: "background", style: "background-image: url('" + picture.pictureRef + "');" } : {});
                    });
                    m.redraw(true);
                }, true);
            };

            var addPicture = function (callback) {
                model.addPicture({name: newPictureName(), base64: newPicture().data, extension: newPicture().extension}, m.route.param("albumId"), function () {
                    getPictures();
                    if (typeof callback === "function") {callback(); }
                });
            };

            var removePicture = function (pictureId, callback) {
                model.removePicture(pictureId, function () {
                    getPictures();
                    if (typeof callback === "function") {callback(); }
                });
            };

            var updatePicture = function (picture, callback) {
                model.updatePicture({name: updatePictureName()}, picture, callback);
            };

            var newPictureProperties = m.prop([
                function () {return m("h3", "Nouvelle photo"); },
                function () {return m("label", {for: "picture-name"}, "Nom de la photo"); },
                function () {return m("input", {name: "picture-name", onchange:  m.withAttr("value", newPictureName), value: newPictureName()}); },
                function () {return m("label", {for: "picture"}, "Photo"); },
                function () {return m("input", {name: "picture", type: "file", id: "picture", config: function (elem, init) {
                    if (!init) {
                        elem.addEventListener('change', function () {
                            var reader = new FileReader();
                            reader.addEventListener('load', function () {
                                newPicture({data: reader.result, extension: elem.files[0].name.match(/\.([0-9a-z]+)/i)[1]});
                            }, false);
                            reader.readAsDataURL(elem.files[0]);
                        }, false);
                    }
                }
                    });
                    }
            ]);

            var updatePictureProperties = m.prop([
                function () {return m("h3", "Modifier la photo"); },
                function () {return m("label", {for: "picture-name"}, "Nom de la photo"); },
                function () {return m("input", {onchange:  m.withAttr("value", updatePictureName), value: updatePictureName()}); }
            ]);

            getPictures();

            return {
                getPictures             : getPictures,
                addPicture              : addPicture,
                removePicture           : removePicture,
                updatePicture           : updatePicture,
                pictures                : pictures,
                newPictureProperties    : newPictureProperties,
                updatePictureProperties : updatePictureProperties
            };
        },
        view: function (ctrl) {
            return m.component(Crud, {
                getElements             : ctrl.getPictures,
                addElement              : ctrl.addPicture,
                removeElement           : ctrl.removePicture,
                updateElement           : ctrl.updatePicture,
                newElementProperties    : ctrl.newPictureProperties,
                updateElementProperties : ctrl.updatePictureProperties,
                elements                : ctrl.pictures
            });
        }
    };

    return Pictures;
});
