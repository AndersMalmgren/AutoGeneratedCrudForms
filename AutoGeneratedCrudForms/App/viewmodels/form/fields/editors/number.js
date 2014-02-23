define(["util/extend", "viewmodels/form/fields/editors/text", "fields/fieldClosures"], function (extend, text, fields) {
    var ctor = function(opt) {
        this.constructor.baseConstructor.apply(this, arguments);
        this.value = this.value.extend({ isNumeric: opt.options.format || "N", number: true });
    };

    ctor.can = function(value) {
        return typeof value === "number";
    };  

    extend(ctor, text);

    return fields.editors.number = ctor;
});