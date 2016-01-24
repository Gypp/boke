define(["mithril", "services/model", "components/ui/crud/index"], function (m, model, Crud) {
    'use strict';

    var Pictures = {
        controller: function () {
            var pictures            = m.prop([]);
            var newPictureName      = m.prop("");
            var updatePictureName   = m.prop("");
            var newPicture          = m.prop(false);
            var updatedPicture       = m.prop(false);

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
                model.updatePicture({name: updatePictureName(), base64: updatedPicture().data, extension: updatedPicture().extension}, picture, callback);
            };

            var newPictureProperties = m.prop([
                {type: "h3", label: "Nouvel photo"},
                {type: "label", label: "Nom de la photo", properties:{for: "picture-name"}},
                {type: "input", mandatory: true, properties: {type: "text", name: "picture-name"}, value: newPictureName},
                {type: "label", label: "Photo", properties:{for: "picture"}},
                {type: "input", mandatory: true, properties: {type: "file", name: "picture", id: "picture"}, value: newPicture}
            ]);

            var updatePictureProperties = m.prop([
                {type: "h3", label: "Modifier le nom de la photo"},
                {type: "label", label: "Nom de la photo", properties:{for: "picture-name"}},
                {type: "input", mandatory: true, properties: {type: "text", name: "picture-name"}, value: updatePictureName},
                {type: "label", label: "Photo", properties:{for: "picture"}},
                {type: "input", mandatory: true, properties: {type: "file", name: "picture", id: "picture"}, value: updatedPicture}
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
