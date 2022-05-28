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
  
  if(!member) {
    const embed = new Discord.MessageEmbed()
    .setDescription(`Üye etiketle`)
    message.channel.send(embed)
  }

  let sebep = args.slice(1).join(' ') || `Sebep girilmemiş`
  
  db.set(`roles.${member.id}`, member.roles.cache.map(x => x.id))
  db.set(`isim.${member.id}`, member.displayName)
  db.push(`jailegiren.${member.id}`, {
    eklenen: member.id,
    sebebi: sebep
  })
  db.add(`jail.${message.author.id}`, 1)

  member.setNickname(`[Jail] ${member.displayName}`)
  member.roles.set(["958106848110723102"])
 const embed = new Discord.MessageEmbed()
 .setDescription(`**${member.displayName}** adlı kullanıcı <@${message.author.id}> Tarafından \`${sebep}\` sebebi ile jaile gönderildi`) 
 message.channel.send(embed)//discord botu?

}
  
exports.conf = {
  aliases: []
};
exports.help = {
  name: "jail"
} 