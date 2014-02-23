requirejs.config({
    paths: {
        'text': '../Scripts/text',
        'durandal': '../Scripts/durandal',
        'plugins': '../Scripts/durandal/plugins',
        'transitions': '../Scripts/durandal/transitions',
        "fields": "viewmodels/form/fields"
    }
});

define('jquery', function() { return jQuery; });
define('knockout', ko);

define(['durandal/system', 'durandal/app', 'durandal/viewLocator', "util/overrides", "util/extenders", "util/bindings"], function (system, app, viewLocator) {
    //system.debug(true);

    app.title = 'CRUD';

    app.configurePlugins({
        router: true,
        dialog: true,
        widget: true
    });
    
    ko.validation.init({
        insertMessages: false,
        decorateElement: true
    });

    app.start().then(function() {
        viewLocator.useConvention();
        app.setRoot('viewmodels/shell', 'entrance');
    });
});