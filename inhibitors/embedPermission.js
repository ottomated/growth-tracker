const { Inhibitor } = require('klasa');
const { checkPerms, checkGraphPerms } = require('../util/embed.js');
module.exports = class extends Inhibitor {

	constructor(...args) {
		/**
		 * Any default options can be omitted completely.
		 * if all options are default, you can omit the constructor completely
		 */
		super(...args, {
			enabled: true,
			spamProtection: false
		});
	}

	async run(msg, cmd) {
		if (msg.channel.type != 'text') return;
		let filesRequired = ['graph', 'ggraph'];
		if (filesRequired.includes(cmd.name) && !checkGraphPerms(msg.channel, this.client)) {
			return await msg.channel.send("<a:error:398684450973810689> I need the `Embed Links` and `Attach Files` permissions to work.");
		}
		let embedRequired = ['ping', 'stats', 'help', 'members', 'predict', 'invite', 'config'];
		if (embedRequired.includes(cmd.name) && !checkPerms(msg.channel, this.client)) {
			return msg.channel.send("<a:error:398684450973810689> I need the `Embed Links` permission to work.");
		}
	}

};
