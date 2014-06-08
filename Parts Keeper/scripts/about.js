(function () {
    app.aboutPage = kendo.observable({
        dataShow: function () {            
					var container = document.getElementById("aboutContainer");
					var inner = document.getElementById("information");
					var inHeight = inner.offsetHeight;
					container.style.height=(window.innerHeight);
					container.style.width=window.innerWidth;
					var conHeight=container.offsetHeight;
					inner.style.marginTop = (conHeight-inHeight)/2+'px';            
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
        }
    });
})();
