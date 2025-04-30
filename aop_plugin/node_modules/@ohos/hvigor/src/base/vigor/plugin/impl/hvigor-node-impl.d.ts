import { NormalizedFile } from '../../../../common/util/hvigor-file-util';
import { HvigorCoreNode } from '../../../external/core/hvigor-core-node.js';
import { Consumer } from '../../../external/interface/consumer.js';
import { HvigorTask } from '../../task/interface/hvigor-task.js';
import { Task } from '../../task/interface/task.js';
import { HvigorNode } from '../interface/hvigor-node.js';
/**
 * Hvigor Node节点实现类 (新)
 */
export declare class HvigorNodeImpl implements HvigorNode {
    private logger;
    private node;
    private allSubNodes;
    private parentNode;
    nodeDir: NormalizedFile;
    constructor(node: HvigorCoreNode);
    getNodeName(): string;
    getNodePath(): string;
    getParentNode(): HvigorNode | undefined;
    getContext(pluginId: string): any;
    getAllPluginIds(): string[];
    getSubNodeByName(nodeName: string): HvigorNode | undefined;
    getTaskByName(taskName: string): Task | undefined;
    registerTask(task: HvigorTask): HvigorTask;
    subNodes(callbackfn: (node: HvigorNode) => void): void;
    getNodeDir(): NormalizedFile;
    getConfigOpt(): import("../interface/loader-profile").Config;
    private loadParentNode;
    private loadAllSubNodes;
    addExtraOption(key: string, value: any): void;
    getExtraOption(key: string): any;
    beforeNodeEvaluate(fn: Consumer<HvigorNode>): void;
    afterNodeEvaluate(fn: Consumer<HvigorNode>): void;
    getAllTasks(): Task[];
}
