define(["mithril", "services/model", "application-state/index", "components/ui/card/index"], function (m, model, appState, Card) {
    'use strict';
    var Events = {
        controller: function () {
            var events = m.prop([]);
            model.getEvents(function(data){
                events(data);
                m.redraw();
            });

            return {
                events : events,
            };
        },
        view: function (ctrl) {
            return m("div", {class: "events-client"}, [
                ctrl.events().map(function (event) {
                    return m.component(Card, {
                        title: event.title,
                        content: [
                            m("p", event.description)
                        ]
                    })
                })
            ]);
        }
    };

    return Events;
});
