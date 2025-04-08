import { HvigorCoreNode } from '../../external/core/hvigor-core-node.js';
/**
 * 执行每个module中注册的sync类型的任务，将对应的数据模型注册到registry中
 *
 * @param {HvigorCoreNode} hvigorNode
 */
export declare function findSyncTaskPathsForNode(hvigorNode: HvigorCoreNode): string[];
/**
 * 打印sync的信息到输出流中
 */
export declare function outputPluginSyncInfo(): void;
