const { Command } = require('klasa');
const { MessageAttachment } = require('discord.js');

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
			permissionLevel: 6,
			description: 'Exports your server\'s data',
			extendedHelp: 'No extended help available.',
			usage: '',
			usageDelim: undefined,
			quotedStringSupport: false,
			subcommands: false
		});
	}

	async run(message) {
		let conf = message.guild.settings.counts;
		let attachment = new MessageAttachment(JSON.stringify(conf, null, 2), 'data.json');
		let embed = getEmbed('Export', 'Attached is exported data for **' + conf.length + '** days.', 6996519, []);
		message.channel.send({
			embed: embed,
			files: [
				attachment
			]
		});

	}

};
