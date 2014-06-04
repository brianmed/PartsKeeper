(function () {
    app.scan = kendo.observable({
        dataShow: function () {            
					var container = document.getElementById("the");
					var inner = document.getElementById("middle");
					var inHeight = inner.offsetHeight;
					container.style.height=(window.innerHeight);
					container.style.width=window.innerWidth;
					var conHeight=container.offsetHeight;
					inner.style.marginTop = (conHeight-inHeight)/2+'px';   
        },
        
        scan: function () {
   cordova.plugins.barcodeScanner.scan(
      function (result) {
            if (result.text) {
        	app.db.handle.transaction(function(tx) {
        		tx.executeSql("INSERT INTO barcode (code, format, cancelled) VALUES (?, ?, ?)", [result.text, result.format, result.cancelled], function () { return true; }, function (tx, err) { alert("tx error") });
    		});
            }
      }, 
      function (error) {
          alert("Scanning failed: " + error);
      }
   );
        }
    });
})();
