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

  let kanal = message.mentions.channels.first();
  let rol = message.mentions.roles.first();
  if (!rol) return message.reply("Bir rol Etiketlemelisin.");
  if (!kanal) return message.reply("Bir kanal Etiketlemelisin.");

  message.reply(
    "Otorol aktif edildi\n '" +
      rol +
      " Olarak Güncelledim!\n Kayıt Kanalını " +
      kanal +
      "' olarak güncelledim."
  );

  db.set(`learkanal_${message.guild.id}`, kanal.id);
  db.set(`learrol_${message.guild.id}`, rol.id);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["otorol"],
  kategori: "Kayıt",
  //permLevel: 0,
};
exports.help = {
  name: "otorol",
  description: "otorol açar",
  usage: "otorol <rol> <kanal>",
};
