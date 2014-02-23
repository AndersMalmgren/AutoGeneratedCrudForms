define(function () {
    ko.bindingHandlers.datepicker = {
        init: function (element, valueAccesor) {
            var date = valueAccesor();
            var $element = $(element);
            $element.datetimepicker();
            $element.on("change.dp", function (e) {
                if (e.date !== undefined) {
                    date(e.date.toDate());
                }
            });
        },
        update: function(element, valueAccessor) {
            $(element).data("DateTimePicker").setDate(ko.unwrap(valueAccessor()));
        }
    };
});
