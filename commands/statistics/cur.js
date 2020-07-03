const sqlite3 = require('sqlite3').verbose();

module.exports = {
    name: 'cur',
    description: 'Ver cantidad de tacos!',
    execute(msg, args) {
        let db = new sqlite3.Database('./rakuenMain.db');

        let sql = ` SELECT t_tacos
                       FROM users_cur
                     WHERE user_id  = ?`;

        let userId = msg.author.id;

        db.get(sql, [userId], (err, row) => {
            if (err) {
                return console.error(err.message);
            } else {
                let tacoCount = row ? row.t_tacos : 0;
                if (tacoCount == 0)
                    msg.channel.send(`¡<@${msg.author.id}> no tienes Tacos :taco:!`);
                else if (tacoCount == 1)
                    msg.channel.send(`¡<@${msg.author.id}> tienes \`1\` Taco :taco: únicamente!`);
                else
                    msg.channel.send(`<@${msg.author.id}> tienes \`${tacoCount}\` Tacos :taco:!`);
            }
        });

        db.close();
    },
};