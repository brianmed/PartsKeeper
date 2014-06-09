(function () {       
    app.barcode = kendo.observable({
     
        details: function (e) {
            var codeid = $(e.touch.currentTarget).parent().children(":first").data("codeid");            
            kendo.mobile.application.navigate("#edit-detailview?codeid=" + codeid);
        },
        
		dataSource: new kendo.data.DataSource({
		  data: [],
          group: { field: "prepared" }
	    }),
        
     dataInit: function () {
            $("#theList").kendoMobileListView({ 
            dataSource: app.barcode.dataSource, 
            template: $("#barcodeTemplate").html()
            }).kendoTouch({
            filter: ".touch",
            enableSwipe: false,
            tap: app.barcode.details
        });     	  
     },
        
     detailShow: function (e) {
         var codeid = e.view.params.codeid;
                                     
         $('#the-barcode').data("codeid", codeid);

         var code;
         app.db.handle.transaction(function(tx) {
         tx.executeSql("SELECT * FROM barcode where id = ?", [codeid],
                function(tx, result) {                    
                    code = result.rows.item(0)['code'];
                    prepared = result.rows.item(0)['prepared'];
                    invoiced = result.rows.item(0)['invoiced'];
                    invoice_nbr = result.rows.item(0)['invoice_nbr'];
					quantity = result.rows.item(0)['quantity'];
                    reason = result.rows.item(0)['reason'];
                    net_price = result.rows.item(0)['net_price'];
                    
                    $('#the-barcode').val(code);
                    $('#date-prepared').val(prepared);
                    $('#date-invoiced').val(invoiced);
                    $('#invoice-nbr').val(invoice_nbr);
                    $('#quantity').val(quantity);
                    $('#reason').val(reason);
                    $('#net-price').val(net_price);
                    
                }, function (tx, err) { alert("tx error: " + err.message) });             
         });
     },
        
     save: function () {
     	   app.db.handle.transaction(function(tx) {
                var codeid = $('#the-barcode').data("codeid");
                
    			tx.executeSql("UPDATE barcode SET prepared = ?, invoiced = ?, invoice_nbr = ?, quantity = ?, reason = ?, net_price = ? WHERE id = ?",                 
                	[
                		$('#date-prepared').val(), $('#date-invoiced').val(), $('#invoice-nbr').val(), 
                		$('#quantity').val(), $('#reason').val(), $('#net-price').val(),
                		codeid
                	], 
                	function () { return true; }, function (tx, err) { alert("update error: " + err.message)
                });
    		});
         
         kendo.mobile.application.navigate("#:back");
     },
       
     "delete": function () {
     	   app.db.handle.transaction(function(tx) {
                var codeid = $('#the-barcode').data("codeid");
                if (codeid) {
        			tx.executeSql("DELETE FROM barcode WHERE id = ?", [codeid], function () { return true; }, function (tx, err) { alert("delete barcode error") });                    
                }                
    		});         
         
            kendo.mobile.application.navigate("#:back");
     },
     pdfClose: function () {
         $("#modalview-pdf").kendoMobileModalView("close");                    
     },
                
     touchstart: function () {
	 	$("#tap-delete").animate({
    		opacity:'0.1',
    	 });
	 	$("#tap-delete").animate({
    		opacity:'1',
    	 });         

     },
     
     pdf: function() {
     var doc = new jsPDF();
     
     doc.rec(1, 1, 20, 20);
         
//doc.text(20, 20, 'Hello world!');
//doc.text(20, 30, 'This is client-side Javascript, pumping out a PDF.');
//doc.addPage();
//doc.text(20, 20, 'Do you like that?');
         
	var src = doc.output('datauristring');     
         
// doc.output('dataurlnewwindow');
// doc.save('Test.pdf');    
         
     $("#modalview-pdf").kendoMobileModalView("open");
     $('#the-pdf').attr('data', src);         
     // $('#the-pdf').css("-webkit-transform", "scale(" + 1.63 + ")"); $('#the-pdf').css("zoom", "0.63")
     },
        
     dataShow: function () {      
         
         //var data = new Array();
         //console.log("dataBeforeShow");
         
         app.barcode.dataSource.data([]);
         
         app.db.handle.transaction(function(tx) {
         tx.executeSql("SELECT * FROM barcode ORDER BY id DESC", [],
                function(tx, result) {
                var dates = {};
                for (var i = 0; i < result.rows.length; i++) {
                    var code = result.rows.item(i)['code'];
                    var format = result.rows.item(i)['format'];
                    var id = result.rows.item(i)['id'];
                    var prepared = result.rows.item(i)['prepared'];
                    if (!dates[prepared]) {
                     	dates[prepared] = 0;   
                    }
                    dates[prepared]++;
                    app.barcode.dataSource.add({id: id, code: code, format: format, idx: dates[prepared], prepared: prepared});                  
                    
                    // data.push({ code: code });
                    }                    
                    // $("#theList").destroy();
                    //  $("#theList").html("");

                    // $("#theList").data("kendoMobileListView").setDataSource(app.barcode.dataSource);
                             
        	//var template = kendo.template();
	        //var result = template(data); //Execute the template           
			//$("#theList").html(result);                                
                }, function (tx, err) { alert("tx error: " + err.message) });
             
        });         
        }                
    });
    
	// dataSource.sync();
})();