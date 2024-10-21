import { BasePluginType, guildPluginEventListener, guildPluginMessageCommand, pluginUtils } from 'knub'
import z from 'zod'
import { GuildVCAlerts } from '../../data/GuildVCAlerts.js'
import { CommonPlugin } from '../Common/CommonPlugin.js'

export const zLocateUserConfig = z.strictObject({
  can_where: z.boolean(),
  can_alert: z.boolean(),
})

export interface LocateUserPluginType extends BasePluginType {
  config: z.infer<typeof zLocateUserConfig>
  state: {
    alerts: GuildVCAlerts
    usersWithAlerts: string[]
    unregisterGuildEventListener: () => void
    common: pluginUtils.PluginPublicInterface<typeof CommonPlugin>
  }
}

export const locateUserCmd = guildPluginMessageCommand<LocateUserPluginType>()
export const locateUserEvt = guildPluginEventListener<LocateUserPluginType>()
