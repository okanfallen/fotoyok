//----------------------------------------------------------------
// Selam, Ben Lear Mert işinize yarıyacağını düşündüğüm bu tarz projeleri paylaşıyorum.
//----------------------------------------------------------------

const Discord = require("discord.js");
const client = new Discord.Client({ disableMentions: "everyone" });
const ayarlar = require("./ayarlar.json");
require("discord-buttons")(client);
const fs = require("fs");
const moment = require("moment");
require("./util/eventLoader")(client);
const db = require("quick.db");
const { channel } = require("diagnostics_channel");
var prefix = ayarlar.prefix;

const log = (message) => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

// sesli sokma//
client.on("ready", () => {
  client.channels.cache.get("979802476788211752").join();
});

// sesli sokma//
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach((f) => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach((alias) => {
      client.aliases.set(alias, props.help.name);
    });
  });
});
client.reload = (command) => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach((alias) => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
client.load = (command) => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach((alias) => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
client.unload = (command) => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

// ROLVER






//-----------------------ROL KORUMA----------------------\\

client.on("roleDelete", async role => {
  let rolko = await db.fetch(`rolk_${role.guild.id}`);
  if (rolko) { 
         const entry = await role.guild.fetchAuditLogs({ type: "ROLE_DELETE" }).then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
  role.guild.roles.create({ data: {
          name: role.name,
          color: role.color,
          hoist: role.hoist,
          permissions: role.permissions,
          mentionable: role.mentionable,
          position: role.position
}, reason: 'Silinen Rol tekrar açıldı.'})
  }
})

//

client.on("roleCreate", async role => {
  let rolk = await db.fetch(`rolk_${role.guild.id}`);
  if (rolk) { 
       const entry = await role.guild.fetchAuditLogs({ type: "ROLE_CREATE" }).then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
  role.delete()
  }
})

//-----------------------GELEN-İSİM-YAŞ----------------------\\

client.on("guildMemberAdd", member => {  
  const kanal = member.guild.channels.cache.find(r => r.id === "958106909917995128"); //HOŞGELDİN MESAJI ATILACAĞI KANAL IDSINI GİRİN ÖRNEĞİN UNREGİSTER CHATİ
    
    let user = client.users.cache.get(member.id);
    require("moment-duration-format");
      const kurulus = new Date().getTime() - user.createdAt.getTime();  
  const gecen = moment.duration(kurulus).format(`YY **[Yıl,]** DD **[Gün,]** HH **[Saat,]** mm **[Dakika,]** ss **[Saniye]**`) 
   
    var kontrol;
  if (kurulus < 1296000000) kontrol = '⛔'
  if (kurulus > 1296000000) kontrol = '✅'
  moment.locale("tr");
  kanal.send(":tada: Sunucumuza Hoş Geldin ! <@" + member + "> \n\n Hesabın "+ gecen +" Önce Oluşturulmuş "+kontrol+" \nSeninle beraber **" + member.guild.memberCount + "** kişi olduk.")
  });
        

 
 
//-----------------------ROLLOG----------------------\\    

client.on("guildMemberRoleAdd", (member, role) => {
  var yıl = [moment().format('YYYY')]
  let aylartoplam = {
    "01": "Ocak",
    "02": "Şubat",
    "03": "Mart",
    "04": "Nisan",
    "05": "Mayıs",
    "06": "Haziran",
    "07": "Temmuz",
    "08": "Ağustos",
    "09": "Eylül",
    "10": "Ekim",
    "11": "Kasım",
    "12": "Aralık"};
let aylar = aylartoplam;
let gün = moment(Date.now()).format("DD")
let saat = moment(Date.now()).format("HH:mm:ss")
let wexlog = "979869234828030013"
  const chatembed = new Discord.MessageEmbed().setAuthor(member.user.tag, member.user.avatarURL({dynamic: true})).setTimestamp().setColor("BLUE").setDescription(`${member} üyesine **${role.name}** rolü eklendi.\n\n\`\`\`Rol: ${role.name} (${role.id})\nKullanıcı: ${member.user.tag}\nKullanıcı Id: ${member.id}\nRol Alınma: ${gün} ${aylar[moment(Date.now()).format("MM")]} ${yıl} ${saat}\`\`\``)
 client.channels.cache.get(wexlog).send(chatembed);
});

/////////////////////////////////////////////////////////////////////////////////

client.on("guildMemberRoleRemove", (member, role) => {
  var yıl = [moment().format('YYYY')]
  let aylartoplam = {
    "01": "Ocak",
    "02": "Şubat",
    "03": "Mart",
    "04": "Nisan",
    "05": "Mayıs",
    "06": "Haziran",
    "07": "Temmuz",
    "08": "Ağustos",
    "09": "Eylül",
    "10": "Ekim",
    "11": "Kasım",
    "12": "Aralık"};
let ayyyy = aylartoplam;
let moonlightday = moment(Date.now()).format("DD")
let wexinsaat = moment(Date.now()).format("HH:mm:ss")
let wexlog = "979869234828030013"
const chatembed = new Discord.MessageEmbed().setAuthor(member.user.tag, member.user.avatarURL({dynamic: true})).setTimestamp().setColor("BLUE").setDescription(`${member} üyesinden **${role.name}** rolü alındı.\n\n\`\`\`Rol: ${role.name} (${role.id})\nKullanıcı: ${member.user.tag}\nKullanıcı Id: ${member.id}\nRol Alınma: ${moonlightday} ${ayyyy[moment(Date.now()).format("MM")]} ${yıl} ${wexinsaat}\`\`\``)
client.channels.cache.get(wexlog).send(chatembed);
});


//-----------------------ŞÜPHELİ-HESAP----------------------\\     

// burası hesabın oluşturma ve katılma tarihini logladığınız kanala atar
client.on("guildMemberAdd", async (member, user, args, message) => {
  let hg = await db.fetch(`hg_${member.guild.id}`);
  var user = member.user;
  var tarih = "";
  var tarih2 = "";
  if (moment(user.createdAt).format("MM") === "01") {
    var tarih = `${moment(user.createdAt).format("DD")} Ocak ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "02") {
    var tarih = `${moment(user.createdAt).format("DD")} Şubat ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "03") {
    var tarih = `${moment(user.createdAt).format("DD")} Mart ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "04") {
    var tarih = `${moment(user.createdAt).format("DD")} Nisan ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "05") {
    var tarih = `${moment(user.createdAt).format("DD")} Mayıs ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "06") {
    var tarih = `${moment(user.createdAt).format("DD")} Haziran ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "07") {
    var tarih = `${moment(user.createdAt).format("DD")} Temmuz ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "08") {
    var tarih = `${moment(user.createdAt).format("DD")} Ağustos ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "09") {
    var tarih = `${moment(user.createdAt).format("DD")} Eylül ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "10") {
    var tarih = `${moment(user.createdAt).format("DD")} Ekim ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "11") {
    var tarih = `${moment(user.createdAt).format("DD")} Kasım ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "12") {
    var tarih = `${moment(user.createdAt).format("DD")} Aralık ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "01") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Ocak ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "02") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Şubat ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "03") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Mart ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "04") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Nisan ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "05") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Mayıs ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "06") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Haziran ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "07") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Temmuz ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "08") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Ağustos ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "09") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Eylül ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "10") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Ekim ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "11") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Kasım ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "12") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Aralık ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }

  if (!hg) return;

  const entry = await member.guild
    .fetchAuditLogs({ type: "MEMBER_ADD" })
    .then((audit) => audit.entries.first());

  let embed = new Discord.MessageEmbed()
    .setThumbnail(member.user.avatarURL())
    .addField(
      "Hoşgeldin:",
      `
      Sunucumuz'a HoşGeldin <@${member.user.id}>
      
      Sunucumuz'a katılmak için  \`Kayıt Odası\` odalarında yetkililerimize isim yaş belirtmelisin.

      Discord Kayıt Tarihi: " **${tarih}**
  `
    )

    .setColor("#1bc00a");
  client.channels.cache
    .get(hg)
    .send(`<@${member.user.id}>, <@&967893672572117002>`, embed);
});
//------------------OTOROL ---------------------------\\

