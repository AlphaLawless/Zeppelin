import { commandTypeHelpers as ct } from '../../../commandTypes.js'
import { getRoleInfoEmbed } from '../functions/getRoleInfoEmbed.js'
import { utilityCmd } from '../types.js'

export const RoleInfoCmd = utilityCmd({
  trigger: ['roleinfo'],
  description: 'Show information about a role',
  usage: '!role 106391128718245888',
  permission: 'can_roleinfo',

  signature: {
    role: ct.role({ required: true }),
  },

  async run({ message, args, pluginData }) {
    const embed = await getRoleInfoEmbed(pluginData, args.role)
    message.channel.send({ embeds: [embed] })
  },
})
