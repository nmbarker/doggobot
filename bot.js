//constants
const Discord = require("discord.js");
const prefix = "foo "
const token = 'MzI2MTgwMDEyMzg4NTE1ODQx.DCjCaw.IYndOdgU18b9GgfdAtXJqDEpgm0';

var bot = new Discord.Client();

bot.on("ready", function() {
  console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on("message", function(message) {
  if (message.author.equals(bot.user)) return;
  if (message.content == prefix + "ping") {
    message.channel.send("pong");
  }
});


bot.login(token);
