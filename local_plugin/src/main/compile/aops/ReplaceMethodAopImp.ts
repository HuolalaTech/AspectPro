import { ReplaceMethodTransform } from '../../ast/transformers/ReplaceMethodTransform';
import { ReplaceRule } from '../../configs/parsers/BaseConfigParser';
import { PluginConfigManager } from '../../configs/PluginConfigManager';

const ASPECT_PRO_CONFIG_FILE_ABS_PATH: string = '../local_plugin/src/main/configs/txt/aspectProPluginConfig.txt'
/**
 * AOP编译时：替换方法调用
 */
export class ReplaceMethodAopImp {
  private static hasParseConfigFile: boolean = false;
  private static allAspectProFiles: string[];
  private static allReplaceRules: ReplaceRule[]

  static doTransform(ts, sourcefile, modulePath: string) {
    if (sourcefile === undefined || sourcefile.fileName === undefined) {
      return sourcefile;
    }

    if (!ReplaceMethodAopImp.hasParseConfigFile) {
      let allAspectProConfig: { allFiles: string[]; replaceRules: ReplaceRule[]; } =
        PluginConfigManager.parseAspectProConfig(modulePath, ASPECT_PRO_CONFIG_FILE_ABS_PATH);
      ReplaceMethodAopImp.allAspectProFiles = allAspectProConfig.allFiles;
      ReplaceMethodAopImp.allReplaceRules = allAspectProConfig.replaceRules;
      ReplaceMethodAopImp.hasParseConfigFile = true;
    }

    if (!ReplaceMethodAopImp.allAspectProFiles || ReplaceMethodAopImp.allAspectProFiles.length <= 0
      || !ReplaceMethodAopImp.allReplaceRules || ReplaceMethodAopImp.allReplaceRules.length <= 0) {
      return sourcefile;
    }

    let isTargetFile = ReplaceMethodAopImp.allAspectProFiles.indexOf(sourcefile.fileName);
    if (isTargetFile !== -1) {
      let filePath = ReplaceMethodAopImp.allAspectProFiles[isTargetFile];
      console.log("AspectProPlugin-> doTransform() ----> 开始处理目标文件: " + filePath)
      let result = ts.transform(sourcefile, [ReplaceMethodTransform.doTransform(ts, ReplaceMethodAopImp.allReplaceRules)]);
      return result.transformed[0];
    } else {
      return sourcefile;
    }
  }
}