client.on("guildMemberAdd", async (member) => {
  let kanal = db.fetch(`learkanal_${member.guild.id}`);
  let rol = db.fetch(`learrol_${member.guild.id}`);

  if (!kanal) return;
  member.roles.add(rol);
});

//-------------OTOROL SON------------------\\

client.on("guildMemberUpdate", async(oldMember, newMember) => {
    let güvenli = ["944712391344652289"]
    let entry = await newMember.guild.fetchAuditLogs({ type: 'MEMBER_UPDATE' }).then(audit => audit.entries.first());
    let data = await db.get(`isim.${entry.executor.id}`) || '0'
    let log = newMember.guild.channels.cache.get('979869234828030013')

    if (oldMember.displayName !== newMember.displayName) {
        if (güvenli.includes(entry.executor.id)) {
            return;
        } else {
            if (data >= 3) {
                db.delete(`isim.${entry.executor.id}`)
                newMember.guild.members.ban(entry.executor.id, { reason: "mühür xd" })
                if (log) log.send(new Discord.MessageEmbed().setColor('RANDOM').setAuthor(entry.executor.username, entry.executor.avatarURL({ dynamic: true })).setDescription(`${entry.executor} Adlı kullanıcı isim değiştirme limitine ulaştığı için banlandı.`))
            } else {
                if (log) log.send(new Discord.MessageEmbed().setColor('RANDOM').setAuthor(entry.executor.username, entry.executor.avatarURL({ dynamic: true })).setDescription(`${entry.executor} Adlı kullanıcı ${newMember} Adlı kullanıcının ismini değiştirdi.\n **${oldMember.displayName} => ${newMember.displayName}**`))
                
                db.add(`isim.${entry.executor.id}`, 1)
                
            }
        }

    } else return;
})
setInterval(async() => {
    await db.delete(`isim`)
    await db.delete("isim")
}, 1000 * 60 * 10)

