define(["mithril", "components/ui/material-icons/index", "components/ui/card/index", "application-state/index", "components/ui/form/index"], function (m, MaterialIcons, Card, appState, Form) {
    'use strict';

    function createStateVM() {
        return {
            showAdd: m.prop(false),
            showUpdate: m.prop(false)
        };
    }

    var Crud = {
        controller: function (options) {
            var getElements             = options.getElements;
            var removeElement           = options.removeElement;
            var addElement              = options.addElement;
            var updateElement           = options.updateElement;
            var newElementProperties    = options.newElementProperties;
            var updateElementProperties = options.updateElementProperties;
            var elements                = options.elements;
            var elementToUpdate         = null;

            var state = createStateVM();

            getElements();

            return {
                elements                : elements,
                state                   : state,
                getElements             : getElements,
                removeElement           : removeElement,
                addElement              : addElement,
                newElementProperties    : newElementProperties,
                elementToUpdate         : elementToUpdate,
                updateElement           : updateElement,
                updateElementProperties : updateElementProperties,
                appState                : appState,
                toggleShowAdd   : function () {
                    state.showAdd(!state.showAdd());
                },
                toggleShowUpdate   : function () {
                    state.showUpdate(!state.showUpdate());
                }
            };
        },
        view: function (ctrl) {
            return m("div", {class: "content", style: ctrl.state.showAdd() ? "overflow-y:hidden" : ""}, [
                (!ctrl.appState.navigation.visible() && !(ctrl.state.showAdd() || ctrl.state.showUpdate())) ? m("div", {class: "add-element", onclick: ctrl.toggleShowAdd}, [
                    m.component(MaterialIcons, {code: "add"})
                ]) : "",
                m("div", {class: "admin-elements"}, [
                    m("div", [
                        ctrl.elements().map(function (element) {
                            return m.component(Card, {
                                key         : element._id,
                                name        : element.name,
                                title       : element.title,
                                content     : element.content, //m("div", element.pictureRef !== undefined ? {class: "background", style: "background-image: url('" + element.pictureRef + "');" , onclick: element.onClick} : {}),
                                items       : m.prop([
                                    {label: "Delete", onClick: function () {ctrl.removeElement(element); }},
                                    {label: "Update", onClick: function () {ctrl.toggleShowUpdate(); ctrl.elementToUpdate = element; }}
                                ])
                            });
                        })
                    ])
                ]),
                ctrl.state.showAdd() ? m.component(Form, {
                    formProperties: ctrl.newElementProperties,
                    show: ctrl.state.showAdd,
                    onClick: function () {
                        ctrl.addElement(ctrl.getElements);
                    }
                }) : "",
                ctrl.state.showUpdate() ? m.component(Form, {
                    formProperties: ctrl.updateElementProperties,
                    show: ctrl.state.showUpdate,
                    onClick: function () {
                        ctrl.updateElement(ctrl.elementToUpdate, function () {
                            ctrl.getElements();
                        });
                    }
                }) : ""
            ]);
        }
    };

    return Crud;
});
