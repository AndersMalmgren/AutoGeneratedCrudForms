define(["viewmodels/form/fields"], function (fields) {
    var ctor = function (options) {

        var dataStub = {
            text: "bar",
            date: "2013-11-07T11:25:00+01:00",
            number: 1,
            textEdit: "Can edit this",
            numberEdit: 10,
            bool: true,
            boolEdit: true
        };

        this.fields = new fields(dataStub, options);
        this.output = ko.observable();

        this.canSave = this.fields.isValid;
    };

    ctor.prototype = {
        save: function() {
            this.output(ko.toJSON(this.fields.serialize()));
        }
    };

    return ctor;
});