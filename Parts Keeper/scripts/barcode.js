(function () {       
    app.barcode = kendo.observable({
        
     dataBeforeShow: function () {      
         
         var data = new Array();
         console.log("dataBeforeShow");
         
         app.db.handle.transaction(function(tx) {
         tx.executeSql("SELECT * FROM barcode ORDER BY id DESC", [],
                function(tx, result) {
                for (i = 0; i < result.rows.length; i++) {
                    console.log(i);
                    var code = result.rows.item(i)['code'];
                 
                    data.push({ code: code });
                    }
                    
                             
        	var template = kendo.template($("#theListTemplate").html());
	        var result = template(data); //Execute the template           
			$("#theList").html(result);            

                    
                }, null);
             
        });         
        },                
    });
    
	// dataSource.sync();
})();