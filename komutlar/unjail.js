const Discord = require("discord.js");
const db = require("quick.db")

exports.run = async(client , message , args) => {

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
if(!member) return message.channel.send(new Discord.MessageEmbed().setDescription(`Bir üye etiketle`))
let kanal = "979869234828030013"
let rol = await db.get(`roles.${member.id}`);
let nick = await db.get(`isim.${member.id}`)
member.roles.set(rol).catch(e => { });
member.setNickname(nick)

const embed = new Discord.MessageEmbed()
.setDescription(`${member.displayName} adlı kullanıcı <@${message.author.id} tarafından jailden çıkarıldı.`)
message.channel.send(embed)
  
  kanal.send(new Discord.MessageEmbed().setDescription(`${member.displayName} adlı kullanıcı <@${message.author.id} tarafından jailden çıkarıldı.`))
db.delete(`eskirolleri.${member.id}`);
db.delete(`isim.${member.id}`);
  }
exports.conf = {
  aliases: []
};
exports.help = { 
  name: 'unjail'
};