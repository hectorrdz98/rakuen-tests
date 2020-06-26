
const tacoUrl = 'https://media.discordapp.net/attachments/397031754063675402/601989148089253889/coin_discord.png'

module.exports = {
    name: 'verTaco',
    description: 'Ver un taco!',
    execute(msg, args) {
      msg.channel.send({embed: {
          color: 3447003,
          title: "¡Apareció un Taco! :taco:",
          description: "Usa `rt taco` para ganárselo a los demás",
          image: {url: tacoUrl}
        }
      })
    }
};
  