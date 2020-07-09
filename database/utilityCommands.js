const sqlite3 = require('sqlite3').verbose();

module.exports = {
    getMegumin: function (user_id, callback) {
        let db = new sqlite3.Database('./rakuenMain.db');
        var data = [];
        db.serialize(function() {
            db.each("SELECT * FROM megumin_combos WHERE user_id = " + user_id , function(err, row) {
                data.push(row);
            }, function () {
                db.close();
                callback(data[0]); 
            });
        });
    },
    insertMegumin: function (user_id, start_bet, combo) {
        let db = new sqlite3.Database('./rakuenMain.db');
        let data = [user_id, start_bet, combo];
        let sql = ` INSERT INTO megumin_combos(user_id, start_bet, combo)
                       VALUES(?, ?, ?)`;
        db.run(sql, data, function(err) {
            if (err) {
                return console.error(err.message);
            }
        });
        db.close();
    },
    updateMegumin: function (user_id, start_bet, combo) {
        let db = new sqlite3.Database('./rakuenMain.db');
        let data = [user_id, start_bet, combo];
        let sql = ` UPDATE megumin_combos
                       SET start_bet = ?, combo = ?
                     WHERE user_id = ?`;
        db.run(sql, data, function(err) {
            if (err) {
                return console.error(err.message);
            }
        });
        db.close();
    },
    deleteMegumin: function (user_id, callback) {
        let db = new sqlite3.Database('./rakuenMain.db');
        let data = [user_id];
        let sql = ` DELETE FROM megumin_combos
                     WHERE user_id = ?`;
        db.run(sql, data, function(err) {
            if (err) {
                return console.error(err.message);
            }
        });
        db.close();
        callback(true);
    }
}