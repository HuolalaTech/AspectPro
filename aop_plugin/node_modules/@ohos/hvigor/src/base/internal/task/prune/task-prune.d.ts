import { HvigorCoreNode } from '../../../external/core/hvigor-core-node.js';
import { DefaultTask } from '../../../external/task/default-task.js';
/**
 * hvigor prune命令 任务
 *
 * @since 2023/6/20
 */
export declare class PruneTask extends DefaultTask {
    constructor(hvigorNode: HvigorCoreNode);
    registryAction(): Function;
}
