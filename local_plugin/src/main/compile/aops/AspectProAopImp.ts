import { AspectProTransform } from '../../ast/transformers/AspectProTransform';
import { ReplaceRule } from '../../configs/parsers/BaseConfigParser';
import { PluginConfigManager } from '../../configs/PluginConfigManager';

const ASPECT_PRO_CONFIG_FILE_ABS_PATH: string = '../local_plugin/src/main/configs/txt/aspectProPluginConfig.txt'
/**
 * AOP编译时：替换方法调用
 */
export class AspectProAopImp {
  private static hasParseConfigFile: boolean = false;
  private static allAspectProFiles: string[];
  private static allReplaceRules: ReplaceRule[]

  static doTransform(ts, sourcefile, modulePath: string) {
    if (sourcefile === undefined || sourcefile.fileName === undefined) {
      return sourcefile;
    }

    if (!AspectProAopImp.hasParseConfigFile) {
      let allAspectProConfig: { allFiles: string[]; replaceRules: ReplaceRule[]; } =
        PluginConfigManager.parseAspectProConfig(modulePath, ASPECT_PRO_CONFIG_FILE_ABS_PATH);
      AspectProAopImp.allAspectProFiles = allAspectProConfig.allFiles;
      AspectProAopImp.allReplaceRules = allAspectProConfig.replaceRules;
      AspectProAopImp.hasParseConfigFile = true;
    }

    if (!AspectProAopImp.allAspectProFiles || AspectProAopImp.allAspectProFiles.length <= 0
      || !AspectProAopImp.allReplaceRules || AspectProAopImp.allReplaceRules.length <= 0) {
      return sourcefile;
    }

    let isTargetFile = AspectProAopImp.allAspectProFiles.indexOf(sourcefile.fileName);
    if (isTargetFile !== -1) {
      let filePath = AspectProAopImp.allAspectProFiles[isTargetFile];
      console.log("AspectProPlugin-> 4.doTransform() ----> 开始处理目标文件: " + filePath)
      let result = ts.transform(sourcefile, [AspectProTransform.doTransform(ts, AspectProAopImp.allReplaceRules)]);
      return result.transformed[0];
    } else {
      return sourcefile;
    }
  }
}
