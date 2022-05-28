const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");
exports.run = (client, message, args) => {
  if (!message.guild) {
    const ozelmesajuyari = new Discord.MessageEmbed()
      .setColor(0xff0000)
      .setTimestamp()
      .setAuthor(message.author.username, message.author.avatarURL)
      .addField("xd", "Özelden işlemiyorum canım");
    return message.channel.send(ozelmesajuyari);
  }
  if (!message.member.permissions.has("ADMINISTRATOR"))
    return message.channel.send("Yetersiz yetki");

  if (!db.fetch(`learkanal_${message.guild.id}`))
    return message.channel.send("Sanırım bu özellik zaten kapalıymış");

  message.reply("Bu özellik **başarıyla kapatıldı.**");
  db.delete(`learkanal_${message.guild.id}`);
  db.delete(`learrol_${message.guild.id}`);
  db.delete(`learmesaj_${message.guild.id}`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["otorolkapat"],
  kategori: "Kayıt",
  //permLevel: 0,
};
exports.help = {
  name: "otorolkapat",
  description: "otorol kapatır",
  usage: "otorolkapat",
};
