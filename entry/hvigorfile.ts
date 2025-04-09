import { hapTasks } from '@ohos/hvigor-ohos-plugin';

// 依赖远程aop-pro-plugin
// import { aspectProPlugin } from 'aspect-pro-plugin';
//
// export default {
//   system: hapTasks, /* Built-in plugin of Hvigor. It cannot be modified. */
//   plugins: [aspectProPlugin()]
// }

// TODO 开发阶段 - 依赖local plugin
import { HllEntryPlugin } from '../local_plugin/src/main/HllEntryPlugin';

export default {
  system: hapTasks,
  plugins: [HllEntryPlugin()]
}
