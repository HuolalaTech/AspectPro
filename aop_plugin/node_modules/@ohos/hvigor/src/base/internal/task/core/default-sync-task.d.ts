import { HvigorCoreNode } from '../../../external/core/hvigor-core-node.js';
import { DefaultTask } from '../../../external/task/default-task.js';
/**
 * Hvigor同步类型任务的基础类,同步类型的任务是用来在插件嵌入到其他平台中提供数据同步作用的
 * 为了跟执行构建任务区分，独立出来，单独扩展和使用，同时可以提高执行构建任务的效率，免去不必要的数据同步
 *
 * @since 2022/1/20
 */
export declare abstract class DefaultSyncTask extends DefaultTask {
    protected constructor(defaultModule: HvigorCoreNode, taskName: string);
}
