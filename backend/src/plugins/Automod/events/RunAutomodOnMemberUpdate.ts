import { guildPluginEventListener } from 'knub'
import lodash from 'lodash'
import { runAutomod } from '../functions/runAutomod.js'
import { AutomodContext, AutomodPluginType } from '../types.js'

export const RunAutomodOnMemberUpdate = guildPluginEventListener<AutomodPluginType>()({
  event: 'guildMemberUpdate',
  listener({ pluginData, args: { oldMember, newMember } }) {
    if (!oldMember) return
    if (oldMember.partial) return

    const oldRoles = [...oldMember.roles.cache.keys()]
    const newRoles = [...newMember.roles.cache.keys()]

    if (lodash.isEqual(oldRoles, newRoles)) return

    const addedRoles = lodash.difference(newRoles, oldRoles)
    const removedRoles = lodash.difference(oldRoles, newRoles)

    if (addedRoles.length || removedRoles.length) {
      const context: AutomodContext = {
        timestamp: Date.now(),
        user: newMember.user,
        member: newMember,
        rolesChanged: {
          added: addedRoles,
          removed: removedRoles,
        },
      }

      pluginData.state.queue.add(() => {
        runAutomod(pluginData, context)
      })
    }
  },
})
