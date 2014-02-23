define(["util/extend", "viewmodels/form/fields/editors/text", "fields/fieldClosures", "util/utils"], function (extend, text, fields, utils) {
    var ctor = function (opt) {
        this.constructor.baseConstructor.apply(this, arguments);
    };

    ctor.can = function (value) {
        return utils.isDate(value);
    };

    extend(ctor, text);

    return fields.editors.date = ctor;
});