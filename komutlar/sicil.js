const Discord = require("discord.js");
const db = require("quick.db")

exports.run = async(client , message, args) => {

if (
    !message.member.roles.cache.has("958106825583099904", "979873402867294248", "958802382358196344", "958106834235965550") &&
    !message.member.hasPermission("ADMINISTRATOR")
  )
    return message.channel.send(
      new Discord.MessageEmbed()
        .setDescription("Yetersiz yetki")
        .setColor("Black")
    );
  
  
let member = message.mentions.members.first()
let veri = await db.get(`jailegiren.${member.id}`)

let mapped = veri.map((value, index) => `**Sıra ${index + 1} : Sıradakı <@${value.eklenen}> Sebebi: \`${value.sebebi}\`**`).join("\n")
  const embed = new Discord.MessageEmbed()
    .setDescription(`${mapped}`)
    .setColor("BLACK")
    message.channel.send(embed)  
}
exports.conf = {
  aliases: []
};
exports.help = {
  name: "sicil"
}