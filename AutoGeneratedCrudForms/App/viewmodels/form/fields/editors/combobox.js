define(["util/extend", "viewmodels/form/fields/editors/text", "fields/fieldClosures"], function (extend, text, fields) {
    var ctor = function(opt) {
        this.constructor.baseConstructor.apply(this, arguments);
        this.dataSource = opt.options.combo.dataSource;
    };

    ctor.can = function(value, opt) {
        return opt.options.combo !== undefined;
    };  

    extend(ctor, text);

    return fields.editors.combobox = ctor;
});