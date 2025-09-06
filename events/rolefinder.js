const { guildId } = require('../config.json');
const { reactionsList, botId } = require('../reactions.json');

module.exports = {
    findRole : async function(client, reaction, user, action = "add") {
        const guild = client.guilds.cache.get(guildId);

        if (guild) {
            for (const [key, value] of Object.entries(reactionsList)) {                
                if (value.reactionId === '<:' + reaction.emoji.identifier + '>') {
                    const role = guild.roles.cache.find(r => r.name === value.roleName);
                        if (role) {
                            const member = await guild.members.fetch(user.id);
                        
                        if (member) {
                            if (member.id != botId) {
                                if (action === "remove") {
                                    member.roles.remove(role); 
                                    console.log(`Role "${role.name}" removed from user ${member.displayName}`);
                                } else {
                                    member.roles.add(role); 
                                    console.log(`Role "${role.name}" added to user ${member.displayName} for game ${key}`);
                                }
                            }
                            
                        } else {
                            console.log(`Role "${role}" not found in server "${guild.name}".`);
                        }
                    
                    // You can now use the 'role' object for further actions
                    } else {
                        console.log(`Role "${role}" not found in server "${guild.name}".`);
                    }
                }
            }

        } else {
            console.log(`Guild with ID "${guildId}" not found.`);
        }
}
}