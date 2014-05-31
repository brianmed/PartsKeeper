(function () {       
    app.barcode = kendo.observable({
     
		dataSource: new kendo.data.DataSource({
		  data: []
	    }),
        
     dataBeforeShow: function () {      
         
         //var data = new Array();
         console.log("dataBeforeShow");
         
         app.barcode.dataSource = new kendo.data.DataSource({
		  data: []
	    });
         
         app.db.handle.transaction(function(tx) {
         tx.executeSql("SELECT * FROM barcode ORDER BY id DESC", [],
                function(tx, result) {
                for (i = 0; i < result.rows.length; i++) {
                    console.log(i);
                    var code = result.rows.item(i)['code'];
                    var format = result.rows.item(i)['format'];
                    
                    app.barcode.dataSource.add({code: code, format: format});                  
                    
                    // data.push({ code: code });
                    }                    
                    console.log(app.barcode.dataSource.data());
                    $("#theList").kendoMobileListView({ dataSource: app.barcode.dataSource, template: $("#barcodeTemplate").html() });
                    $("#theList").data("kendoMobileListView").setDataSource(app.barcode.dataSource);
                             
        	//var template = kendo.template();
	        //var result = template(data); //Execute the template           
			//$("#theList").html(result);                                
                }, function (tx, err) { alert("tx error") });
             
        });         
        },                
    });
    
	// dataSource.sync();
})();