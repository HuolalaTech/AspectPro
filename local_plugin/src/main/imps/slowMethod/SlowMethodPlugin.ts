import { PluginConfigManager } from '../../configs/PluginConfigManager';
import { SlowMethodTransform } from '../../ast/transformers/SlowMethodTransform';

const SLOW_METHOD_CONFIG_FILE_ABS_PATH: string = '../local_plugin/src/main/configs/txt/slowMethodBlacklist.txt'

export class SlowMethodPlugin {
  private static hasParseConfigFile: boolean = false;
  private static allSlowMethodFiles: string[];

  static doTransform(ts, sourcefile, modulePath: string) {
    if (sourcefile === undefined || sourcefile.fileName === undefined) {
      return sourcefile;
    }

    if (!SlowMethodPlugin.hasParseConfigFile) {
      SlowMethodPlugin.allSlowMethodFiles =
        PluginConfigManager.parseSlowMethodConfig(modulePath, SLOW_METHOD_CONFIG_FILE_ABS_PATH);
      SlowMethodPlugin.hasParseConfigFile = true;
    }

    if (!SlowMethodPlugin.allSlowMethodFiles || SlowMethodPlugin.allSlowMethodFiles.length <= 0) {
      return sourcefile;
    }

    let isTargetFile = SlowMethodPlugin.allSlowMethodFiles.indexOf(sourcefile.fileName);
    if (isTargetFile !== -1) {
      let filePath = SlowMethodPlugin.allSlowMethodFiles[isTargetFile];
      console.log("doTransform() ----> 开始处理目标文件: " + filePath)
      let result = ts.transform(sourcefile, [SlowMethodTransform.doTransform(ts)]);
      return result.transformed[0];
    } else {
      return sourcefile;
    }
  }
}


