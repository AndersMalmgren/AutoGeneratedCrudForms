define(["fields/fieldClosures"], function (fields) {
    var ctor = function (opt) {
        this.value = (opt.value || {})["name"];
    };

    ctor.can = function (value, context) {
        return context.options.combo !== undefined;
    };

    return fields.readonly.combobox = ctor;
});