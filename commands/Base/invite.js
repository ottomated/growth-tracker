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
			description: 'Lets you invite Growth Tracker to your own server',
			extendedHelp: 'No extended help available.',
			usage: '',
			usageDelim: undefined,
			quotedStringSupport: false,
			subcommands: false
		});
	}

	async run(message, [...params]) {
		let embed = getEmbed('Invite',
			'[Invite me to your server!](https://discordapp.com/oauth2/authorize?client_id=398265206658170880&permissions=52288&scope=bot)',
			9529293, []);
		message.channel.send({ embed });
	}

};
