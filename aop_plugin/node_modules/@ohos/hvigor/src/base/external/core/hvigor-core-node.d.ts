import { HookType } from '../../../common/const/hook-const.js';
import { TaskManager } from '../../internal/task/interface/task-manager-interface.js';
import { HvigorNode } from '../../vigor/plugin/interface/hvigor-node.js';
import { Config } from '../../vigor/plugin/interface/loader-profile.js';
import { Consumer } from '../interface/consumer.js';
import { HvigorSystemPlugin } from '../plugin/hvigor-system-plugin.js';
/**
 * 用于给需要区分真实对象类型设置的一个属性
 *
 * @since 2022/6/20
 */
export interface Class {
    classKind: string;
}
/**
 * hvigor的node模型,不论是project还是module都属于这种类型,其中提供了hvigor模块的公共接口
 * 并且继承了TaskManager中定义的模块用于管理任务的相关接口
 *
 * @since 2021/12/27
 */
export interface HvigorCoreNode extends TaskManager, Class {
    /**
     * 获取Module名称
     *
     * @return {string} name
     */
    getName: () => string;
    /**
     * 获取Module的hvigorFile.js路径
     *
     * @return {string} hvigorFile.js path
     */
    getBuildFilePath: () => string;
    /**
     * 获取Module的build-profile.json5路径
     *
     * @return {string} build-profile.json5 path
     */
    getBuildProfilePath: () => string;
    /**
     * 获取模块路径
     *
     * @return {string} node path
     */
    getNodeDir: () => string;
    /**
     * 获取Module的packageJson
     *
     * @return {string} package.json path
     */
    getPackageJsonPath: () => string;
    /**
     * 通过名称获取Module
     *
     * @param {string} moduleName
     * @return {Module|undefined}
     */
    findModuleByName: (moduleName: string) => Module | undefined;
    /**
     * 注入plugin对象
     *
     * @param {HvigorSystemPlugin} plugin
     */
    bindPlugin: (plugin: HvigorSystemPlugin) => void;
    /**
     * 注入metaInfo上下文
     *
     * @param {string} pluginId 插件标识
     * @param {Function} func context Function
     */
    bindPluginContextFunc(pluginId: string, func: Function): void;
    /**
     * 获取plugin对象
     *
     * @param {string} pluginId
     * @return {HvigorSystemPlugin|undefined}
     */
    getPluginById: (pluginId: string) => HvigorSystemPlugin | undefined;
    /**
     * 根据pluginId获取MetaInfo信息
     *
     * @param {string} pluginId
     */
    getContext(pluginId: string): any;
    /**
     * 获取当前节点加载的所有pluginId
     *
     * @return {string[]}
     */
    getAllPluginIds(): string[];
    /**
     * 获取根项目project
     *
     * @return {Project}
     */
    getProject: () => Project;
    loadConfig(config: any): void;
    getConfigOpt: () => Config;
    addExtraOption(key: string, value: any): void;
    getExtraOption(key: string): any;
    beforeNodeEvaluate(fn: Consumer<HvigorNode>): void;
    afterNodeEvaluate(fn: Consumer<HvigorNode>): void;
    executeNodeHook(hookTpye: HookType.beforeNodeEvaluate | HookType.afterNodeEvaluate): Promise<void>;
    afterBindSystemPlugins(fn: Consumer<HvigorNode>): void;
    executeAfterBindSystemPluginsHook(): Promise<void>;
}
/**
 * hvigor项目中的根module
 *
 * @since 2022/1/8
 */
export interface Project extends HvigorCoreNode {
    /**
     * 获取子模块
     * 根据name直接获取子模块
     *
     * @return {Map<string,Module>>}
     */
    getSubModules: () => Map<string, Module>;
    /**
     * 添加子模块
     *
     * @return {Module}
     */
    addSubModule: (module: Module) => void;
    /**
     * 获取所有的的子模块
     *
     * @return {Module[]}
     */
    getAllSubModules: () => Module[];
    /**
     * 获取节点config配置
     */
    getConfigOpt: () => any;
}
/**
 * hvigor项目中的子模块module
 *
 * @since 2022/1/8
 */
export type Module = HvigorCoreNode;
