import { Project } from '../../../../external/core/hvigor-core-node.js';
import { AbstractExecutePipeline } from './abstract-execute-pipeline.js';
import { TaskExecuteOptions } from './execute-mode-factory.js';
/**
 * 执行所有Module的Pipeline
 *
 * @since 2022/6/20
 */
export declare class ExecuteModulePipeline extends AbstractExecutePipeline {
    private executeModules;
    constructor(project: Project, taskOptions: TaskExecuteOptions);
    /**
     * 根据命令行和工程的配置，初始化-m 为module下时需要执行的所有模块集合
     *
     * @private
     */
    private init;
    findPipeAllNeedExecuteSyncTasks(): string[];
    findPipeAllNeedExecuteTasks(): string[];
    recordTraceData(): void;
}
