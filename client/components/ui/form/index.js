define(["mithril", "utils"], function (m, utils) {
    'use strict';

    var Form = {
        controller: function (options) {
            return {
                formProperties  : options.formProperties,
                onClick         : options.onClick
            };
        },
        view: function (ctrl, args) {
            return m("div", {class: "form"}, [
                m("div", {config: function (elem, isInit) {
                    if (!isInit) {
                        utils.otel(window, "mousedown", function (e) {
                            function isEventOutOfElement(element, target) {
                                var result = true;
                                function check(targetElement) {
                                    if (targetElement.parentElement) {
                                        if (targetElement.parentElement !== element) {
                                            check(targetElement.parentElement);
                                        } else {
                                            result = false;
                                        }
                                    }
                                }
                                if (target === element) {
                                    result = false;
                                } else {
                                    check(target);
                                }
                                return result;
                            }
                            if (isEventOutOfElement(elem, e.target)) {
                                if (args.show()) {args.show(!args.show()); }
                                m.redraw();
                                return true;
                            }
                        });
                    }
                }}, [
                    ctrl.formProperties().map(function (prop) {
                        return prop();
                    }),
                    m("div", {class: "validate"}, [
                        m("button", {onclick: function () {
                            ctrl.onClick();
                            if (args.show()) {args.show(!args.show()); }
                        }}, "Envoyer")
                    ])
                ])
            ]);
        }
    };

    return Form;
});
