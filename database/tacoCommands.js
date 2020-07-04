const sqlite3 = require('sqlite3').verbose();

module.exports = {
    getDaily: function (user_id, callback) {
        let db = new sqlite3.Database('./rakuenMain.db');
        var data = [];
        db.serialize(function() {
            db.each("SELECT * FROM daily WHERE user_id = " + user_id , function(err, row) {
                data.push(row);
            }, function () {
                db.close();
                callback(data[0]); 
            });
        });
    },
    getCur: function (user_id, callback) {
        let db = new sqlite3.Database('./rakuenMain.db');
        var data = [];
        db.serialize(function() {
            db.each("SELECT * FROM users_cur WHERE user_id = " + user_id , function(err, row) {
                data.push(row);
            }, function () {
                db.close();
                callback(data[0]); 
            });
        });
    },
    getTopCur: function (callback) {
        let db = new sqlite3.Database('./rakuenMain.db');
        var data = [];
        db.serialize(function() {
            db.each(`
                SELECT u.name AS username, t.tacos AS tacos
                    FROM users_cur t
                 INNER JOIN users u ON
                  u.id = t.user_id
                ORDER BY t.tacos DESC
                 LIMIT 10
            `, function(err, row) {
                data.push(row);
            }, function () {
                db.close();
                callback(data); 
            });
        });
    },
    getTacoSpawn: function (guild, channel, callback) {
        let db = new sqlite3.Database('./rakuenMain.db');
        var data = [];
        db.serialize(function() {
            db.each("SELECT * FROM tacos_spawned WHERE guild = " + guild + " AND channel = " + channel , function(err, row) {
                data.push(row);
            }, function () {
                db.close();
                callback(data[0]); 
            });
        });
    },
    insertDaily: function (user_id, timestamp) {
        let db = new sqlite3.Database('./rakuenMain.db');
        let data = [user_id, timestamp];
        let sql = ` INSERT INTO daily(user_id, timestamp)
                       VALUES(?, ?)`;
        db.run(sql, data, function(err) {
            if (err) {
                return console.error(err.message);
            }
        });
        db.close();
    },
    insertCur: function (user_id, tacos, t_tacos) {
        let db = new sqlite3.Database('./rakuenMain.db');
        let data = [user_id, tacos, t_tacos];
        let sql = ` INSERT INTO users_cur(user_id, tacos, t_tacos)
                       VALUES(?, ?, ?)`;
        db.run(sql, data, function(err) {
            if (err) {
                return console.error(err.message);
            }
        });
        db.close();
    },
    insertTacoSpawn: function (guild, channel, message_id) {
        let db = new sqlite3.Database('./rakuenMain.db');
        let data = [guild, channel, message_id];
        let sql = ` INSERT INTO tacos_spawned(guild, channel, message_id)
                       VALUES(?, ?, ?)`;
        db.run(sql, data, function(err) {
            if (err) {
                return console.error(err.message);
            }
        });
        db.close();
    },
    updateDaily: function (user_id, timestamp) {
        let db = new sqlite3.Database('./rakuenMain.db');
        let data = [timestamp, user_id];
        let sql = ` UPDATE daily
                       SET timestamp = ?
                     WHERE user_id = ?`;
        db.run(sql, data, function(err) {
            if (err) {
                return console.error(err.message);
            }
        });
        db.close();
    },
    updateCur: function (user_id, tacos, t_tacos) {
        let db = new sqlite3.Database('./rakuenMain.db');
        let data = [tacos, t_tacos, user_id];
        let sql = ` UPDATE users_cur
                       SET tacos = ?, t_tacos = ?
                     WHERE user_id = ?`;
        db.run(sql, data, function(err) {
            if (err) {
                return console.error(err.message);
            }
        });
        db.close();
    },
    deleteTacoSpawn: function (guild, channel, callback) {
        let db = new sqlite3.Database('./rakuenMain.db');
        let data = [guild, channel];
        let sql = ` DELETE FROM tacos_spawned
                     WHERE guild = ? AND channel = ?`;
        db.run(sql, data, function(err) {
            if (err) {
                return console.error(err.message);
            }
        });
        db.close();
        callback(true);
    },
}
