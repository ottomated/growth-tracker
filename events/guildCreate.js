const { Event } = require('klasa');
const { getEmbed } = require('../util/embed.js');

module.exports = class extends Event {

	constructor(...args) {
		/**
		 * Any default options can be omitted completely.
		 * if all options are default, you can omit the constructor completely
		 */
		super(...args, {
			enabled: true,
			once: false
		});
	}

	async run(guild) {

		let prefix = '^';
		let embed = getEmbed('Help',
			"Thank you for inviting Growth Tracker to your server! I can help you view how your server grows over time.\n[Invite me to another server](https://discordapp.com/api/oauth2/authorize?client_id=398265206658170880&permissions=52288&scope=bot) | [Vote for me on DBL](https://discordbots.org/bot/398265206658170880/vote)",
			9529293, [{
				"name": "Prefix",
				"value": `**${guild.name}:** \`${prefix}\``
			}, {
				"name": `\`${prefix}help\``,
				"value": "Learn about more commands"
			}, {
				"name": `\`${prefix}config\``,
				"value": "Set config for your server"
			}]);
		guild.owner.send({ embed }).catch((err) => {
			this.client.console.error(`Owner join message: ${err}`);
		})
		guild.settings.update('counts', {
			'count': guild.memberCount,
			'date': new Date()
		});
	}

};
