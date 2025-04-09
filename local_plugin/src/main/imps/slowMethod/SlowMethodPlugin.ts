/**
 * Hvigor-Plugin                       发布
 * 1.-> https://developer.huawei.com/consumer/cn/doc/harmonyos-guides-V5/ide-hvigor-plugin-0000001778674577-V5
 */

import { BasePluginImp } from '../BasePluginImp';
import { SlowMethodTsImp } from './SlowMethodTsImp';

export class SlowMethodPlugin {
  static start(allSlowMethodFiles: string[]) {
    const slowMethodImp:BasePluginImp = new SlowMethodTsImp();
    allSlowMethodFiles.forEach(filePath => slowMethodImp.start(filePath));
  }
}


