const rrModel = require("../../models/reactionRoles")
const { Client, CommandInteraction } = require("discord.js");

module.exports = {
	name: 'add-role',
	description: 'Add a role to the reaction role panel.',
	userPermissions: ["MANAGE_ROLES"],
		options: [
			{
			name: "role",
				description: "Role to be added.",
				type: "ROLE",
				required: true
			},
			{
            name: "description",
				description: "Description of the role.",
				type: "STRING",
				required: false
			},
			{
				name: "emoji",
				description: "Emoji for the role.",
				type: "STRING",
				required: false
			},
	],
	run: async(client, interaction) => {
		
		let role = interaction.options.getRole("role")
		let roleDescription = interaction.options.getString("description") || null;
				let roleEmoji = interaction.options.getString("emoji") || null;

if(role.position >= interaction.guild.me.roles.highest.position) return interaction.followUp("The role mentioned is above or equal to my role!")
const guildData = await rrModel.findOne({ guildId: interaction.guild.id })

        const newRole = {
            roleId: role.id,
            roleDescription,
            roleEmoji,
        }

if(guildData) {
    const roleData = guildData.roles.find((x) => x.roleId === role.id) 



if(roleData) {
	roleData: newRole;
} else {
guildData.roles = [...guildData.roles, newRole]
}

await guildData.save() 
} else {
	await rrModel.create({
		guildId: interaction.guild.id,
	roles: newRole
	});
}


interaction.followUp(`Added <@&${role.id}> to the panel!`)


}
	}
		
	



