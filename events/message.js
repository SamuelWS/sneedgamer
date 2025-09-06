const { Events } = require('discord.js');
const { messageId, channelId, reactionsList } = require('../reactions.json');


module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);

		const channel = client.channels.cache.get(channelId);
		var out = "# Reaction Roles \n";

		for (const [key, value] of Object.entries(reactionsList)) {
			out += value.reactionId + ' ' +  key + '\n';
		}

		var message;

		try {
			message = await channel.messages.fetch(messageId);
			message.edit(out);
			console.log(`Setting up reaction message.`);
		} catch (error) {
			// The message was not found or an error occurred
			console.error('Error fetching message:', error);
			channel.send(out);
		} 


		if (message.id === messageId) {
            for (const [key, value] of Object.entries(reactionsList)) {
                message.react(value.reactionId);
                // if (!(message.reactions.cache.fetch(value.reactionId))) {
                //     message.react(value.reactionId);
                // }
            }
        }
	}
}