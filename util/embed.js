const {
	ownerIcon,
	botIcon
} = require('./config.json')

module.exports = {
	getEmbed: function (title, description, color = 9529293, fields) {
		let embed = {
			"color": color,
			"footer": {
				"icon_url": ownerIcon,
				"text": "Bot created by @Ottomated#9999"
			},
			"author": {
				"name": `Growth Tracker${title.length > 0 ? ': ' : ''}${title}`,
				"icon_url": botIcon
			},
		};
		if (description && description !== '') {
			embed.description = description;
		}
		if (fields && fields.length > 0) {
			embed.fields = fields;
		}
		return embed;
	},
	getErrorEmbed: function (error, description) {
		let embed = {
			"color": 14703196,
			"footer": {
				"icon_url": ownerIcon,
				"text": "Bot created by @Ottomated#9999"
			},
			"title": error,
			"description": '<a:error:398684450973810689> ' + description,
			"author": {
				"name": `Growth Tracker: Error`,
				"icon_url": botIcon
			}
		};
		return embed;
	},
	checkPerms: function (channel, client) {
		return channel.permissionsFor(client.user).has("EMBED_LINKS");
	},
	checkGraphPerms: function (channel, client) {
		let perms = channel.permissionsFor(client.user);
		return perms.has("EMBED_LINKS") && perms.has("ATTACH_FILES");
	}
}