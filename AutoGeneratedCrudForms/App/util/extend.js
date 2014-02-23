define(function() {
    return function(subClass, baseClass, subClassMethods) {

        function inheritance() {
        }

        inheritance.prototype = baseClass.prototype;
        subClass.prototype = new inheritance();
        subClass.prototype.constructor = subClass;
        subClass.baseConstructor = baseClass;
        subClass.superClass = baseClass.prototype;

        if (subClassMethods == null) return;

        for (var index in subClassMethods) {
            subClass.prototype[index] = subClassMethods[index];
        }
    };
});