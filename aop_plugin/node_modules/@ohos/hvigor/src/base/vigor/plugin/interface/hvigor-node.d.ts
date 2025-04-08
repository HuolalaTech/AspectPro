import { NormalizedFile } from '../../../../common/util/hvigor-file-util';
import { Consumer } from '../../../external/interface/consumer.js';
import { HvigorTask } from '../../task/interface/hvigor-task.js';
import { Task } from '../../task/interface/task.js';
import { Config } from './loader-profile.js';
/**
 * Hvigor Plugin扩展接口定义
 */
export interface HvigorNode {
    nodeDir: NormalizedFile;
    getNodeDir: () => NormalizedFile;
    /**
     * 向当前节点注册任务
     *
     * @param {HvigorPluginTask} task
     */
    registerTask: (task: HvigorTask) => void;
    /**
     * 根据任务名称获取任务
     *
     * @param {string} taskName 任务名
     * @return {HvigorTask | undefined}
     */
    getTaskByName: (taskName: string) => Task | undefined;
    /**
     * 获取当前节点名称
     *
     * @return {string}
     */
    getNodeName: () => string;
    /**
     * 获取当前节点路径
     *
     * @return {string}
     */
    getNodePath: () => string;
    /**
     * 获取父节点对象
     *
     * @return {HvigorNode | undefined}
     */
    getParentNode: () => HvigorNode | undefined;
    /**
     * 获取当前节点下所有字节点对象
     *
     * @return {HvigorNode | []}
     */
    subNodes: (callbackfn: (node: HvigorNode) => void) => void;
    /**
     * 根据节点名称查找子节点
     *
     * @param {string} nodeName 节点名称
     * @return {HvigorNode} hvigor节点对象
     */
    getSubNodeByName: (nodeName: string) => HvigorNode | undefined;
    /**
     * 根据pluginId获取插件提供的元数据
     *
     * @param {string} pluginId
     * @return {any} PluginContext
     */
    getContext: (pluginId: string) => any;
    /**
     * 获取当前节点加载的所有PluginId
     *
     * @return {string[]} pluginId集合
     */
    getAllPluginIds: () => string[];
    getConfigOpt: () => Config;
    addExtraOption(key: string, value: any): void;
    getExtraOption(key: string): any;
    getAllTasks(): Task[];
    beforeNodeEvaluate(fn: Consumer<HvigorNode>): void;
    afterNodeEvaluate(fn: Consumer<HvigorNode>): void;
}
/**
 * 早期提供的接口类型HvigorPluginContext，现已废弃与HvigorNode完全兼容
 * @deprecated 此接口类型名称已废弃，不再推荐使用，请使用HvigorNode替代
 */
export type HvigorPluginContext = HvigorNode;
