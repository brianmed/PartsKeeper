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
                                var d = new Date();
                
       	    function pad(n){return n<10 ? '-0'+n : '-n'}
		    	var str = d.getFullYear() + pad(d.getMonth()+1) + pad(d.getDate());
            
        		tx.executeSql("INSERT INTO barcode (code, format, date) VALUES (?, ?, ?)", [result.text, result.format, str], function () { return true; }, function (tx, err) { alert("tx error") });
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
