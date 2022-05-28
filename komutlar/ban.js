exports.run = async(client, message, args) => {

 

  var guild = message.guild;
  var banlayan = message.author.tag;
  let banxx = await message.guild.fetchBans();
  if (!message.guild.me.permissions.has("BAN_MEMBERS")) return message.reply('Yetkim yok.');
  if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply("Yetersiz Yetki.");
 
  var kisi = message.mentions.users.first() || client.users.resolve(args[0]) || client.users.cache.find(u => u.username === args[0]) || client.users.cache.get(args[0]);
  if(!kisi) return message.reply("Kişiyi belirt `ID / @kullanici`")
 var sebeb = args.slice(1).join(" ");


    if(message.author == kisi) return message.reply("Kendini banlayamazsın.")
    if (banxx.get(kisi.id)) return message.reply("Bu zaten banlı.")

 var now = new Date()
 if (!sebeb) {
         try {
          kisi.send(`${kisi} **${guild}** adlı sunucudan banlandınız.`)
          message.channel.send(`**${kisi} banlandı.**`)
          guild.members.ban(kisi, { reason: sebeb/*, days: gun*/});
        } catch (error) {
          message.reply("Hata.")
          console.log(error)
        }
 } else {
 try {
   kisi.send(`${kisi} **${guild}** adlı sunucudan banlandınız. \nNedeni: **${sebeb}**`)
   message.channel.send(`**${kisi} banlandı. \nNedeni: ${sebeb}**`)
   guild.members.ban(kisi, { reason: sebeb/*, days: gun*/});
 } catch (error) {
   message.reply("Hata.")
   console.log(error)
 }

 }
};


exports.conf = {
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'ban',
  description: 'Botun Pingini Gösterir !',
  usage: 'ban'
};