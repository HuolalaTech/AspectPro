import { TaskInput, TaskOutput } from './input-output.js';
/**
 * HvigorTask声明
 */
export interface HvigorTask {
    /**
     * 任务名称，全局唯一
     */
    name: string;
    /**
     * task 上下文
     */
    context?: (() => any) | any;
    /**
     * Task 定义增量输入接口
     *
     * @param input
     */
    input?: (input: TaskInput) => void;
    /**
     * task 定义增量输出接口
     *
     * @param output
     */
    output?: (output: TaskOutput) => void;
    /**
     * task beforeRun 在run方法之前执行
     *
     * @param taskContext
     */
    beforeRun?: (taskContext: HvigorTaskContext) => void | Promise<void>;
    /**
     * 增量输入输出
     *
     * @param taskContext
     */
    afterRun?: (taskContext: HvigorTaskContext) => void | Promise<void>;
    /**
     * Task执行逻辑，执行时调用此方法
     *
     * @param taskContext
     */
    run: (taskContext: HvigorTaskContext) => void | Promise<void>;
    /**
     * 当前Task依赖的Task列表
     * 前置依赖的tasks, 先执行前置依赖，再执行此task
     */
    dependencies?: (() => string[]) | string[];
    /**
     * 后置依赖的tasks, 执行后置依赖前，必须先执行此task
     */
    postDependencies?: (() => string[]) | string[];
}
/**
 * hvigorTask上下文信息
 */
export interface HvigorTaskContext {
    /**
     * 当前编译的模块的名称
     */
    moduleName: string;
    /**
     * 当前编译的模块的路径
     */
    modulePath: string;
}
/**
 * hvigorTask上下文信息
 */
export interface HvigorTaskContext {
    /**
     * 当前编译的模块的名称
     */
    moduleName: string;
    /**
     * 当前编译的模块的路径
     */
    modulePath: string;
}
/**
 * 早期提供的接口类型HvigorPluginTask，现已废弃与HvigorTask完全兼容
 * @deprecated 此接口类型名称已废弃，不再推荐使用，请使用HvigorTask替代
 */
export type HvigorPluginTask = HvigorTask;
