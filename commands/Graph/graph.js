const { Command } = require('klasa');
const { MessageAttachment } = require('discord.js');

const drawGraph = require('../../util/graph');
const { getEmbed } = require('../../util/embed.js');

module.exports = class extends Command {

	constructor(...args) {
		/**
		 * Any default options can be omitted completely.
		 * if all options are default, you can omit the constructor completely
		 */
		super(...args, {
			enabled: true,
			runIn: ['text'],
			requiredPermissions: [],
			requiredSettings: [],
			aliases: [],
			autoAliases: true,
			bucket: 1,
			cooldown: 0,
			promptLimit: 0,
			promptTime: 30000,
			deletable: false,
			guarded: false,
			nsfw: false,
			permissionLevel: 0,
			description: 'Displays a graph of member growth',
			extendedHelp: 'No extended help available.',
			usage: '[days:int]',
			usageDelim: undefined,
			quotedStringSupport: false,
			subcommands: false
		});
	}

	async run(message, [days]) {
		let conf = message.guild.settings.counts;
		if (days)
			conf = conf.slice(-days);
		let counts = conf.map(c => c.count);
		let dates = conf.map(c => new Date(c.date));

		message.channel.startTyping();
		drawGraph(counts.concat(message.guild.memberCount), dates.concat(new Date()), 'Growth Over Time: ' + message.guild.name)
			.then((buffer) => {
				message.channel.stopTyping();
				let embed = getEmbed('Graph', '', 6996519, []);
				let attachment = new MessageAttachment(buffer, 'graph.png');
				embed.image = {
					url: 'attachment://graph.png'
				};
				message.channel.send({
					embed: embed,
					files: [
						attachment
					]
				});
			});
	}

};
