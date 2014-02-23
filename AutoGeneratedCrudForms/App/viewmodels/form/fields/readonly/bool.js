define(["fields/fieldClosures"], function (fields) {
    var ctor = function (opt) {
        this.value = opt.value;
    };

    ctor.can = function (value) {
        return typeof value === "boolean";
    };

    return fields.readonly.bool = ctor;
});