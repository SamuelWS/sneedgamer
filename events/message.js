const { Events } = require('discord.js');
const { gamingMessageId, employmentMessageId, watchMessageId, channelId, gamesList, employmentList, watchList } = require('../reactions.json');


module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		
		var ids = [gamingMessageId, employmentMessageId, watchMessageId];
		var outs = ["# Gaming Roles \n", "# Employment Roles \n", "# Groupwatch Roles \n"];
		var lists = [gamesList, employmentList, watchList];

		const channel = client.channels.cache.get(channelId);

		for (var i = 0; i < ids.length; i++) {
			var message;

			var out = outs[i];

			for (const [key, value] of Object.entries(lists[i])) {
				out += value.reactionId + ' ' +  key + '\n';
			}

			try {
				message = await channel.messages.fetch(ids[i]);
				message.edit(out);
				console.log(`Setting up reaction message.`);
			} catch (error) {
				// The message was not found or an error occurred
				console.error('Error fetching message:', error);
				channel.send(out);
			} 

			if (message.id === ids[i]) {
				for (const [key, value] of Object.entries(lists[i])) {
					message.react(value.reactionId);
				}
			}
		}
		
		
	}
}