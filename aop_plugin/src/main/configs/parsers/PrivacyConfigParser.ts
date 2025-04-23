//@ts-ignore
import { AspectProConfigParser } from './AspectProConfigParser';
import { ReplaceRule } from './BaseConfigParser';

const TAG = "PrivacyConfigParser"

/**
 * 1.隐私Api调用配置解析 (直接复用函数替换解析逻辑)
 */
export class PrivacyConfigParser {
  static parse(rootDir: string, configFilePath: string): { allFiles: string[]; replaceRules: ReplaceRule[]; } {
    return AspectProConfigParser.parse(rootDir, configFilePath)
  }
}






