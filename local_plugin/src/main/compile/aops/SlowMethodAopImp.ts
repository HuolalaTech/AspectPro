import { PluginConfigManager } from '../../configs/PluginConfigManager';
import { SlowMethodTransform } from '../../ast/transformers/SlowMethodTransform';

const SLOW_METHOD_CONFIG_FILE_ABS_PATH: string = '../local_plugin/src/main/configs/txt/slowMethodBlacklist.txt'
/**
 * AOP编译时：插入方法执行耗时统计
 */
export class SlowMethodAopImp {
  private static hasParseConfigFile: boolean = false;
  private static allSlowMethodFiles: string[];

  static doTransform(ts, sourcefile, modulePath: string) {

    if (!SlowMethodAopImp.hasParseConfigFile) {
      SlowMethodAopImp.allSlowMethodFiles =
        PluginConfigManager.parseSlowMethodConfig(modulePath, SLOW_METHOD_CONFIG_FILE_ABS_PATH);
      SlowMethodAopImp.hasParseConfigFile = true;
    }

    if (!SlowMethodAopImp.allSlowMethodFiles || SlowMethodAopImp.allSlowMethodFiles.length <= 0) {
      return sourcefile;
    }

    let isTargetFile = SlowMethodAopImp.allSlowMethodFiles.indexOf(sourcefile.fileName);
    if (isTargetFile !== -1) {
      let filePath = SlowMethodAopImp.allSlowMethodFiles[isTargetFile];
      console.log("SlowMethodPlugin->doTransform() ----> 开始处理目标文件: " + filePath)
      let result = ts.transform(sourcefile, [SlowMethodTransform.doTransform(ts)]);
      return result.transformed[0];
    } else {
      return sourcefile;
    }
  }
}


