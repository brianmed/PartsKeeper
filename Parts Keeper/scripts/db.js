(function () {
    app.db = kendo.observable({
        init: function () {
        	app.db.handle = window.sqlitePlugin.openDatabase("PartsKeeper");
        },
        
        createTables: function() {
		    app.db.handle.transaction(function(tx) {
        		tx.executeSql("CREATE TABLE IF NOT EXISTS barcode (id INTEGER PRIMARY KEY ASC, code TEXT, format TEXT, cancelled INTEGER)");
                tx.executeSql("CREATE TABLE IF NOT EXISTS note (id INTEGER PRIMARY KEY ASC, note TEXT, barcode_id REFERENCES barcode (id))");
    		});
		}        
    });
    
    document.addEventListener('deviceready', function () {
        app.db.init();
        app.db.createTables();
    	app.db.handle.transaction(function(tx) {
        		tx.executeSql("INSERT INTO barcode (code, format, cancelled) VALUES (?, ?, ?)", ['012334567', 'C', '0'], function () { return true; }, function (tx, err) { alert("tx error") });
		});

    }, false);
})();