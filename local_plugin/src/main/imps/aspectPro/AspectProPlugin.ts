/**
 * Hvigor-Plugin                       发布
 * 1.-> https://developer.huawei.com/consumer/cn/doc/harmonyos-guides-V5/ide-hvigor-plugin-0000001778674577-V5
 *//*

import { ReplaceRule } from '../../configs/parsers/BaseConfigParser';
import { BasePluginImp } from '../BasePluginImp';
import { AspectProTsImp } from './AspectProTsImp';

export class AspectProPlugin {
  static start(allAspectProFiles: string[], replaceRules: ReplaceRule[]) {
    const aspectProImp:BasePluginImp = new AspectProTsImp();
    allAspectProFiles.forEach(filePath => aspectProImp.start(filePath, replaceRules));
  }
}*/
