(function () {
    app.report = kendo.observable({

        dataSource: new kendo.data.DataSource({
		  data: []
	    }),
        
        details: function (e) {
            var prepared = $(e.touch.currentTarget).parent().children(":first").data("prepared");            
            kendo.mobile.application.navigate("#edit-prepared?prepared=" + prepared);
        },
                        
        dataShow: function () {               
         // alert("all.report.dataShow");
         app.report.dataSource.data([]);
         
         app.db.handle.transaction(function(tx) {
         tx.executeSql("SELECT DISTINCT prepared FROM barcode ORDER BY 1 DESC", [],
                function(tx, result) {
                    // alert(result.rows.length);
                    // console.log(result);
                for (var i = 0; i < result.rows.length; i++) {
                    // console.log(result);
                    var prepared = result.rows.item(i)['prepared'];
                    // alert(i + " :: " + prepared);	
                    app.report.dataSource.add({idx: i+1, prepared: prepared});                  
                    }                    
                }, function (tx, err) { alert("tx error: " + err.message); });             
        	});         
        },
        
     dataInit: function () {
         	// alert("app.report.dataInit");
            $("#datesPrepared").kendoMobileListView({ 
            dataSource: app.report.dataSource, 
            template: $("#reportTemplate").html()
            }).kendoTouch({
            filter: ".touch",
            enableSwipe: false,
            tap: app.report.details
        });     	  
     }        
    });
})();     