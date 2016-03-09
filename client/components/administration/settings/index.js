define(["mithril", "services/model", "components/ui/form/index"], function (m, model, Form) {
    'use strict';

    var Settings = {
        controller: function () {
            var siteTitle               = m.prop("");
            var siteBackground          = m.prop();
            var siteBiographyLabel      = m.prop("");
            var sitePicturesLabel       = m.prop("");
            var siteEventsLabel         = m.prop("");
            var siteBackgroundColor     = m.prop("");

            model.getSite(function(data) {
                data = data[0];
                siteTitle(data.title);
                siteBiographyLabel(data.biographyLabel);
                sitePicturesLabel(data.picturesLabel);
                siteEventsLabel(data.eventsLabel);
            });

            var updateSiteProperties = m.prop([
                {type: "h3", label: "Paramètres du site"},
                {type: "label", label: "Nom du site", properties:{for: "site-title"}},
                {type: "input", mandatory: true, properties: {type: "text", name: "site-title"}, value: siteTitle},
                {type: "label", label: "Fond d'écran du site", properties:{for: "site-background"}},
                {type: "input", properties: {type: "file", name: "site-background", id: "site-background"}, value: siteBackground},
                {type: "label", label: "Text du lien vers les biography", properties:{for: "site-biography"}},
                {type: "input", mandatory: true, properties: {type: "text", name: "site-biography", id: "site-biography"}, value: siteBiographyLabel},
                {type: "label", label: "Text du lien vers les photos", properties:{for: "site-pictures"}},
                {type: "input", mandatory: true, properties: {type: "text", name: "site-pictures", id: "site-pictures"}, value: sitePicturesLabel},
                {type: "label", label: "Text du lien vers les évenements", properties:{for: "site-events"}},
                {type: "input", mandatory: true, properties: {type: "text", name: "site-events", id: "site-events"}, value: siteEventsLabel},
                {type: "label", label: "Couleur de l'arrière plan (en hexadécimal)", properties:{for: "site-backgroundColor"}},
                {type: "input", mandatory: true, properties: {type: "text", name: "site-backgroundColor", id: "site-backgroundColor"}, value: siteBackgroundColor}
            ]);

            return {
                properties: updateSiteProperties,
                onClick: function() {
                    model.updateSite({
                        background: siteBackground(),
                        title: siteTitle(),
                        biographyLabel:siteBiographyLabel(),
                        picturesLabel:sitePicturesLabel(),
                        eventsLabel:siteEventsLabel(),
                        backgroundColor: siteBackgroundColor()
                    }, function() {
                        m.route("/administrate/albums");
                    });

                }
            };
        },
        view: function (ctrl) {
            return m("div", {class: "admin-settings"}, [
                m.component(Form, {
                    formProperties: ctrl.properties,
                    show: function(){},
                    onClick: ctrl.onClick
                })
            ]);
        }
    };

    return Settings;
});
