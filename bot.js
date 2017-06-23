//constants
const Discord = require("discord.js");
const prefix = "!"
const token = 'MzI2MTgwMDEyMzg4NTE1ODQx.DCjCaw.IYndOdgU18b9GgfdAtXJqDEpgm0';
const ytdl = require("ytdl-core");

function play(connection, message) {
	var server = servers[message.guild.id];
	server.dispatcher = connection.playStream(ytdl(server.queue[0], {filter: "audioonly"}));
	server.queue.shift();
	server.dispatcher.on("end", function() {
		if (server.queue[0]) play(connection, message);
		else connection.disconnect;
	});
}

var bot = new Discord.Client();
var cmds = [
	"!ping: displays 'pong'",
	"!help: lists all commands",
	"!help_cmd: lists a detailed description of a command",
	"!hi: say hi to doggo!",
	"!play: play music via link.",
	"!skip: skip current song being played to next in queue.",
	"!stop: stop playing music."
];
var servers = {};


bot.on("ready", function() {
  console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on("guildMemberAdd", function(member) {
	member.guild.channels.find("name", "general").send(member.toString() + " welcome to Neek's Server!");
	member.addRole(member.guild.roles.find("name", 'roleplayers'));
});

bot.on("message", function(message) {
  if (message.author.equals(bot.user)) return;
  if (!message.content.startsWith(prefix)) return;
  var args = message.content.substring(prefix.length).split(" ");
  switch(args[0].toLowerCase()) {
  	case "ping":
  		message.channel.send("pong");
  		break;
  	case "help":
  		message.channel.send("Current Commands: !help, !ping, !help_cmd, !hi, !play, !skip, !stop");
  		break;
  	case "help_cmd":
  		if (args[1] == "ping") {
  			message.channel.send(cmds[0]);
  		} else if (args[1] == "help") {
  			message.channel.send(cmds[1]);
  		} else if (args[1] == "help_cmd") {
  			message.channel.send(cmds[2]);
  		} else if (args[1] == "hi") {
  			message.channel.send(cmds[3]);
  		} else if (args[1] == "play") {
  			message.channel.send(cmds[4]);
  		} else if (args[1] == "skip") {
  			message.channel.send(cmds[5]);
  		} else if (args[1] == "stop") {
  			message.channel.send(cmds[6]);
  		} else if (args[1]) {
  			message.channel.send("Unknown command, please use !help.");
  		} else {
  		message.channel.send("Usage: help_cmd <command>");
  		}
  		break;
  	case "hi":
  		message.channel.send(" Hello " + message.author.toString() + ":heart:");
  		break;
  	case "play":
  		if (!args[1]) {
  			message.channel.send("Usage: !play <link>");
  			return;
  		}
  		if (!message.member.voiceChannel) {
  			message.channel.send("Must be in a voice channel to play.");
  			return;
  		}
  		if (!servers[message.guild.id]) servers[message.guild.id] = {
  			queue: []
  		};
  		var server = servers[message.guild.id];
  		server.queue.push(args[1]);
  		if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
  			play(connection, message);
  		});
  		break;
  	case "skip":
  		var server = servers[message.guild.id];
  		if (server.dispatcher) server.dispatcher.end();
  		break;
  	case "stop":
  		var server = servers[message.guild.id];
  		if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
  		break;
  	default:
  		message.channel.send("Unknown command, please use !help.");
  }
});


bot.login(token);