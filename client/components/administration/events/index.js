define(["mithril", "services/model", "components/ui/crud/index", "components/ui/date-picker/index", "components/ui/date-viewer/index"], function (m, model, Crud, DatePicker, DateViewer) {
    'use strict';

    var Events = {
        controller: function () {
            var events                  = m.prop([]);
            var newEventName            = m.prop("");
            var newEventDescription     = m.prop("");
            var updateEventDescription  = m.prop("");
            var updateEventName         = m.prop("");
            var updateEventDates        = m.prop([]);
            var newEventDates           = m.prop([new Date()]);

            var preloadUpdateEvent = function (event) {
                updateEventDates(event.dates);
                updateEventName(event.title);
                updateEventDescription(event.description);
            }

            var getEvents = function (callback) {
                model.getEvents(function (data) {

                    data.forEach(function (event) {
                        event.dates.forEach(function (date, index) {
                            event.dates[index] = new Date(date);
                        });

                        event.content = m("div", {class: "event-content"}, [
                            m("p", {type: "text"}, event.description),
                            m.component(DateViewer, {dates: m.prop(event.dates), readOnly: true})
                        ]);
                    });
                    events(data);
                    m.redraw(true);
                    if (typeof callback === "function") {callback(); }
                }, true);
            };

            var addEvent = function (callback) {
                model.addEvent({
                    title: newEventName(),
                    dates: newEventDates(),
                    description: newEventDescription()
                }, function () {
                    if (typeof callback === "function") {callback(); }
                });
            };

            var removeEvent = function (event, callback) {
                model.removeEvent(event, function () {
                    getEvents();
                    if (typeof callback === "function") {callback(); }
                });
            };

            var updateEvent = function (event, callback) {
                model.updateEvent({
                    title: updateEventName(),
                    dates: updateEventDates(),
                    description: updateEventDescription()
                }, event, callback);
            };

            var newEventProperties = m.prop([
                 {type: "h3", label: "Nom de l'event"},
                 {type: "label", label: "Nom de l'event", properties:{for: "event-name"}},
                 {type: "input", value: newEventName},
                 {type: "label", label: "Description de l'event", properties:{for: "event-description"}},
                 {type: "textarea", value: newEventDescription},
                 {type: "component", component: DatePicker, options: {dates: newEventDates}}
            ]);

            var updateEventProperties = m.prop([
                {type: "h3", label: "Nom de l'event"},
                {type: "label", label: "Nom de l'event", properties:{for: "event-name"}},
                {type: "input", value: updateEventName},
                {type: "label", label: "Description de l'event", properties:{for: "event-description"}},
                {type: "textarea", value: updateEventDescription},
                {type: "component", component: DatePicker, options: {dates: updateEventDates}}
            ]);

            return {
                getEvents               : getEvents,
                addEvent                : addEvent,
                removeEvent             : removeEvent,
                updateEvent             : updateEvent,
                newEventProperties      : newEventProperties,
                updateEventProperties   : updateEventProperties,
                events                  : events,
                preloadUpdateEvent      : preloadUpdateEvent
            };
        },
        view: function (ctrl) {
            return m("div", {class: "events"}, [
                m.component(Crud, {
                    getElements             : ctrl.getEvents,
                    addElement              : ctrl.addEvent,
                    removeElement           : ctrl.removeEvent,
                    updateElement           : ctrl.updateEvent,
                    newElementProperties    : ctrl.newEventProperties,
                    updateElementProperties : ctrl.updateEventProperties,
                    elements                : ctrl.events,
                    preloadUpdate           : ctrl.preloadUpdateEvent
                })
            ]);
        }
    };

    return Events;
});
