define(function () {
    return {
        isDate: function(value) {
            return typeof value === "string" && value.length === 25 && value.substr(10, 1) === "T" && !isNaN(Date.parse(value));
        }
    };
});

