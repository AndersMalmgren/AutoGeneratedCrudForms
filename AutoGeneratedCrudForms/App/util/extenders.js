define(["knockout"], function(ko) {
    function moveValidation(observable, newObservable) {
        if (observable.__valid__) {
            newObservable.extend({ validatable: true });
            ko.utils.arrayForEach(observable.rules(), function (rule) {
                newObservable.rules.push(rule);
            });
            observable.rules([]);
        }
    }

    ko.extenders.isNumeric = function (target, format) {
        var result = ko.computed({
            read: function () {
                return Globalize.format(target(), typeof format === "boolean" ? "N" : format);
            },
            write: function (value) {
                if (value != null && value.substr) {
                    var parsedValue = Globalize.parseFloat(value);
                    if (isNaN(parsedValue)) {
                        parsedValue = value;
                    }
                    value = parsedValue;

                    if (!String.hasValue(value))
                        value = null;
                }

                target(value);
                target.valueHasMutated();
            }
        });

        target.hasValue = function () {
            return target() != null && target() != 0;
        };
        result.raw = target;

        moveValidation(target, result);

        return result;
    };
});