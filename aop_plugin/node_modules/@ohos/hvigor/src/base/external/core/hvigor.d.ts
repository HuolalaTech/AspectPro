import { Parameter } from '../../data/parameters.js';
import { HvigorNode } from '../../vigor/plugin/interface/hvigor-node.js';
import { Consumer } from '../interface/consumer.js';
import { BuildResult } from '../models/build-result.js';
import { HvigorConfig } from './hvigor-config.js';
import { Project } from './hvigor-core-node.js';
/**
 * hvigor向外部暴露的hvigor对象 通过此对象可以操作hvigor运行中的内容
 *
 * @since 2024-03-13
 */
export declare class Hvigor {
    private hvigorLifecycleHook;
    getRootNode(): HvigorNode;
    getAllNodes(): HvigorNode[];
    getNodeByName(nodeName: string): HvigorNode | undefined;
    getHvigorConfig(): HvigorConfig;
    /**
     * 获取hvgior命令配置参数
     * @return {Parameter} Parameter对象
     */
    getParameter(): Parameter;
    /**
     * 所有的node添加一个beforeNode hook
     * @param fn 方法的入参HvigorNode
     */
    beforeNodeEvaluate(fn: Consumer<HvigorNode>): void;
    /**
     * 为所有的node添加一个afterNode hook
     * @param fn 方法的入参HvigorNode
     */
    afterNodeEvaluate(fn: Consumer<HvigorNode>): void;
    configEvaluated(fn: Consumer<HvigorConfig>): void;
    nodesInitialized(fn: Consumer<Hvigor>): void;
    nodesEvaluated(fn: Consumer<Hvigor>): void;
    taskGraphResolved(fn: Consumer<Hvigor>): void;
    buildFinished(fn: Consumer<BuildResult>): void;
    getCommandEntryTask(): string[] | undefined;
    /**
     * 判断是否是命令入口Task
     *
     * @param {string} taskName 任务名
     * @return {string[]} commandEntryTasks Task集合
     *
     */
    isCommandEntryTask(taskName: string): boolean;
    /**
     * 返回在命令行中传递的额外参数
     *
     * @returns {Map<string, string>}
     * @deprecated 已过时，为兼容历史版本而保留不再推荐使用 推荐使用hvigor.getParameter()方法代替
     */
    getExtraConfig(): Map<string, string>;
    /**
     * 返回Project模型
     *
     * @returns {Project | undefined}
     * @deprecated 已过时，为兼容历史版本而保留不再推荐使用
     */
    getProject(): Project | undefined;
}
export declare const hvigor: Hvigor;
