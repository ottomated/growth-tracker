const { Command } = require('klasa');

const {
	getEmbed,
	getErrorEmbed
} = require('../../util/embed.js');

const {
	filterOutliers,
	arrMean,
	formatDate
} = require('../../util/util.js');

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
			description: 'Predicts when your server will reach a number of members',
			extendedHelp: 'No extended help available.',
			usage: '<count:int>',
			usageDelim: undefined,
			quotedStringSupport: false,
			subcommands: false
		});
	}

	async run(message, [count]) {

		if (count < 1 || count > 1000000) {
			let embed = getErrorEmbed('Prediction Failed',
				'Count must be between 1 and 1,000,000.'
			);
			return message.channel.send({ embed });
		}
		let counts = message.guild.settings.counts.map(c => c.count);

		// Nice bit of mapping here:
		let changes = counts.map((count, index, array) => array[index + 1] - count)
			.slice(0, counts.length - 1);

		changes = filterOutliers(changes);

		if (changes.length < 3) {
			let embed = getErrorEmbed('Prediction Failed',
				'There isn\'t not enough data to make a prediction yet. There\'s no way for me to know how many members your server had in the past, so just keep me in your server for a few days.'
			);
			return message.channel.send({
				embed
			});
		}

		let avgGain = arrMean(changes);

		let to_go = count - message.guild.memberCount;
		if (to_go <= 0) {
			let embed = getErrorEmbed('Prediction Failed',
				`This server already has ${count} member${count === 1 ? '' : 's'}`
			);
			return message.channel.send({
				embed
			});
		}

		let days_to_go = Math.floor(to_go / avgGain);

		let goalDate = new Date();
		goalDate.setDate(goalDate.getDate() + days_to_go);


		let embed = getEmbed('Predict', `Prediction for **${message.guild.name}**`,
			6996519, [{
				"name": `Predicted date of ${count} members:`,
				"value": `${formatDate(goalDate)} (${days_to_go} days from now)`
			}, {
				"name": "Average gain:",
				"value": `${Math.floor(avgGain)} per day`
			}]
		);
		message.channel.send({
			embed
		});
	}

	async init() {
		/*
				 * You can optionally define this method which will be run when the bot starts
				 * (after login, so discord data is available via this.client)
				 */
	}

};
