/**
 * Hvigor-Plugin                       发布
 * 1.-> https://developer.huawei.com/consumer/cn/doc/harmonyos-guides-V5/ide-hvigor-plugin-0000001778674577-V5
 */

import { BasePluginImp } from '../BasePluginImp';
import { SlowMethodTsImp } from './SlowMethodTsImp';
//@ts-ignore
import * as ts from 'typescript';
import { PluginConfigManager } from '../../configs/PluginConfigManager';
import { startSlowMethodTransformer } from '../../ast/transformers/SlowMethodTransformer';

const SLOW_METHOD_CONFIG_FILE_ABS_PATH:string = '../local_plugin/src/main/configs/txt/slowMethodBlacklist.txt'

export class SlowMethodPlugin {
  private static slowMethodImp: BasePluginImp = new SlowMethodTsImp();
  private static hasParseConfigFile: boolean = false;
  private static allSlowMethodFiles: string[];

  static start(ts, allSlowMethodFiles: string[]) {
    const slowMethodImp: BasePluginImp = new SlowMethodTsImp();
    allSlowMethodFiles.forEach(filePath => slowMethodImp.start(ts, filePath));
  }

  static doTransform(ts, sourcefile: ts.SourceFile, modulePath: string): ts.SourceFile {
    if (sourcefile === undefined || sourcefile.fileName === undefined) {
      return sourcefile;
    }

    if (!SlowMethodPlugin.hasParseConfigFile) {
      SlowMethodPlugin.allSlowMethodFiles = PluginConfigManager.parseSlowMethodConfig(modulePath, SLOW_METHOD_CONFIG_FILE_ABS_PATH);
      SlowMethodPlugin.hasParseConfigFile = true;
    }

    if (SlowMethodPlugin.allSlowMethodFiles === undefined || SlowMethodPlugin.allSlowMethodFiles.length <= 0) {
      return sourcefile;
    }

    let isTargetFile = SlowMethodPlugin.allSlowMethodFiles.indexOf(sourcefile.fileName);
    if (isTargetFile !== -1) {
      let filePath = SlowMethodPlugin.allSlowMethodFiles[isTargetFile];
      console.log("doTransform() ----> 开始处理目标文件: " + filePath)
      return SlowMethodPlugin.slowMethodImp.doTransform(ts, sourcefile);
    } else {
      return sourcefile;
    }
  }
}


