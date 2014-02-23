define(["knockout"], function (ko) {
    isViewOrModel = function (value) {
        return value.indexOf("viewmodels/") === 0 || value.indexOf("views/") === 0;
    };

    delete ko.bindingConventions.conventionBinders.template;
    ko.bindingConventions.conventionBinders.compose = {
        rules: [function (name, element, bindings, unwrapped, type) { return (type === "object" || (type === "string" && isViewOrModel(unwrapped))) && !ko.bindingConventions.utils.nodeHasContent(element); }],
        apply: function (name, element, bindings, unwrapped, type, dataFn) {
            bindings.compose = dataFn;
        }
    };

    ko.bindingConventions.conventionBinders.text.rules.push(function (name, element, bindings, unwrapped) {
        return !isViewOrModel(unwrapped);
    });
    
    String.empty = "";
    String.hasValue = function (value) {
        return value != null && value != String.empty;
    };
});

