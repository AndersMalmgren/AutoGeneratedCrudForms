define(["fields/fieldClosures"], function (fields) {
    var ctor = function (opt) {
        this.value = ko.observable(opt.value).extend({ isNumeric: opt.options.format || "N", number: true });
    };

    ctor.can = function (value) {
        return typeof value === "number";
    };

    return fields.readonly.number = ctor;
});