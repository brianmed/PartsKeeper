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

     showPdf: function () {
     var doc = new jsPDF("portrait", "in", "letter");
     
     doc.rect(1, 1, 10, 10);
         
//doc.text(20, 20, 'Hello world!');
//doc.text(20, 30, 'This is client-side Javascript, pumping out a PDF.');
//doc.addPage();
//doc.text(20, 20, 'Do you like that?');
         
	var src = doc.output();     
         
// doc.output('dataurlnewwindow');
// doc.save('Test.pdf');    
       
     window.location.href = "mailto:ron@medleyautobody.com?subject=Prepared%20Hello&body=" + src;
     // window.open(src, '_blank');
         
     //$("#modalview-pdf").kendoMobileModalView("open");
     //$('#the-pdf').attr('data', src);         
     // $('#the-pdf').css("-webkit-transform", "scale(" + 1.63 + ")"); $('#the-pdf').css("zoom", "0.63")
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