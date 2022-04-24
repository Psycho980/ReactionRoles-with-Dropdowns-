
const rrModel = require("../../models/reactionRoles")
const { Client, CommandInteraction } = require("discord.js");

module.exports = {
	name: 'remove-role',
	description: 'Remove a role from the reaction role panel.',
		options: [
			{
			name: "role",
				description: "Role to be removed.",
				type: "ROLE",
				required: true
			}
	],
	run: async(client, interaction) =>  {

if(!interaction.member.permissions.has("FLAGS.MANAGE_ROLES")) return interaction.reply("You don't have permissions to configure the panel!")




		let role = interaction.options.getRole("role")
		
const guildData = await rrModel.findOne({ guildId: interaction.guild.id })

	if(!guildData) return interaction.followUp("There aren't any roles inside of the panel for this server.")

		let guildRoles = guildData.roles

		const findRole = guildRoles.find(x => x.roleId === role.id)
		if(!findRole) return interaction.followUp(`<@&${role.id}> doesn't exist in the panel.`)


const filteredRoles = guildRoles.filter(x => x.roleId !== role.id)		
guildData.roles = filteredRoles;

		await guildData.save()

		interaction.followUp(
			`Removed <@&${role.id}> from the panel.`
			)
		
	}


}

