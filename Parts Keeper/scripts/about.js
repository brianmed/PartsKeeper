(function () {
    app.aboutPage = kendo.observable({
        dataShow: function () {            
					var inner = document.getElementById("information");
            		// alert($('#middle').height() + " :: " + $('#btn-scan').height() + " :: " + $('#tabstrip-scan').height());
            		inner.style.marginTop = (($('#tabstrip-about').height() / 2) - $('#information').height())  + "px";
        },
        
        switchToAbout: function () {
            app.application.navigate("#tabstrip-about");
            var tabstrip = $('#about-tabstrip').data("kendoMobileTabStrip");
			tabstrip.switchTo(3);
        },
        
        switchToSettings: function () {
            app.application.navigate("#tabstrip-settings");
            var tabstrip = $('#settings-tabstrip').data("kendoMobileTabStrip");
			tabstrip.switchTo(3);            
        },
        
        showSettings: function () {
            $('#the-email').val(window.localStorage.getItem("email"));
        },
        
        saveSettings: function () {
             window.localStorage.setItem("email", $('#the-email').val());
            app.application.navigate("#:back");
        }
    });
})();
