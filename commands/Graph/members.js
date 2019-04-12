const { Command } = require('klasa');
const { getEmbed } = require('../../util/embed.js');

module.exports = class extends Command {

	constructor(...args) {
		/**
		 * Any default options can be omitted completely.
		 * if all options are default, you can omit the constructor completely
		 */
		super(...args, {
			enabled: true,
			runIn: ['text', 'dm', 'group'],
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
			description: 'Shows the current member count and recent growth',
			extendedHelp: 'No extended help available.',
			usage: '',
			usageDelim: undefined,
			quotedStringSupport: false,
			subcommands: false
		});
	}

	async run(message, [...params]) {
		let counts = message.guild.settings.counts;
		let fields = [{
			"name": "Current members:",
			"value": message.guild.memberCount.toString()
		}];
		if (counts.length > 0) {
			fields.push({
				"name": "Growth Today:",
				"value": `${message.guild.memberCount - counts[counts.length - 1].count}`
			})
		}
		let embed = getEmbed('Members', `Current members for **${message.guild.name}**`,
			6996519, fields
		);
		message.channel.send({
			embed
		});
	}
};
