import { hapTasks } from '@ohos/hvigor-ohos-plugin';

// 依赖远程plugin
import { aspectProPlugin } from 'aspect-pro-plugin';

export default {
  system: hapTasks, /* Built-in plugin of Hvigor. It cannot be modified. */
  plugins: [aspectProPlugin()]
}
