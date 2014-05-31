(function () {       
    app.barcode = kendo.observable({
     
        details: function (e) {
            var codeid = $(e.touch.currentTarget).children(":first").data("codeid");
            kendo.mobile.application.navigate("#edit-detailview?codeid=" + codeid + "&code=" + $(e.touch.currentTarget).text());
        },
        
		dataSource: new kendo.data.DataSource({
		  data: []
	    }),
        
     dataInit: function () {
            $("#theList").kendoMobileListView({ dataSource: app.barcode.dataSource, template: $("#barcodeTemplate").html() })
            .kendoTouch({
            filter: ">li",
            enableSwipe: false,
            tap: app.barcode.details
        });
     	  
     },
        
     detailShow: function (e) {
     	var codeid = e.view.params.codeid;
         var code = e.view.params.code;
         
         $('#the-barcode').val(code);
         $('#edit-note').data("codeid", codeid);
     },
        
     dataShow: function () {      
         
         //var data = new Array();
         //console.log("dataBeforeShow");
         
         app.barcode.dataSource.data([]);
         
         app.db.handle.transaction(function(tx) {
         tx.executeSql("SELECT * FROM barcode ORDER BY id DESC", [],
                function(tx, result) {
                for (i = 0; i < result.rows.length; i++) {
                    console.log(i);
                    var code = result.rows.item(i)['code'];
                    var format = result.rows.item(i)['format'];
                    var id = result.rows.item(i)['id'];
                    
                    app.barcode.dataSource.add({id: id, code: code, format: format});                  
                    
                    // data.push({ code: code });
                    }                    
                    console.log(app.barcode.dataSource.data());
                    // $("#theList").destroy();
                    //  $("#theList").html("");

                    // $("#theList").data("kendoMobileListView").setDataSource(app.barcode.dataSource);
                             
        	//var template = kendo.template();
	        //var result = template(data); //Execute the template           
			//$("#theList").html(result);                                
                }, function (tx, err) { alert("tx error") });
             
        });         
        },                
    });
    
	// dataSource.sync();
})();