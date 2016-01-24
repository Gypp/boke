define(["mithril", "components/ui/material-icons/index"], function (m, MaterialIcon) {
    'use strict';

    function getDays(date) {
        var dayTable = [];
        var daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        var dayOutOfMonth = 36 - daysInMonth;
        var dayBefore = 0;
        var dayAfter = 0;

        dayBefore = Math.floor(dayOutOfMonth / 2) + ((dayOutOfMonth % 2 === 0) ?  0 : 1);
        dayAfter  = Math.floor(dayOutOfMonth / 2);

        var daysInPrevMonth = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
        while (dayBefore > 0) {
            dayTable.push(new Date(date.getFullYear(), date.getMonth() - 1, daysInPrevMonth - dayBefore));
            dayBefore -= 1;
        }
        var i = 0;
        for (i = 1; i <= daysInMonth; i += 1) {
            dayTable.push(new Date(date.getFullYear(), date.getMonth(), i));
        }

        for (i = 1; i <= dayAfter; i += 1) {
            dayTable.push(new Date(date.getFullYear(), date.getMonth() + 1, i));
        }

        return dayTable;
    }

    var DatePicker = {
        controller: function (options) {
            if (options.dates().length === 0) {
                options.dates().push(new Date());
            }

            var days = m.prop(getDays(options.dates()[0]));

            return {
                dates: options.dates,
                days : days,
                currentMonth: options.dates()[0].getMonth(),
                currentYear: options.dates()[0].getFullYear(),
                readOnly: options.readOnly
            };
        },
        view: function (ctrl) {
            return m("div", {class: "date-picker"}, [
                m("div", {class: "date-header"}, [
                    m("div", {style: "display:flex;width:250px;justify-content:space-between;"}, [
                        !ctrl.readOnly ? m("span", {onclick: function () {
                            if (ctrl.currentMonth === 0) {
                                ctrl.currentYear -= 1;
                                ctrl.currentMonth = 11;
                            } else {
                                ctrl.currentMonth -= 1;
                            }
                            ctrl.days(getDays(new Date(ctrl.currentYear, ctrl.currentMonth, 1)));
                        }, class: "button"}, [m.component(MaterialIcon, {code: "navigate_before"})]) : "",
                        m("span", ctrl.currentYear + "-" + ("0" + (ctrl.currentMonth + 1)).slice(-2)),
                        !ctrl.readOnly ? m("span", {onclick: function () {
                            if (ctrl.currentMonth === 11) {
                                ctrl.currentYear += 1;
                                ctrl.currentMonth = 0;
                            } else {
                                ctrl.currentMonth += 1;
                            }
                            ctrl.days(getDays(new Date(ctrl.currentYear, ctrl.currentMonth, 1)));
                        }, class: "button"}, [m.component(MaterialIcon, {code: "navigate_next"})]) : ""
                    ])
                ]),
                m("table", {class: ""}, function () {
                    var list = [];
                    var i = 0;
                    for (i = 0; i <= 5; i += 1) {
                        list.push(
                            m("tr", function () {
                                var list = [];
                                var j = 0;
                                for (j = 0; j <= 5; j += 1) {
                                    var currentDay = ctrl.days()[((i * 6) + j)];
                                    var getOnClick = function(i, j) {
                                        var currentDay = ctrl.days()[((i * 6) + j)];
                                        return !ctrl.readOnly ? function () {
                                            if (ctrl.dates().every(function (e) {
                                                    return (e.getYear() !== currentDay.getYear() ||
                                                            e.getMonth() !== currentDay.getMonth() ||
                                                            e.getDate() !== currentDay.getDate());
                                                })) {
                                                ctrl.dates().push(ctrl.days()[((i * 6) + j)]);
                                                ctrl.days(getDays(ctrl.dates()[ctrl.dates().length - 1]));
                                                ctrl.currentMonth = ctrl.dates()[ctrl.dates().length - 1].getMonth();
                                                ctrl.currentYear = ctrl.dates()[ctrl.dates().length - 1].getFullYear();
                                            } else {
                                                ctrl.dates(ctrl.dates().filter(function (e) {
                                                    return (e.getYear() !== currentDay.getYear() ||
                                                            e.getMonth() !== currentDay.getMonth() ||
                                                            e.getDate() !== currentDay.getDate());
                                                }));
                                            }

                                        } : function () {};
                                    };
                                    list.push(m("td", {
                                        onclick: getOnClick(i, j),
                                        style:  (currentDay.getMonth() !== ctrl.currentMonth) ? "opacity:0.5;" :
                                                (!ctrl.dates().every(function (e){
                                                    return (currentDay.getDate() !== e.getDate() || currentDay.getMonth() !== e.getMonth() || currentDay.getYear() !== e.getYear());
                                                })) ? "background:#0069CF;border-radius:50%;color:white;" : ""
                                    }, currentDay.getDate()));
                                }
                                return list;
                            }())
                        )
                    }
                    return list;
                }())
            ])
        }
    };

    return DatePicker;
});
