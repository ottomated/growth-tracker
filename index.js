const { Client } = require('klasa');
const { config, token } = require('./config');

class GrowthTracker extends Client {

	constructor(...args) {
		super(...args);
	}
}
GrowthTracker.defaultGuildSchema
	.add('counts', 'any', { array: true })
	.add('channels', folder => folder
		.add('log', 'TextChannel')
		.add('milestone', 'TextChannel'))
	.add('milestone', 'integer', { default: 0 });

const bot = new GrowthTracker(config);


bot.login(token);