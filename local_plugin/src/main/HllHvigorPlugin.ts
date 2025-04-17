/**
 * 背景：TS Compiler Api 无法处理ets文件 & Ets 语法解析api官方暂未开发
 *
 * 方案: 直接Hvigor plugin 中获取ets_loader 编译工具中this.share 对象，进而获取到 Ets转换后的 ts.sourcefile
 *
 *  工作流程
 * - step 1: 定义你的Hvigor Plugin -> 比如HllEntryPlugin
 * - step 2: HllEntryPlugin中通过OhosHapContext.loadCompilePlugin( AopPlugins)
 * - step 3: 在AopPlugins中获取到ets转化为ts的 sourcefile
 * - step 4: 获取ets_loader中的ts对象，按你的aop需求 利用ts compiler aip 修改sourcefile
 * - step 5: 将修改后的sourcefile赋值给this.share.sourcefile, 系统编译工具执行编译生成产物
 */

//@ts-ignore
import { hvigor, HvigorNode, HvigorPlugin } from '@ohos/hvigor';
//@ts-ignore
import { OhosHapContext, OhosPluginId} from '@ohos/hvigor-ohos-plugin';

/**
 *
 * @param yourPluginAbsPath 自定义编译插件文件相对路径(相对于HllHvigorPlugin)
 * (本示例文件结构则传：'../local_plugin/src/main/imps/HllHvigorCompilePlugin.ts')
 * @returns
 */
export function HllHvigorPlugin(yourPluginAbsPath:string): HvigorPlugin {
  return {
    pluginId: 'HllHvigorPlugin',
    async apply(node: HvigorNode): Promise<void> {
      hvigor.nodesEvaluated(async () => {
        // console.log("HllEntryPluginV2() ----> start ");
        const hapContext = node.getContext(OhosPluginId.OHOS_HAP_PLUGIN) as OhosHapContext;
        // let allSlowMethodFiles: string[] =
        //   PluginConfigManager.parseSlowMethodConfig(node.nodeDir.filePath, '../local_plugin/src/main/configs/txt/slowMethodBlacklist.txt');
        hapContext?.loadCompilePlugin('../local_plugin/src/main/imps/HllHvigorCompilePlugin.ts');
      });
    }
  };
}
