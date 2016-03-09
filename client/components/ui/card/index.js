define(["mithril", "components/ui/menu/index"], function (m, Menu) {
    'use strict';
    var Card = {
        view: function (ctrl, args) {
            return m("div", {class: "card"}, [
                m("div", [
                    args.title ? m("div", {class: "card-header"}, [
                        m("div", args.title),
                        args.items ? m.component(Menu, {items: args.items}) : ""
                    ]) : null,
                    args.content,
                    args.name ? m("div", {class: "label-bar", style: ""}, [
                        m("div", {style: "width:15%;"}),
                        m("div", {style: "width:70%;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;display: block;", class: "label"}, args.name),
                        args.items ? m("div", {style: "width:15%;", class: "menu"}, [
                            m.component(Menu, {items: args.items})
                        ]) : ""
                    ]) : null
                ])
            ]);
        }
    };

    return Card;
});
