define(["fields/fieldClosures", "util/utils", "globalize"], function (fields, utils, globalize) {
    var culture = globalize.findClosestCulture();
    var patterns = culture.calendar.patterns;
    var defaultFormat = patterns.d + " " + patterns.t;

    var ctor = function (opt) {
        this.value = new Date(opt.value);
        this.date = globalize.format(this.value, opt.options.format || defaultFormat);
    };

    ctor.can = function(value) {
        return utils.isDate(value);
    };
    
    return fields.readonly.date = ctor;
});