const { Client, Events, GatewayIntentBits, Partials } = require('discord.js');
const { gamingMessageId, slurMessageId, watchMessageId } = require('../reactions.json');
const { findRole } = require('./rolefinder.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
        client.on(Events.MessageReactionAdd, async (reaction, user) => {
            // When a reaction is received, check if the structure is partial
            if (reaction.partial) {
                // If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
                try {
                    await reaction.fetch();
                } catch (error) {
                    console.error('Something went wrong when fetching the message:', error);
                    // Return as `reaction.message.author` may be undefined/null
                    return;
                }
            }

            if (reaction.message.id != slurMessageId && reaction.message.id != gamingMessageId && reaction.message.id != watchMessageId) {
                return;
            }
            
            await findRole(client, reaction, user, reaction.message.id);
        });
    }
}