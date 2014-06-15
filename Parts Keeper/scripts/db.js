(function () {
    app.db = kendo.observable({
        init: function () {
        	app.db.handle = window.sqlitePlugin.openDatabase("PartsKeeper");
        },
        
        createTables: function() {
		    app.db.handle.transaction(function(tx) {
        		tx.executeSql(
                	"CREATE TABLE IF NOT EXISTS barcode (" +
                		"id INTEGER PRIMARY KEY ASC, " +
                		"code TEXT, " +
                		"format TEXT, " +
                		"prepared TEXT, " +
                		"invoiced TEXT, " +
                		"invoice_nbr TEXT, " +
                		"quantity INTEGER, " +
                		"reason TEXT, " +
                		"net_price TEXT" +
                ")");
    		});
		}        
    });
    
    document.addEventListener('deviceready', function () {
        app.db.init();
        app.db.createTables();
        
        function defaults() {

    	app.db.handle.transaction(function(tx) {            
                var d = new Date();
        	    function pad(n){return n<10 ? '-0'+n : '-'+n}
		    	var str = d.getFullYear() + pad(d.getMonth()+1) + pad(d.getDate());
            	d.setDate(d.getDate() - 1);
                var strOld = d.getFullYear() + pad(d.getMonth()+1) + pad(d.getDate());
            	d.setDate(d.getDate() + 2);
            	var strNew = d.getFullYear() + pad(d.getMonth()+1) + pad(d.getDate());

        		tx.executeSql("INSERT INTO barcode (code, format, prepared, invoiced) VALUES (?, ?, ?, ?)", ['012334567', 'C', str, str], function () { return true; }, function (tx, err) { alert("tx error: " + err.message) });
        		tx.executeSql("INSERT INTO barcode (code, format, prepared, invoiced) VALUES (?, ?, ?, ?)", ['012334568', 'C', str, str], function () { return true; }, function (tx, err) { alert("tx error") });
        		tx.executeSql("INSERT INTO barcode (code, format, prepared, invoiced) VALUES (?, ?, ?, ?)", ['012334569', 'C', str, str], function () { return true; }, function (tx, err) { alert("tx error") });
        		tx.executeSql("INSERT INTO barcode (code, format, prepared, invoiced) VALUES (?, ?, ?, ?)", ['012334560', 'C', strOld, strOld], function () { return true; }, function (tx, err) { alert("tx error") });
        		tx.executeSql("INSERT INTO barcode (code, format, prepared, invoiced) VALUES (?, ?, ?, ?)", ['012334561', 'C', strOld, strOld], function () { return true; }, function (tx, err) { alert("tx error") });
        		tx.executeSql("INSERT INTO barcode (code, format, prepared, invoiced) VALUES (?, ?, ?, ?)", ['012334562', 'C', strNew, strNew], function () { return true; }, function (tx, err) { alert("tx error") });
        		tx.executeSql("INSERT INTO barcode (code, format, prepared, invoiced) VALUES (?, ?, ?, ?)", ['012334563', 'C', strNew, strNew], function () { return true; }, function (tx, err) { alert("tx error") });
		});            
        }
        
        app.db.handle.transaction(function(tx) {
         tx.executeSql("SELECT * FROM barcode ORDER BY id DESC", [],
                function(tx, result) {
                	if (0 === result.rows.length) {
                        return;
                    	defaults();
                    }
                }, function (tx, err) { alert("tx error") });             
        });             
        
    }, false);
})();