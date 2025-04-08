import { HookType } from '../../../../common/const/hook-const.js';
import { HvigorCoreNode, Module, Project } from '../../../external/core/hvigor-core-node.js';
import { Consumer } from '../../../external/interface/consumer.js';
import { DefaultPluginContainer } from '../../../external/plugin/default-plugin-container.js';
import { HvigorSystemPlugin } from '../../../external/plugin/hvigor-system-plugin.js';
import { CoreTask } from '../../../external/task/core-task.js';
import { HvigorNode } from '../../../vigor/plugin/interface/hvigor-node.js';
import { Config } from '../../../vigor/plugin/interface/loader-profile.js';
import { PluginContext } from '../../../vigor/plugin/interface/plugin-context.js';
import { HvigorTask, HvigorTaskContext } from '../../../vigor/task/interface/hvigor-task.js';
import { LazyTaskContainer } from '../../task/core/lazy-task-container.js';
import { TaskDirectedAcyclicGraph } from '../../task/core/task-directed-acyclic-graph.js';
import { TaskContainer } from '../../task/interface/task-container-interface.js';
import { TaskDetails } from '../../task/interface/task-details-interface.js';
/**
 * hvigor中module的默认公共父类
 *
 * @since 2022/1/8
 */
export declare abstract class DefaultNodeImpl implements HvigorCoreNode {
    classKind: string;
    protected readonly _nodeName: string;
    protected readonly _nodePath: string;
    protected readonly _packageJsonPath: string;
    protected readonly _buildFilePath: string;
    protected readonly _buildProfilePath: string;
    protected readonly _tasks: LazyTaskContainer;
    protected readonly _taskGraph: TaskDirectedAcyclicGraph;
    protected readonly _pluginContainer: DefaultPluginContainer;
    protected readonly _contextInfo: PluginContext;
    protected readonly _currentNodeLoaderPluginIds: string[];
    protected readonly taskMap: Map<CoreTask, CoreTask[]>;
    private readonly extraOption;
    private logger;
    private configOpt;
    private beforeNodeEvaluateFnQueue;
    private afterNodeEvaluateFnQueue;
    private afterBindSystemPluginsFnQueue;
    protected constructor(nodeName: string, nodePath: string);
    /**
     * 从TaskContainer获取的任务没有模块信息, 组合模块信息后返回
     */
    getTaskPaths(): string[];
    getTaskDepends(task: string): string[];
    /**
     * 获取Module的build-profile.json5路径
     *
     * @return {string} build-profile.json5 path
     */
    getBuildProfilePath(): string;
    /**
     * 获取构建的hvigorfile.js路径
     *
     * @return {string}
     */
    getBuildFilePath(): string;
    /**
     * 获取Node的路径
     *
     * @return {string}
     */
    getNodeDir(): string;
    /**
     * 获取模块的名称
     *
     * @return {string}
     */
    getName(): string;
    /**
     * 获取模块下的package.json路径
     *
     * @return {string}
     */
    getPackageJsonPath(): string;
    /**
     * 绑定具体的Plugin对象到Module对象上
     *
     * @param {HvigorSystemPlugin} plugin
     * @return {HvigorSystemPlugin}
     */
    bindPlugin(plugin: HvigorSystemPlugin): HvigorSystemPlugin;
    /**
     * 获取当前Node的任务DAG图对象
     *
     * @param {string} pluginId 插件标识
     * @param {Function} func context Function
     */
    bindPluginContextFunc(pluginId: string, func: Function): void;
    /**
     * 获取Module对象的plugin对象
     *
     * @param {string} pluginId
     * @returns {HvigorSystemPlugin | undefined}
     */
    getPluginById(pluginId: string): HvigorSystemPlugin | undefined;
    getContext(pluginId: string): any;
    getAllPluginIds(): string[];
    /**
     * 获取当前module注册的所有task
     *
     * @return {CoreTask[]} 任务列表
     */
    getAllTasks(): CoreTask[];
    /**
     * 通过taskName获取当前module的Task对象
     *
     * @param {string} name 任务名
     * @return {CoreTask | undefined}
     */
    getTaskByName(name: string): CoreTask | undefined;
    /**
     * 通过需要执行的Function和任务名注册到当前Node中
     * 可以通过传入一个TaskDetails类型的对象，直接对Task的基础信息进行赋值
     *
     * @param {Function} fn
     * @param {string | TaskDetails} taskInfo
     * @return {CoreTask}
     */
    task(fn?: Function, taskInfo?: string | TaskDetails): CoreTask;
    /**
     * 直接通过Task类型的对象注册任务到当前Node中
     * 可以通过传入一个TaskDetails类型的对象，直接对Task的基础信息进行赋值
     *
     * @param {CoreTask} task
     * @return {CoreTask}
     */
    registry(task: CoreTask): CoreTask;
    /**
     * 注册
     *
     * @param {HvigorTask} task
     * @return {HvigorTask}
     */
    registerTask(task: HvigorTask): HvigorTask;
    getTaskContext(): HvigorTaskContext;
    /**
     * 判断该module是否包含对应的task
     *
     * @param {string} name
     * @return {boolean}
     */
    hasTask(name: string): boolean;
    /**
     * 同时注册多个originalTask依赖的task到module中,并创建任务之间的依赖
     * 即不需要再依次再对每个depends task 单独注册到task容器中
     *
     * @param {CoreTask} originalTask 源task
     * @param {CoreTask[]} dependsOnTasks 依赖task
     */
    registryDependsOnTask(originalTask: CoreTask, ...dependsOnTasks: CoreTask[]): void;
    /**
     * 获取当前Node的任务容器
     *
     * @return {TaskContainer}
     */
    getTaskContainer(): TaskContainer;
    /**
     * 获取当前Node的任务DAG图对象
     *
     * @return {TaskDirectedAcyclicGraph}
     */
    getTaskGraph(): TaskDirectedAcyclicGraph;
    clearTaskGraph(): void;
    /**
     * 根据ModuleName获取Module模型
     *
     * @param {string} moduleName 模块名
     * @return {Module | undefined}
     */
    abstract findModuleByName(moduleName: string): Module | undefined;
    /**
     * 获取根项目的Project对象
     *
     * @return {Project}
     */
    abstract getProject(): Project;
    loadConfig(config: any): void;
    getConfigOpt(): Config;
    addExtraOption(key: string, value: any): void;
    getExtraOption(key: string): any;
    beforeNodeEvaluate(fn: Consumer<HvigorNode>): void;
    afterNodeEvaluate(fn: Consumer<HvigorNode>): void;
    executeNodeHook(hookTpye: HookType.beforeNodeEvaluate | HookType.afterNodeEvaluate): Promise<void>;
    afterBindSystemPlugins(fn: Consumer<HvigorNode>): void;
    executeAfterBindSystemPluginsHook(): Promise<void>;
}
