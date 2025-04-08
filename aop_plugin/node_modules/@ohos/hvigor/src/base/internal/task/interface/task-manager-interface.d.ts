import type { CoreTask } from '../../../external/task/core-task.js';
import { HvigorTask } from '../../../vigor/task/interface/hvigor-task.js';
import { TaskDirectedAcyclicGraph } from '../core/task-directed-acyclic-graph.js';
import { TaskContainer } from './task-container-interface.js';
import { TaskDetails } from './task-details-interface.js';
/**
 * 定义和提供Hvigor Node的管理任务相关的接口,包括注册,查询,创建模块间任务依赖等
 *
 * @since 2022/4/24
 */
export interface TaskManager {
    /**
     * 获取当前Node所有注册了的task
     *
     * @return {CoreTask[]}
     */
    getAllTasks(): CoreTask[];
    getTaskPaths(): string[];
    /**
     * 根据任务名获取当前模块中的task
     *
     * @param {string} name
     * @return {CoreTask | undefined}
     */
    getTaskByName(name: string): CoreTask | undefined;
    /**
     * 通过需要执行的Function和任务名注册到当前Node中
     * 可以通过传入一个TaskDetails类型的对象，直接对Task的基础信息进行赋值
     * eg:
     * project.task(()=>{
     *   // do something
     * },"Test Task")
     *
     * project.task(()=>{
     *   // do something
     * },{
     *   name:"Test Task",
     *   group:"Test Group",
     *   description:"This is a test task"
     * })
     *
     * @param {Function} fn Task的可执行function
     * @param {string|TaskDetails} taskInfo Task的描述信息
     * @return {CoreTask} 注册成功后返回的Task对象
     */
    task(fn: Function, taskInfo?: string | TaskDetails): CoreTask;
    /**
     * 直接通过Task对象注册任务到当前Node中
     *
     * @param {CoreTask} task 待注册的task对象
     * @return {CoreTask} 注册成功后返回的Task对象
     */
    registry(task: CoreTask): CoreTask;
    /**
     * 直接通过Task对象注册任务到当前Node中
     *
     * @param {CoreTask} task 待注册的task对象
     * @return {HvigorTaskNode} 注册成功后返回的Task对象
     */
    registerTask(task: HvigorTask): HvigorTask;
    /**
     * 根据任务名判断是否当前Node中是否存在该Task
     *
     * @param {string} name
     * @return {boolean} true|false
     */
    hasTask(name: string): boolean;
    getTaskDepends(task: string): string[];
    /**
     * 获取当前Node的Task管理容器
     *
     * @return {TaskContainer} task容器对象
     */
    getTaskContainer(): TaskContainer;
    /**
     * 获取当前Node的Task DAG图对象
     *
     * @return {TaskDirectedAcyclicGraph}
     */
    getTaskGraph(): TaskDirectedAcyclicGraph;
    /**
     * 清空当前Node的Task DAG图对象
     */
    clearTaskGraph(): void;
    /**
     * 同时注册多个originalTask依赖的task到Node中,并创建任务之间的依赖
     * 即不需要再依次再对每个depends task 单独注册到task容器中
     *
     * @param {CoreTask} originalTask 源task
     * @param {CoreTask[]} dependsOnTasks 依赖task
     */
    registryDependsOnTask(originalTask: CoreTask, ...dependsOnTasks: CoreTask[]): void;
}
