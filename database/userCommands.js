const sqlite3 = require('sqlite3').verbose();

module.exports = {
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
    }
}
