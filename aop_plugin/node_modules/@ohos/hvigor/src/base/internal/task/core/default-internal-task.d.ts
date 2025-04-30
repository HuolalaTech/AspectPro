import { HvigorCoreNode } from '../../../external/core/hvigor-core-node.js';
import { CoreTaskImpl } from '../../../external/task/core-task-impl.js';
import { TaskDetails } from '../interface/task-details-interface.js';
/**
 * 通过Function直接注册的Task类型
 *
 * @since 2022/4/24
 */
export declare class DefaultInternalTask extends CoreTaskImpl {
    constructor(module: HvigorCoreNode, taskDetails: TaskDetails, fn: Function);
}
