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
			description: 'Displays bot latency',
			extendedHelp: 'No extended help available.',
			usage: '',
			usageDelim: undefined,
			quotedStringSupport: false,
			subcommands: false
		});
	}

	async run(msg, [...params]) {
		let embed = getEmbed('Ping', '',
			9529293, [{
				"name": "`Ping...`",
				"value": `Wait a sec`
			}]
		);
		let msg2 = await msg.channel.send({ embed });

		embed = getEmbed('Ping', '',
			9529293, [{
				"name": "`Pong!`",
				"value": `Message Latency: **${(msg2.editedTimestamp || msg2.createdTimestamp) - (msg.editedTimestamp || msg.createdTimestamp)} ms**\nClient Latency: **${Math.round(this.client.ws.ping)} ms**`
			}]
		);
		msg2.edit({ embed });
	}

};
