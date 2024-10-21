import { GuildPluginData } from 'knub'
import { CaseTypeToName, CaseTypes } from '../../../data/CaseTypes.js'
import { caseIcons } from '../caseIcons.js'
import { CasesPluginType } from '../types.js'

export function getCaseIcon(pluginData: GuildPluginData<CasesPluginType>, caseType: CaseTypes) {
  return pluginData.config.get().case_icons?.[CaseTypeToName[caseType]] ?? caseIcons[caseType]
}
