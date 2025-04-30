import { HvigorCoreNode, Project } from '../../../../external/core/hvigor-core-node.js';
import type { TaskExecuteOptions } from './execute-mode-factory.js';
/**
 * 根据不用场景创建的pileLine的抽象公共类
 *
 * @since 2022/6/20
 */
export declare abstract class AbstractExecutePipeline {
    protected project: Project;
    protected taskOptions: TaskExecuteOptions;
    protected shouldCheckTask: boolean;
    protected toRunTask: string[];
    protected constructor(project: Project, taskOptions: TaskExecuteOptions);
    /**
     * 开始执行该pipeline
     */
    startPipeline(): Promise<void>;
    /**
     * 返回各模块所需执行的任务path
     *
     * @param nodes
     * @protected
     */
    protected findAllNeedExecuteTasksForNodes(nodes: HvigorCoreNode[]): string[];
    /**
     * 初始化一个Node的打点数据
     */
    recordTraceData(): void;
    /**
     * 执行一个Mode的Task
     */
    private executeTask;
    abstract findPipeAllNeedExecuteSyncTasks(): string[];
    abstract findPipeAllNeedExecuteTasks(): string[];
}
