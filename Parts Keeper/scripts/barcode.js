(function () {       
    app.barcode = kendo.observable({
     
        details: function (e) {
            var codeid = $(e.touch.currentTarget).parent().children(":first").data("codeid");            
            kendo.mobile.application.navigate("#edit-detailview?codeid=" + codeid);
        },
        
		dataSource: new kendo.data.DataSource({
		  data: [],
          group: { field: "date" }
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

         var code;
         app.db.handle.transaction(function(tx) {
         tx.executeSql("SELECT code, date FROM barcode where id = ?", [codeid],
                function(tx, result) {                    
                    code = result.rows.item(0)['code'];
                    date = result.rows.item(0)['date'];
                   
                    $('#the-barcode').val(code);
                    $('#the-date').val(date);
                }, function (tx, err) { alert("tx error") });             
         });

         // $("#the-date").kendoDatePicker();
         
         $('#edit-note').val("");
         $('#edit-note').data("codeid", "");
         $('#edit-note').data("noteid", "");         
                  
         $('#edit-note').data("codeid", codeid);
         
         app.db.handle.transaction(function(tx) {
         tx.executeSql("SELECT * FROM note where barcode_id = ?", [codeid],
                function(tx, result) {
                    
                    var note = result.rows.item(0)['note'];
                    var id = result.rows.item(0)['id'];
                    $('#edit-note').val(note);
                    $('#edit-note').data("noteid", id);
                    
                }, function (tx, err) { alert("tx error") });             
        });                  
     },
        
     save: function () {
     	   app.db.handle.transaction(function(tx) {
                var codeid = $('#edit-note').data("codeid");
                var id = $('#edit-note').data("noteid");               
                
    			tx.executeSql("UPDATE barcode SET date = ? WHERE id = ?", [$('#the-date').val(), codeid], function () { return true; }, function (tx, err) { alert("update error") });
                
                if (id) {
        			tx.executeSql("UPDATE note SET note = ? WHERE id = ?", [$('#edit-note').val(), id], function () { return true; }, function (tx, err) { alert("update error") });                    
                }
                else {                                   
        			tx.executeSql("INSERT INTO note (note, barcode_id) VALUES (?, ?)", [$('#edit-note').val(), $('#edit-note').data("codeid")], function () { return true; }, function (tx, err) { alert("insert error") });
                }
    		});
         
         kendo.mobile.application.navigate("#:back");
     },
       
     "delete": function () {
     	   app.db.handle.transaction(function(tx) {
                var codeid = $('#edit-note').data("codeid");
                var noteid = $('#edit-note').data("noteid");
                if (codeid) {
        			tx.executeSql("DELETE FROM barcode WHERE id = ?", [codeid], function () { return true; }, function (tx, err) { alert("delete barcode error") });                    
                }
                if (noteid) {
        			tx.executeSql("DELETE FROM note WHERE id = ?", [noteid], function () { return true; }, function (tx, err) { alert("delete note error") });                    
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
doc.text(20, 20, 'Hello world!');
doc.text(20, 30, 'This is client-side Javascript, pumping out a PDF.');
doc.addPage();
doc.text(20, 20, 'Do you like that?');
         
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
                for (i = 0; i < result.rows.length; i++) {
                    var code = result.rows.item(i)['code'];
                    var format = result.rows.item(i)['format'];
                    var id = result.rows.item(i)['id'];
                    var date = result.rows.item(i)['date'];
                    if (!dates[date]) {
                     	dates[date] = 0;   
                    }
                    dates[date]++;
                    app.barcode.dataSource.add({id: id, code: code, format: format, idx: dates[date], date: date});                  
                    
                    // data.push({ code: code });
                    }                    
                    // $("#theList").destroy();
                    //  $("#theList").html("");

                    // $("#theList").data("kendoMobileListView").setDataSource(app.barcode.dataSource);
                             
        	//var template = kendo.template();
	        //var result = template(data); //Execute the template           
			//$("#theList").html(result);                                
                }, function (tx, err) { alert("tx error") });
             
        });         
        }                
    });
    
	// dataSource.sync();
})();