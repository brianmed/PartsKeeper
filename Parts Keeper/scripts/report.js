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

     emailPdf: function () {
     var doc = new jsPDF("portrait", "in", "letter");

          doc.setLineWidth(0.01);

     doc.setFont("times", "bold");
     doc.setFontSize(18);
     doc.text("MEDLEY & SONS", 1.1, 0.5);
     doc.text("Autobody, Inc.", 1.3, 0.75);
     
     doc.setFontSize(12);
     doc.setFont("times", "normal");
     doc.text("3203 Midland Boulevard", 1.2, 1.0);
     doc.text("Fort Smith, AR 72904", 1.35, 1.25);
     doc.text("Phone (479) 782-5276", 1.3, 1.5);
     
     doc.setFont("times", "bolditalic");
     doc.setFontSize(24);
     doc.text("Returned Parts Form", 4.5, 1.5);
     
     doc.setFont("times", "normal");
     doc.setFontSize(8);
     doc.text("THE FOLLOWING PARTS HAVE BEEN RETURNED FOR:", 4.5, 1.75);
     
     doc.rect(4.5, 1.9, 0.1, 0.1);
     doc.text("CREDIT", 4.68, 2.0);
     
     doc.rect(5.2, 1.9, 0.1, 0.1);
     doc.text("REFUND", 5.4, 2.0);
     
     doc.text("via", 4.5, 2.20);
     doc.rect(4.7, 2.20, 3, 0);
     
     doc.text("on (Date)", 4.5, 2.4);
     doc.rect(4.98, 2.4, 2.72, 0);
     
     doc.rect(4.5, 2.55, 0.1, 0.1);
     doc.text("PREPAID", 4.68, 2.65);
     
     doc.rect(5.25, 2.55, 0.1, 0.1);
     doc.text("COLLECT", 5.45, 2.65);
     
     doc.setFontSize(12);
     doc.text("Parts Returned To:", 1.0, 2.0);
     doc.rect(1.0, 2.2, 3.1, 0);
     doc.rect(1.0, 2.4, 3.1, 0)
     doc.rect(1.0, 2.65, 3.1, 0);
     
     doc.rect(0.8, 3, 6.9, 5);
     
     doc.rect(0.8, 3, 1, 5);
     doc.rect(1.8, 3, 1, 5);
     doc.rect(2.8, 3, 1.3, 5);
     doc.rect(4.1, 3, 0.8, 5.3);
     doc.rect(4.9, 3, 1.8, 5);
     doc.rect(6.7, 3, 1.0, 5.3);
     
     doc.rect(0.8, 3.3, 6.9, 4.7);
     
     doc.setFont("times", "normal");
     doc.setFontSize(8);
     doc.text("INVOICE DATE", 0.88, 3.2);
     doc.text("INVOICE NO", 1.95, 3.2);
     doc.text("PART NO", 3.2, 3.2);
     doc.text("QUANTITY", 4.2, 3.2);
     doc.text("REASON", 5.55, 3.2);
     doc.text("NET PRICE", 6.9, 3.2);
     
     doc.rect(0.8, 3.6, 6.9, 4.4);
     doc.rect(0.8, 3.9, 6.9, 4.1);
     doc.rect(0.8, 4.2, 6.9, 3.8);
     doc.rect(0.8, 4.5, 6.9, 3.5);
     doc.rect(0.8, 4.8, 6.9, 3.2);
     doc.rect(0.8, 5.1, 6.9, 2.9);
     doc.rect(0.8, 5.4, 6.9, 2.6);
     doc.rect(0.8, 5.7, 6.9, 2.3);
     doc.rect(0.8, 6.0, 6.9, 2.0);
     doc.rect(0.8, 6.3, 6.9, 1.7);
     doc.rect(0.8, 6.6, 6.9, 1.4);
     doc.rect(0.8, 6.9, 6.9, 1.1);
     doc.rect(0.8, 7.2, 6.9, 0.8);
     doc.rect(0.8, 7.5, 6.9, 0.5);
     doc.rect(0.8, 7.75, 6.9, 0.25);
     
     doc.setFont("times", "bold");
     doc.text("TOTAL", 3.6, 8.3);
     doc.text("TOTAL", 6.25, 8.3);
     
     doc.text("COMMENTS:", 1.0, 8.8);
     doc.rect(1.8, 8.8, 6, 0);
     doc.rect(1.0, 9.1, 6.8, 0);
     doc.rect(1.0, 9.4, 6.8, 0);
     doc.rect(1.0, 9.7, 6.8, 0);
     doc.rect(1.0, 10.0, 6.8, 0);
                       
	var src = doc.output();     
         
// doc.output('dataurlnewwindow');
// doc.save('Test.pdf');    
     
	window.plugin.email.open({
    	to:      ['pub-pdf@bmedley.org'],
	    subject: 'Prepared PDF',
    	body:    'Parts return',
        attachments: ["base64:parts_return.pdf//" + btoa(src)]
	});
             
    // window.location.href = "mailto:ron@medleyautobody.com?subject=Prepared%20Hello&body=" + src;
     // window.open(src, '_blank');
         
     //$("#modalview-pdf").kendoMobileModalView("open");
     //$('#the-pdf').attr('data', src);         
     // $('#the-pdf').css("-webkdit-transform", "scale(" + 1.63 + ")"); $('#the-pdf').css("zoom", "0.63")
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