const { Task } = require('klasa');

const {
	getEmbed
} = require('../../util/embed.js');

module.exports = class extends Task {

	constructor(...args) {
		/**
		 * Any default options can be omitted completely.
		 * if all options are default, you can omit the constructor completely
		 */
		super(...args, { enabled: true });
	}

	async run() {
		let errors = [];
		this.client.console.log('Updating member counts');
		this.client.guilds.forEach((server, i) => {
			server.settings.update('counts', {
				'count': server.memberCount,
				'date': new Date()
			});

			if (server.settings.channels.log) {

				let embed = getEmbed('', '', 6802791, [{
					"name": 'Member Log',
					"value": `${server.memberCount}`
				}]);
				try {
					server.channels.get(server.settings.channels.log).send({ embed });
				} catch (ex) {
					errors.push(ex.message);
				}
			}
		});
		this.client.console.log(`${errors.length} errors`);
	}

	async init() {
		if (this.client.schedule.tasks.length === 0) {
			this.client.schedule.create('updateCounts', '@daily', { catchUp: true });
		}
	}
};