//--------- Tag ------------//
client.on("guildMemberAdd", async (member) => {
  let tag = await db.fetch(`tag_${member.guild.id}`);
  let tagsekil;
  if (tag == null) tagsekil = member.setNickname(`${member.user.username}`);
  else tagsekil = member.setNickname(`${tag} ${member.user.username}`);
});
//------------- Tag Son ----------------//


client.on("guildMemberRemove", async (member, user) => {
  let hgbb = await db.fetch(`hgbb_${member.guild.id}`);
  var user = member.user;
  var tarih = "";
  var tarih2 = "";
  if (moment(user.createdAt).format("MM") === "01") {
    var tarih = `${moment(user.createdAt).format("DD")} Ocak ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "02") {
    var tarih = `${moment(user.createdAt).format("DD")} Şubat ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "03") {
    var tarih = `${moment(user.createdAt).format("DD")} Mart ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "04") {
    var tarih = `${moment(user.createdAt).format("DD")} Nisan ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "05") {
    var tarih = `${moment(user.createdAt).format("DD")} Mayıs ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "06") {
    var tarih = `${moment(user.createdAt).format("DD")} Haziran ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "07") {
    var tarih = `${moment(user.createdAt).format("DD")} Temmuz ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "08") {
    var tarih = `${moment(user.createdAt).format("DD")} Ağustos ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "09") {
    var tarih = `${moment(user.createdAt).format("DD")} Eylül ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "10") {
    var tarih = `${moment(user.createdAt).format("DD")} Ekim ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "11") {
    var tarih = `${moment(user.createdAt).format("DD")} Kasım ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.createdAt).format("MM") === "12") {
    var tarih = `${moment(user.createdAt).format("DD")} Aralık ${moment(
      user.createdAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "01") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Ocak ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "02") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Şubat ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "03") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Mart ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "04") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Nisan ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "05") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Mayıs ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "06") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Haziran ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "07") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Temmuz ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "08") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Ağustos ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "09") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Eylül ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "10") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Ekim ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "11") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Kasım ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }
  if (moment(user.joinedAt).format("MM") === "12") {
    var tarih2 = `${moment(user.joinedAt).format("DD")} Aralık ${moment(
      user.joinedAt
    ).format("YYYY HH:mm:ss")} `;
  }

  if (!hgbb) return;

  const entry = await member.guild
    .fetchAuditLogs({ type: "MEMBER_REMOVE" })
    .then((audit) => audit.entries.first());

  let embed = new Discord.MessageEmbed()

    .setAuthor(`Sunucudan Bir Kullanıcı Ayrıldı!`, member.user.avatarURL)
    .addField("Kullanıcı Tag", member.user.tag, true)
    .addField("ID", member.user.id, true)
    .addField("Discord Kayıt Tarihi", tarih, true)
    .addField("Sunucuya Katıldığı Tarih", tarih2, true)
    .setTimestamp()
    .setColor("RED")
    .setFooter(
      `Sunucu: ${member.guild.name} - ${member.guild.id}`,
      member.guild.iconURL
    )

    .setThumbnail(member.guild.iconURL);

  client.channels.cache.get(hgbb).send(embed);
});
client.on("ready", () => {
  // Oynuyor Kısmı

  var actvs = [`OkanAsya`];

  client.user.setActivity(
    actvs[Math.floor(Math.random() * (actvs.length - 1) + 1)],
    { type: "LISTENING" }
  );
  setInterval(() => {
    client.user.setActivity(
      actvs[Math.floor(Math.random() * (actvs.length - 1) + 1)],
      { type: "LISTENING" }
    );
  }, 150);

  console.log("_________________________________________");
  console.log(`Kullanıcı İsmi     : ${client.user.username}`);
  console.log(`Sunucular          : ${client.guilds.cache.size}`);
  console.log(`Kullanıcılar       : ${client.users.cache.size}`);
  console.log(`Prefix             : ${ayarlar.prefix}`);
  console.log(`Durum              : Bot Çevrimiçi!`);
  console.log("_________________________________________");
});

client.elevation = (message) => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

client.login(ayarlar.token);

