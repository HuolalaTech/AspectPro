import { PrivacyMethodTransform } from '../../ast/transformers/PrivacyMethodTransform';
import { ReplaceRule } from '../../configs/parsers/BaseConfigParser';
import { PluginConfigManager } from '../../configs/PluginConfigManager';

const PRIVACY_CONFIG_FILE_ABS_PATH: string = '../local_plugin/src/main/configs/txt/privacyMethodConfig.txt'

/**
 * AOP编译时：对"隐私方法"调用插桩检测
 */
export class PrivacyMethodAopImp {
  private static hasParseConfigFile: boolean = false;
  private static allPrivacyFiles: string[];
  private static allReplaceRules: ReplaceRule[]; // 此处仅使用到ReplaceRule.pattern

  static doTransform(ts, sourcefile, modulePath: string) {
    if (!PrivacyMethodAopImp.hasParseConfigFile) {
      let allAspectProConfig: { allFiles: string[]; replaceRules: ReplaceRule[]; } =
        PluginConfigManager.parsePrivacyConfig(modulePath, PRIVACY_CONFIG_FILE_ABS_PATH);
      PrivacyMethodAopImp.allPrivacyFiles = allAspectProConfig.allFiles;
      PrivacyMethodAopImp.allReplaceRules = allAspectProConfig.replaceRules;
      PrivacyMethodAopImp.hasParseConfigFile = true;
    }

    if (!PrivacyMethodAopImp.allPrivacyFiles || PrivacyMethodAopImp.allPrivacyFiles.length <= 0
      || !PrivacyMethodAopImp.allReplaceRules || PrivacyMethodAopImp.allReplaceRules.length <= 0) {
      return sourcefile;
    }

    let isTargetFile = PrivacyMethodAopImp.allPrivacyFiles.indexOf(sourcefile.fileName);
    if (isTargetFile !== -1) {
      let filePath = PrivacyMethodAopImp.allPrivacyFiles[isTargetFile];
      console.log("PrivacyMethodAopImp-> doTransform() ----> 开始处理目标文件: " + filePath)
      let result =
        ts.transform(sourcefile, [PrivacyMethodTransform.doTransform(ts, PrivacyMethodAopImp.allReplaceRules)]);
      return result.transformed[0];
    } else {
      return sourcefile;
    }
  }
}
