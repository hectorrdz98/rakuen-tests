const sqlite3 = require('sqlite3').verbose();

module.exports = {
    getUser: function (id, callback) {
        let db = new sqlite3.Database('./rakuenMain.db');
        var data = [];
        db.serialize(function() {
            db.each("SELECT * FROM users WHERE id = " + id , function(err, row) {
                data.push(row);
            }, function () {
                db.close();
                callback(data[0]); 
            });
        });
    },
    getAllUserInfo: function (id, callback) {
        let db = new sqlite3.Database('./rakuenMain.db');
        var data = [];
        db.serialize(function() {
            db.each(`
                SELECT u.name AS name, u.title AS title, u.description AS description, u.image AS image,
                    t.tacos AS tacos, t.t_tacos AS t_tacos
                    FROM users u
                 INNER JOIN users_cur t ON
                  u.id = t.user_id
                 WHERE u.id = 
            ` + id , function(err, row) {
                data.push(row);
            }, function () {
                db.close();
                callback(data[0]); 
            });
        });
    },
    insertUser: function (id, name, title, description, image) {
        let db = new sqlite3.Database('./rakuenMain.db');
        let data = [id, name, title, description, image];
        let sql = ` INSERT INTO users(id, name, title, description, image)
                       VALUES(?, ?, ?, ?, ?)`;
        db.run(sql, data, function(err) {
            if (err) {
                return console.error(err.message);
            }
        });
        db.close();
    },
    updateName: function (id, name) {
        let db = new sqlite3.Database('./rakuenMain.db');
        let data = [name, id];
        let sql = ` UPDATE users
                       SET name = ?
                     WHERE id = ?`;
        db.run(sql, data, function(err) {
            if (err) {
                return console.error(err.message);
            }
        });
        db.close();
    },
    updateDescription: function (id, description) {
        let db = new sqlite3.Database('./rakuenMain.db');
        let data = [description, id];
        let sql = ` UPDATE users
                       SET description = ?
                     WHERE id = ?`;
        db.run(sql, data, function(err) {
            if (err) {
                return console.error(err.message);
            }
        });
        db.close();
    },
    updateImage: function (id, image) {
        let db = new sqlite3.Database('./rakuenMain.db');
        let data = [image, id];
        let sql = ` UPDATE users
                       SET image = ?
                     WHERE id = ?`;
        db.run(sql, data, function(err) {
            if (err) {
                return console.error(err.message);
            }
        });
        db.close();
    },
}
