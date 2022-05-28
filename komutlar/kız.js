const Discord = require("discord.js");
const db = require("quick.db");
exports.run = async (client, message, args) => {
  if (!message.guild) {
    const ozelmesajuyari = new Discord.MessageEmbed()
      .setColor(0xff0000)
      .setTimestamp()
      .setAuthor(message.author.username, message.author.avatarURL)
      .addField("xd", "Özelden işlemiyorum canım");
    return message.channel.send(ozelmesajuyari);
  }
  if (
    !message.member.roles.cache.has("958106825583099904", "979873402867294248", "958802382358196344", "958106834235965550") &&
    !message.member.hasPermission("ADMINISTRATOR")
  )
    return message.channel.send(
      new Discord.MessageEmbed()
        .setDescription("Yetersiz yetki")
        .setColor("Black")
    );

  let kullanıcı = message.mentions.users.first();
  if (!kullanıcı)
    return message.channel.send(
      new Discord.MessageEmbed()
        .setDescription("Bir üye etiketlemelisin!")
        .setColor("Black")
    );
  let user = message.mentions.users.first();
  let rol = message.mentions.roles.first();
  let member = message.guild.member(kullanıcı);
  let isim = args[1];
  if (!isim) return message.channel.send("Lütfen bir isim girin!");
  //.then((m) => m.delete(5000));
 
  await member.setNickname(` ${isim} `);
  member.roles.add("958106881090523187"); //kız rol id
  member.roles.add("958106883078643792"); //kayıtlı ID
  member.roles.remove("958106886530531409"); //kayıtsız rol id
  message.react("✅");

  const kanal = message.guild.channels.cache.find(
    (c) => c.id == "958106909917995128" // log kanal ıd
  ); //LOGİD
  const embed1 = new Discord.MessageEmbed()
    .addField(
      `Kayıt Log`,
      ` **Kayıt yapılan kişi:** ${member.user} 
      
        **Kayıt Yapan yetkili:** <@${message.author.id}>

        **Verilen Rol:** <@&958106881090523187>

      **Toplam:** ${member.guild.memberCount} kişi olduk`
    )
    .setDescription("**Bir kayıt yapıldı**")
    .setColor("RED")
    .setFooter(message.author.tag, message.author.avatarURL)
    .setTimestamp();
  let embed = new Discord.MessageEmbed()
    .setColor("GREEN")
    .addField(
      `1111`,
      `${member.user} adlı üyeye** <@&958106881090523187> **rolünü verip ismini**  \`${isim} \` **olarak ayarladım!`
    )
    .setFooter(message.author.tag, message.author.avatarURL)
    .setTimestamp();
  return message.channel.send(embed).then(kanal.send(embed1));
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["kız", "k"],
  kategori: "Kayıt",
  //permLevel: 0,
};
exports.help = {
  name: "kız",
  description: "kız kayıt yapar",
  usage: "kız <isim> <yaş>",
};
