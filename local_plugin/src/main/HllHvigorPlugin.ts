//@ts-ignore
import { hvigor, HvigorNode, HvigorPlugin } from '@ohos/hvigor';
//@ts-ignore
import { OhosHapContext, OhosPluginId} from '@ohos/hvigor-ohos-plugin';

/**
 * 背景：TS Compiler Api 无法处理ets文件 & Ets 语法解析api官方暂未开发
 *
 * 方案: 直接Hvigor plugin 中获取ets_loader 编译工具中this.share 对象，进而获取到 Ets转换后的 ts.sourcefile
 *
 *  工作流程
 * - step 1: 定义你的Hvigor Plugin -> 比如HllEntryPlugin
 * - step 2: HllEntryPlugin中通过OhosHapContext.loadCompilePlugin( AopPlugins)
 *
 *  注意事项
 * - @param yourPluginAbsPath 自定义编译插件文件需要传入 "相对路径" (相对于HllHvigorPlugin)
 *   比如(本示例文件结构则传：'../local_plugin/src/main/imps/HllHvigorCompilePlugin.ts')
 */

export function HllHvigorPlugin(yourPluginAbsPath:string): HvigorPlugin {
  return {
    pluginId: 'HllHvigorPlugin',
    async apply(node: HvigorNode): Promise<void> {
      hvigor.nodesEvaluated(async () => {
        const hapContext = node.getContext(OhosPluginId.OHOS_HAP_PLUGIN) as OhosHapContext;
        hapContext?.loadCompilePlugin(yourPluginAbsPath);
      });
    }
  };
}
