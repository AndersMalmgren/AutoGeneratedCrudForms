

define(["fields/fieldClosures",
    "viewmodels/form/fields/readonly/text", //Need to find a better way to load all view models with requirejs
    "viewmodels/form/fields/readonly/date",
    "viewmodels/form/fields/readonly/number",
    "viewmodels/form/fields/readonly/bool",
    "viewmodels/form/fields/editors/text",
    "viewmodels/form/fields/editors/number",
    "viewmodels/form/fields/editors/bool",
    "viewmodels/form/fields/editors/date"], function (fields) {
    function factory(closure, opt) {
        for (var index in closure) {
            var model = closure[index];
            if (model.can && model.can(opt == null ? null : ko.unwrap(opt.value))) {
                return model;
            }
        }

        return closure.default;
    }

    var id = 0;
    var ctor = function(label, value, canEdit, options) {
        this.id = "control-" + id++;
        this.label = label;
        this.canEdit = canEdit;
        var opt = { value: value, label: label, options: options };

        this.field = ko.computed(function () {
            var closure = ko.unwrap(this.canEdit) ? fields.editors : fields.readonly;
            var model = factory(closure, opt);
            var field = new model(opt);
            field.id = this.id;
            return field;
        }, this);
        
        this.hasError = ko.computed(this.getHasError, this);
    };

    ctor.prototype = {
        getHasError: function() {
            return this.field().value.isValid && !this.field().value.isValid();
        }
    };

    return ctor;
});