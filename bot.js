//constants
const Discord = require("discord.js");
const client = new Discord.Client();
const prefix = "!"

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});


client.on('message', msg => {
  if (msg.content === prefix + 'ping') {
    msg.channel.send('Pong!');
  }
  if (msg.content === prefix + 'help') {
    msg.channel.send('Commands: !ping, !help, !rules, !bios, !hack, !format');
  }
  if (msg.content === prefix + 'bios') {
    msg.channel.send('To post a bio and only a bio, go to the oc-bios chat and follow the format. For the format style use the !format command.');
  }
  if (msg.content === prefix + 'format') {
    msg.channel.send('Bio Must Include:\
    Name, Nickname, Age, Height, Gender, Race, Appearence, Backstory/Info, RP Chat')
  }
});

client.login('MzI2MTgwMDEyMzg4NTE1ODQx.DCjCaw.IYndOdgU18b9GgfdAtXJqDEpgm0');
