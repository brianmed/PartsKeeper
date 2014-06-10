(function () {
    app.scan = kendo.observable({
        dataShow: function () {
					var inner = document.getElementById("middle");
            		// alert($('#middle').height() + " :: " + $('#btn-scan').height() + " :: " + $('#tabstrip-scan').height());
            		inner.style.marginTop = (($('#tabstrip-scan').height() / 2) - $('#middle').height())  + "px";
        },
        
        scan: function () {
   cordova.plugins.barcodeScanner.scan(
      function (result) {
            if (result.text) {
        	app.db.handle.transaction(function(tx) {
                                var d = new Date();
                
       	    function pad(n){return n<10 ? '-0'+n : '-n'}
		    	var str = d.getFullYear() + pad(d.getMonth()+1) + pad(d.getDate());
            
        		tx.executeSql("INSERT INTO barcode (code, format, prepared) VALUES (?, ?, ?)", [result.text, result.format, str], function () { return true; }, function (tx, err) { alert("tx error") });
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
