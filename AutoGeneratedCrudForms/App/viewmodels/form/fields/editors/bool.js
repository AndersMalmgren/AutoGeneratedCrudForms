define(["util/extend", "viewmodels/form/fields/editors/text", "fields/fieldClosures"], function (extend, text, fields) {
    var ctor = function (opt) {
        this.constructor.baseConstructor.apply(this, arguments);
    };

    ctor.can = function (value) {
        return typeof value === "boolean";
    };

    extend(ctor, text);

    return fields.editors.bool = ctor;
});