import { HvigorCoreNode } from '../core/hvigor-core-node.js';
import { Task } from '../../vigor/task/interface/task.js';
/**
 * Hvigor任务类型
 */
export declare enum HvigorTaskGroupType {
    HELP_TASK_GROUP = "Help",
    OTHER_TASK_GROUP = "Other",
    SYNC_TASK_GROUP = "Sync",
    INIT_TASK_GROUP = "Init"
}
/**
 * Hvigor可执行任务的Task的基础抽象类
 *
 * @since 2022/1/20
 */
export declare abstract class CoreTask {
    /**
     * 获取Task的可执行function，即Task的实际任务逻辑，是通过该function来执行的
     *
     * @return {Function} Js中的可执行function
     */
    abstract getAction(): Function;
    /**
     * 获取任务名
     *
     * @return {string} task name
     */
    abstract getName(): string;
    /**
     * 获取任务的完整路径,路径为包括该任务所属的Node.eg:NodeName:TaskName
     *
     * @return {string} task path
     */
    abstract getPath(): string;
    /**
     * 获取当前任务所属的hvigorNode对象
     *
     * @return {HvigorCoreNode}
     */
    abstract getNode(): HvigorCoreNode;
    /**
     * 获取当前任务的所有依赖Task的任务名列表
     *
     * @return {string[]} 依赖的任务名列表
     */
    abstract getDependsOn(): string[];
    /**
     * 通过任务名给当前Task设置1...n个依赖Task,并建立任务之间的依赖管理,保存到DAG图中
     * 依赖的任务名必须是在当前module中存在的
     * 区别于{addDependsOn}任务,该任务是以覆盖的方式设置任务依赖
     *
     * @param {string[]} taskNames
     * @return {CoreTask}
     */
    abstract setDependsOn(...taskNames: string[]): CoreTask;
    /**
     * 通过任务名给当前Task添加一个依赖Task,并建立任务之间的依赖,保存到DAG图中
     * 依赖的任务名必须是在当前module中存在的
     * 区别于{setDependsOn}任务,该任务是在原有的基础上增加一个Task依赖
     *
     * @param {string} taskName
     * @return {CoreTask}
     */
    abstract addDependsOn(taskName: string): CoreTask;
    /**
     * 通过任务名或者Task对象直接给当前任务添加依赖，并保存到DAG图中
     * 依赖的任务默认是当前的module
     *
     * @param {string | CoreTask} task
     * @return {CoreTask}
     */
    abstract dependsOn(task: string | CoreTask): CoreTask;
    /**
     * 通过任务名或者Task对象直接给当前任务添加依赖，并保存到DAG图中
     * 依赖的任务可以根据nodeName指定其他Node
     *
     * @param {string | CoreTask} taskName
     * @param {string | HvigorCoreNode} nodeName hvigor Node的名称,保持跟根项目的build-profile.json5中的一致
     * @return {CoreTask}
     */
    abstract dependsOn(taskName: string | CoreTask, nodeName?: string | HvigorCoreNode): CoreTask;
    /**
     * 设置Task的enabled的状态
     *
     * @param {boolean} enabled 是否使用该task
     */
    abstract setEnabled(enabled: boolean): CoreTask;
    /**
     * 获取Task的enabled的状态
     *
     * @return {boolean} true/false
     */
    abstract getEnabled(): boolean;
    /**
     * 标记某些Task不需要跟踪任务执行状态，即不需要检测增量等
     *
     * @param {string} reason 不需要跟踪的原因
     */
    abstract doNotTrackState(reason: string): void;
    /**
     * 设置任务的group分组
     *
     * @param {string} group 任务分组
     */
    abstract setGroup(group: string): CoreTask;
    /**
     * 获取任务的group分组
     *
     * @return {string}
     */
    abstract getGroup(): string;
    /**
     * 设置任务的描述信息
     *
     * @param {string} description 任务描述
     */
    abstract setDescription(description: string): CoreTask;
    /**
     * 获取任务的描述信息
     *
     * @return {string}
     */
    abstract getDescription(): string | undefined;
    /**
     * 任务执行失败之后后的回调
     *
     * @param error
     */
    abstract onFailed(error: Error): void;
    abstract getHvigorTask(): Task | undefined;
    abstract beforeRun(fn: Function): void;
    abstract afterRun(fn: Function): void;
}
/**
 * 基于Task继承的实现类,必须实现该接口,注册Task的实际执行逻辑
 *
 * @since 2022/4/22
 */
export declare abstract class Registry {
    /**
     * 通过DefaultTask继承实现的用户自定义的类，必须实现该接口，以获取该Task实际需要执行的Function
     *
     * @return {Function}
     */
    abstract registryAction(): Function;
}
