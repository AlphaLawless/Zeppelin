import yaml from 'js-yaml'
import { validateNoObjectAliases } from './validateNoObjectAliases.js'

/**
 * Loads a YAML file safely while removing object anchors/aliases (including arrays)
 */
export function loadYamlSafely(yamlStr: string): Record<string, unknown>  {
  let loaded = yaml.load(yamlStr)
  if (loaded == null || typeof loaded !== 'object' || Array.isArray(loaded)) {
    loaded = {}
  }
  validateNoObjectAliases(loaded as object)
  return loaded as Record<string, unknown>
}
