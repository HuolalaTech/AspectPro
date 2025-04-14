/**
 * @deprecated
 * <<< local_plugin 用于本地开发plugin(鸿蒙module工程)，
 *  开发完成后 -> 代码迁移到aop_plugin/(npm工程) 进行打包上传 >>>
 *
 * 前置依赖：
 * npm install typescript
 * npm install diff
 *
 * 统一管理所有插桩需求,避免多个plugin 重复操作
 * 1.AspectPro Plugin
 * 2.SlowMethod Plugin
 * 3....
 */

//@ts-ignore
import { HvigorNode, HvigorPlugin } from '@ohos/hvigor';
//@ts-ignore
import * as fs from 'fs';
//@ts-ignore
import * as path from 'path';
//@ts-ignore
import os from 'os';
//@ts-ignore
import * as ts from 'typescript';

import { PluginConfigManager } from './configs/PluginConfigManager';
import { AspectProPlugin } from './imps/aspectPro/AspectProPlugin';
import { SlowMethodPlugin } from './imps/slowMethod/SlowMethodPlugin';
import { ReplaceRule } from './configs/parsers/BaseConfigParser';

const TAG = "HllEntryPlugin"
let originBackUpFiles;
const backupDir = path.join(os.tmpdir(), 'hll_plugin_backup');

export function HllEntryPlugin(): HvigorPlugin {
  return {
    pluginId: 'HllEntryPlugin',
    apply: (node: HvigorNode) => {
      node.registerTask({
        name: 'HllEntryPluginInjectTask',
        run: () => {
          dispatcherToPlugins(node);
        },
        postDependencies: ['default@CompileArkTS']
      });

      node.registerTask({
        name: 'HllEntryPluginResetTask',
        run: () => {
          resetPluginCodes(originBackUpFiles);
        },
        dependencies: ['default@CompileArkTS'],
        postDependencies: ['assembleHap']
      });
    }
  };
}

/**
 * 1.解析配置获取文件集合
 * 2.copy备份原始文件
 * 3.plugins插桩
 * 4.使用备份文件还原
 */
function dispatcherToPlugins(node) {
  console.warn(TAG, '------------ dispatcherToPlugins start -----------------');
  if (!node?.nodeDir?.filePath) {
    return;
  }

  // let allAspectProConfig: { allFiles: string[]; replaceRules: ReplaceRule[]; } =
  //   PluginConfigManager.parseAspectProConfig(node.nodeDir.filePath, '../local_plugin/src/main/configs/txt/aspectProPluginConfig.txt');
  // backupOriginalFiles(allAspectProConfig.allFiles)
  // AspectProPlugin.start(allAspectProConfig.allFiles, allAspectProConfig.replaceRules)

  let allSlowMethodFiles: string[] =
    PluginConfigManager.parseSlowMethodConfig(node.nodeDir.filePath, '../local_plugin/src/main/configs/txt/slowMethodBlacklist.txt');
  backupOriginalFiles(allSlowMethodFiles)
  SlowMethodPlugin.start(allSlowMethodFiles)
  console.warn(TAG, '------------ dispatcherToPlugins end -----------------');
}

function resetPluginCodes(allOriginalFiles) {
  if (allOriginalFiles && allOriginalFiles.length > 0) {
    console.warn(TAG, '------------ resetPluginCodes start -----------------');
    allOriginalFiles.forEach(filePair => {
      const { original, backup } = filePair;
      fs.copyFileSync(backup, original);
      fs.unlinkSync(backup);
    });
    console.warn(TAG, '------------ resetPluginCodes end -----------------');
  }
}

function backupOriginalFiles(files: string[]) {

  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  console.log(TAG, 'Backup directory:', backupDir);

  originBackUpFiles = files.map(file => {
    const fileName = path.basename(file);
    const backupFilePath = path.join(backupDir, fileName);
    fs.copyFileSync(file, backupFilePath);
    return { original: file, backup: backupFilePath };
  });
}




