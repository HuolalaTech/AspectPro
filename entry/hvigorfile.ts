import { hapTasks } from '@ohos/hvigor-ohos-plugin';
import * as path from 'path';
// 依赖远程aop-pro-plugin
// import { aspectProPlugin } from 'aspect-pro-plugin';
//
// export default {
//   system: hapTasks, /* Built-in plugin of Hvigor. It cannot be modified. */
//   plugins: [aspectProPlugin()]
// }

// TODO 开发阶段 - 依赖local plugin
// import { aspectProPluginV2 } from '../local_plugin/src/main/AspectProPluginV2';
//
// export default {
//   system: hapTasks,
//   plugins: [aspectProPluginV2(/*'../local_plugin/src/main/compile/AspectCompilePlugin.ts'*/)]
// }

// 依赖远程aop-pro-plugin v2
// import { aspectProPluginV2 } from '/Users/greek.chen/HarmonyOs/openSource/AspectPro/aop_plugin/src/main/AspectProPluginV2.ts';
import { aspectProPluginV2} from 'aspect-pro-plugin';
export default {
  system: hapTasks, /* Built-in plugin of Hvigor. It cannot be modified. */
  plugins: [aspectProPluginV2(require.resolve('aspect-pro-plugin'))]
}