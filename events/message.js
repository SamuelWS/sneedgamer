const { Events } = require('discord.js');
const { messageId, channelId, reactionsList } = require('../reactions.json');


module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);

		const channel = client.channels.cache.get(channelId);
		var out = "# Gaming Roles \n";

		for (const [key, value] of Object.entries(reactionsList)) {
			out += value.reactionId + ' ' +  key + '\n';
		}

		var message;

		try {
			message = await channel.messages.fetch(gamingMessageId);
			message.edit(out);
			console.log(`Setting up reaction message.`);
		} catch (error) {
			// The message was not found or an error occurred
			console.error('Error fetching message:', error);
			channel.send(out);
		} 


		if (message.id === gamingMessageId) {
            for (const [key, value] of Object.entries(reactionsList)) {
                message.react(value.reactionId);
            }
        }
	
		var out = "# Employment Roles \n";

		for (const [key, value] of Object.entries(reactionsList)) {
			out += value.reactionId + ' ' +  key + '\n';
		}

		var message;

		try {
			message = await channel.messages.fetch(employmentMessageId);
			message.edit(out);
			console.log(`Setting up reaction message.`);
		} catch (error) {
			// The message was not found or an error occurred
			console.error('Error fetching message:', error);
			channel.send(out);
		} 


		if (message.id === employmentMessageId) {
			for (const [key, value] of Object.entries(reactionsList)) {
				message.react(value.reactionId);
			}
		}
	}
}