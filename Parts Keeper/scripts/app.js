(function (global) {
    var app = global.app = global.app || {};  
    
    app.db = {};   

    document.addEventListener('deviceready', function () {
        navigator.splashscreen.hide();

        app.application = new kendo.mobile.Application(document.body, { initial: "#tabstrip-scan", layout: "tabstrip-layout", skin: "flat" });
    }, false);
})(window);