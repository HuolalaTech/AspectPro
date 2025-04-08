import { HookArgMap, HookType } from '../../../common/const/hook-const.js';
import { Parameter } from '../../data/parameters.js';
import { HvigorNode } from '../../vigor/plugin/interface/hvigor-node.js';
import { Consumer } from '../interface/consumer.js';
import { HvigorCoreNode, Project } from './hvigor-core-node.js';
/**
 * 提供前端工程配置信息的数据类
 *
 * @since 2021/12/09
 */
declare class HvigorCore {
    private readonly version;
    private _project;
    private _extraConfig;
    private _commandEntryTasks;
    private _scriptMap;
    private _hvigorNodeTree;
    private _hvigorAfterNodeInternalHook;
    private _hvigorNodesEvaluatedInternalHook;
    private _hvigorNodesBeforeEvaluatedInternalHook;
    private readonly metaInfo;
    constructor();
    /**
     * 判断hvigor的版本是否发生变化
     */
    versionChanged(): boolean;
    /**
     * 更新meta.json中的属性
     *
     * @param property
     * @param value
     */
    updateMetaProperty(property: string, value: string | undefined): void;
    /**
     * 将更新后的meta属性写入meta.json
     */
    writeMetaProperties(): void;
    /**
     * 获取meta.json中的属性
     *
     * @param property
     */
    getMetaProperty(property: string): string | undefined;
    /**
     * 返回Project模型
     *
     * @returns {Project | undefined}
     */
    getProject(): Project | undefined;
    getParameter(): Parameter;
    /**
     * 根据hvigorfile的文件位置返回对应node的hvigor 模型
     *
     * @param {string} buildScriptFilePath
     * @returns {HvigorNode | undefined}
     */
    getModuleByScriptPath(buildScriptFilePath: string): HvigorCoreNode | undefined;
    getHvigorNodeByScriptPath(buildScriptFilePath: string): HvigorNode | undefined;
    getParentNodeByScriptPath(buildScriptFilePath: string): HvigorNode | undefined;
    getSubNodeByScriptPath(buildScriptFilePath: string): HvigorNode[] | undefined;
    /**
     * 返回在命令行中传递的额外参数
     *
     * @returns {Map<string, string>}
     */
    getExtraConfig(): Map<string, string>;
    /**
     * 保存命令行中的配置
     *
     * @param {Map<string, string>} value
     */
    setExtraConfig(value: Map<string, string>): void;
    /**
     * 判断是否是命令入口Task
     *
     * @param {string} taskName 任务名
     * @return {string[]} commandEntryTasks Task集合
     */
    isCommandEntryTask(taskName: string): boolean;
    /**
     * 保存hvigor命令行中的入口Tasks
     *
     * @param {string[]} commandEntryTasks Task集合
     */
    setCommandEntryTasks(commandEntryTasks: string[]): void;
    getCommandEntryTasks(): string[] | undefined;
    initRootProject(project: Project): void;
    private initSubModules;
    reset(): void;
    hvigorAfterNodeInternalHook(hvigorNodeName: string, fn: Consumer<HookArgMap[HookType.afterNodeEvaluate]>): void;
    getHvigorAfterNodeInternalHookList(hvigorNodeName: string): Consumer<HookArgMap[HookType.afterNodeEvaluate]>[] | undefined;
    hvigorNodeEvaluatedInternalHook(fn: Consumer<HookArgMap[HookType.nodesEvaluated]>): void;
    hvigorNodeBeforeEvaluatedInternalHook(fn: Consumer<HookArgMap[HookType.nodesEvaluated]>): void;
    getHvigorNodesEvaluatedInternalHook(): Consumer<import("./hvigor.js").Hvigor>[];
    getHvigorNodesBeforeEvaluatedInternalHook(): Consumer<import("./hvigor.js").Hvigor>[];
    clearHvigorInternalHookList(): void;
}
/**
 * 提供接口在module的hvigorfile.js中获取当前模块的hvigor module对象
 *
 * @param {string} buildScriptFilePath hvigorfile.js文件的路径
 * @returns {HvigorNode | undefined}
 */
export declare function getHvigorNode(buildScriptFilePath?: string): HvigorCoreNode | undefined;
/**
 * 提供接口获取hvigorfile.ts当前节点对对象
 *
 * @param {string} buildScriptFilePath hvigorfile.js文件的路径
 * @returns {HvigorNode} hvigorNode节点对象
 */
export declare function getNode(buildScriptFilePath?: string): HvigorNode;
/**
 * 提供接口获取工程hvigor-config.json5文件和用户目录下hvigor-config.json5对应配置项的值，优先获取工程目录的值
 *
 * @param {string} key hvigor-config.json5中配置项的名称
 * @returns {boolean}
 */
export declare function getHvigorConfigValue(key: string): boolean;
/**
 * 一次构建中只存在一个hvigor的单例对象,用来保存和传递全局的信息
 */
export declare const hvigorCore: HvigorCore;
export {};
