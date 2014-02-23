define(["fields/fieldClosures"], function (fields) {
    var ctor = function(opt) {
        this.value = opt.value;
    };

    return fields.readonly.default = ctor;
});