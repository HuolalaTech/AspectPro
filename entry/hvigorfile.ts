import { hapTasks } from '@ohos/hvigor-ohos-plugin';

// 依赖远程aop-pro-plugin
// import { aspectProPlugin } from 'aspect-pro-plugin';
//
// export default {
//   system: hapTasks, /* Built-in plugin of Hvigor. It cannot be modified. */
//   plugins: [aspectProPlugin()]
// }

// TODO 开发阶段 - 依赖local plugin
import { aspectProPluginV2 } from '../local_plugin/src/main/AspectProPluginV2';

export default {
  system: hapTasks,
  plugins: [aspectProPluginV2(/*'../local_plugin/src/main/compile/AspectCompilePlugin.ts'*/)]
}
