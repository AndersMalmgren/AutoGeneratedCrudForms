define(["fields/fieldClosures"], function(fields) {
    var ctor = function(opt) {
        this.id = null;
        this.value = opt.value;
        this.value = (ko.isObservable(this.value) ? this.value : ko.observable(this.value));
        this.label = opt.label || String.empty;

        if (opt.options.required) {
            this.value.extend({ required: true });
        }
    };

    return fields.editors.default = ctor;
});