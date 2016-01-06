define(["mithril", "services/model", "components/ui/picture/index", "application-state/index", "components/ui/material-icons/index"], function (m, model, Picture, appState, MaterialIcons) {
    'use strict';
    var Slider = {
        controller: function () {
            var idAlbum     = m.route.param("idAlbum");
            var pictures    = m.prop([]);
            var picture     = m.prop({});

            model.getPictures(idAlbum, function (data) {
                pictures(data);
                pictures().forEach(function (pic) {
                    if (pic._id === m.route.param("idPicture")) {
                        picture(pic);
                        appState.header.title(pic.name);
                    }
                });
                m.redraw(true);
            });

            var getNextPic = function () {
                var i;
                for (i = 0; i < pictures().length; i += 1) {
                    if (i < (pictures().length - 1) && pictures()[i]._id === picture()._id) {
                        return pictures()[i + 1];
                    }
                }
            };

            var getPreviousPic = function () {
                var i;
                for (i = 0; i < pictures().length; i += 1) {
                    if (i > 0 && pictures()[i]._id === picture()._id) {
                        return pictures()[i - 1];
                    }
                }
            };

            var changeToPicture = function (pic) {
                picture(pic);

                // Rewrite the url to keep the ressource when sharing via url
                // instead of routing, we just reload the picture,
                // avoiding the awful "blinking"
                var route = m.route();
                route = route.slice(0, route.lastIndexOf("/"));
                var obj = { Title: "title", Url: "#" + route + "/" + pic._id};
                history.pushState(obj, obj.Title, obj.Url);

                appState.header.title(pic.name);
            };

            return {
                idAlbum: idAlbum,
                picture: picture,
                getNextPic:  getNextPic,
                getPreviousPic: getPreviousPic,
                changeToPicture: changeToPicture
            };
        },
        view: function (ctrl) {
            if (!ctrl.picture()._id) {
                return m("div");
            }

            return m("div", {class: "slider"}, [
                m("div", {
                    style:  ctrl.getPreviousPic() ? "" : "display:none;",
                    class: "sliderButton sliderButtonLeft",
                    onclick: function () {
                        ctrl.changeToPicture(ctrl.getPreviousPic());
                    }
                }, [
                    m.component(MaterialIcons, {code: "chevron_left"})
                ]),
                m("div", {
                    style: ctrl.getNextPic() ? "" : "display:none;",
                    class: "sliderButton sliderButtonRight",
                    onclick: function () {
                        ctrl.changeToPicture(ctrl.getNextPic());
                    }
                }, [
                    m.component(MaterialIcons, {code: "chevron_right"})
                ]),
                m.component(Picture, {picture:  ctrl.picture(), key: ctrl.picture()._id})
            ]);
        }
    };

    return Slider;
});
