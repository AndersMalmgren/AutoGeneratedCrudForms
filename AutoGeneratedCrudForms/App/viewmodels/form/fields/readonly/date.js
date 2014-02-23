define(["fields/fieldClosures", "util/utils"], function(fields, utils) {
    var ctor = function(opt) {
        this.value = new Date(opt.value);
        this.date = Globalize.format(this.value, opt.options.format || "d");
    };

    ctor.can = function(value) {
        return utils.isDate(value);
    };
    
    return fields.readonly.date = ctor;
});