const { Command } = require('klasa');
const fs = require('fs');

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
			permissionLevel: 10,
			description: '',
			extendedHelp: 'No extended help available.',
			usage: '',
			usageDelim: undefined,
			quotedStringSupport: false,
			subcommands: false
		});
	}

	async run(message, [...params]) {
		this.client.guilds.forEach((guild, id) => {
			let path = __dirname + '/../../bwd/provider/json/guilds/' + id + '.json';
			console.log(path)
			if (fs.existsSync(path)) {
				let oldConfig = JSON.parse(fs.readFileSync(path, 'utf8'));
				if (oldConfig.prefix)
					guild.settings.update('prefix', oldConfig.prefix);
				if (oldConfig.logChannel)
					guild.settings.update('channels.log', oldConfig.logChannel);
				if (oldConfig.milestone)
					guild.settings.update('milestone', oldConfig.milestone);
				if (oldConfig.milestoneChannel)
					guild.settings.update('channels.milestone', oldConfig.milestoneChannel);
				if (oldConfig.counts)
					guild.settings.update('counts', oldConfig.counts);
			}
		});
	}

	async init() {
	}

};
