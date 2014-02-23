define(["viewmodels/form/field"], function (field) {
    var ctor = function(data, options) {
        this.fieldsHash = {};
        this.fields = [];

        var globalCanEdit = this.getGlobalCanEdit(options);
        var autoGenerate = this.getAutoGenerateOptions(options);

        var fieldOptions = (options != undefined ? options.fields : null) || options;
        if (autoGenerate || fieldOptions === undefined || this.countMembers(fieldOptions) === 0) {
            fieldOptions = this.autoGenerateFieldOptions(data, fieldOptions);
        }

        for (var fieldName in fieldOptions) {
            var o = fieldOptions[fieldName];
            var value = (typeof data !== "object" ? o : data[fieldName]);
            if (value === undefined) {
                value = "";
            }

            var model = new field(o.label || this.getLabelFromFieldName(fieldName), value, o.canEdit || globalCanEdit, o);
            this.fieldsHash[fieldName] = model;
            this.fields.push(model);
        }

        this.isValid = ko.computed(this.getIsValid, this);
    };

    ctor.prototype = {
        countMembers: function(obj) {
            var count = 0;
            for (var index in obj) {
                count++;
            }
            return count;
        },
        getGlobalCanEdit: function (options) {
            var globalCanEdit = undefined;
            if (options !== undefined) {
                globalCanEdit = options.canEdit;
                delete options.canEdit;
            }

            return globalCanEdit;
        },
        getAutoGenerateOptions: function (options) {
            var autoGenerate = undefined;
            if (options !== undefined) {
                autoGenerate = options.autoGenerate;
                delete options.autoGenerate;
            }

            return autoGenerate;
        },
        autoGenerateFieldOptions: function (data, options) {
            options = options || {};
            for (var index in data) {
                if (options[index] === undefined) {
                    options[index] = true;
                }
            }

            return options;
        },
        serialize: function(data) {
            data = data || {};
            for (var index in this.fieldsHash) {
                var f = this.fieldsHash[index];
                if(ko.unwrap(f.canEdit)) {
                    var value = f.field().value;
                    data[index] = ko.unwrap(value.raw || value);
                }
            }

            return data;
        },
        getLabelFromFieldName: function(fieldName) {
            return this.wordify(fieldName.substring(0, 1).toUpperCase() + fieldName.substring(1));
        },
        wordify: function(text) {
            if (text.length == 1) return text;

            for (var i = 1; i < text.length; i++) {
                var c = text[i];
                if (c === c.toUpperCase()) {
                    text = text.substring(0, i) + " " + text.substring(i);
                    i++;
                }
            }
            return text;
        },
        getIsValid: function () {
            return ko.utils.arrayFirst(this.fields, function (field) {
                return field.hasError && field.hasError() === true;
            }) == null;
        }
    };

    return ctor;
});