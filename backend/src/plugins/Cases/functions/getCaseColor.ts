import { GuildPluginData } from 'knub'
import { CaseTypeToName, CaseTypes } from '../../../data/CaseTypes.js'
import { caseColors } from '../caseColors.js'
import { CasesPluginType } from '../types.js'

export function getCaseColor(pluginData: GuildPluginData<CasesPluginType>, caseType: CaseTypes) {
  return pluginData.config.get().case_colors?.[CaseTypeToName[caseType]] ?? caseColors[caseType]
}
