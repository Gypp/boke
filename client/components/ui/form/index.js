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
                                console.log(ctrl.formProperties());
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
                        if (!prop.properties) {
                            prop.properties = {};
                        }
                        if(prop.type === "input" || prop.type === "textarea") {
                            prop.properties.oninput = m.withAttr("value", function(value){
                                prop.value(value);
                            });
                            if (prop.properties.type === "file") {
                                prop.properties.config = function (elem, init) {
                                     if (!init) {
                                         elem.addEventListener('change', function () {
                                             var reader = new FileReader();
                                             reader.addEventListener('load', function () {
                                                 prop.value({data: reader.result, extension: elem.files[0].name.match(/\.([0-9a-z]+)/i)[1]});
                                             }, false);

                                             reader.readAsDataURL(elem.files[0]);
                                         }, false);
                                     }
                                };
                            }
                            return m(prop.type, prop.properties, prop.value);
                        } else if (prop.type === "component") {
                            return m.component(prop.component, prop.options);
                        } else {
                            return m(prop.type, prop.properties, prop.label);
                        }

                    }),
                    m("div", {class: "validate"}, [
                        m("button", {onclick: function () {
                            if (ctrl.formProperties().every(function (prop) {
                                return prop.mandatory ? (prop.value() ? true : false) : true
                            })) {
                                ctrl.onClick();
                                if (args.show()) {args.show(!args.show()); }
                            } else {
                                alert("Des champs obligatoire sont vides");
                            }
                        }}, "Envoyer")
                    ])
                ])
            ]);
        }
    };

    return Form;
});
