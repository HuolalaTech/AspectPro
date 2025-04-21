import { AspectProConfigParser } from './parsers/AspectProConfigParser';
import { ReplaceRule } from './parsers/BaseConfigParser';
import { PrivacyConfigParser } from './parsers/PrivacyConfigParser';
import { SlowMethodConfigParser } from './parsers/SlowMethodConfigParser';

/**
 * 1.plugin 配置解析
 */
const TAG = "PluginConfigManager"

export class PluginConfigManager {
  static parseAspectProConfig(rootDir, configFilePath: string): { allFiles: string[]; replaceRules: ReplaceRule[]; } {
    return AspectProConfigParser.parse(rootDir, configFilePath)
  }

  static parsePrivacyConfig(rootDir, configFilePath: string): { allFiles: string[]; replaceRules: ReplaceRule[]; } {
    return PrivacyConfigParser.parse(rootDir, configFilePath)
  }

  static parseSlowMethodConfig(rootDir, configFilePath: string): string[] {
    return SlowMethodConfigParser.parse(rootDir, configFilePath)
  }
}
