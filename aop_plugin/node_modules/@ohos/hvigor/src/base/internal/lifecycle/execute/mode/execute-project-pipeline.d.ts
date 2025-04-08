import { Project } from '../../../../external/core/hvigor-core-node.js';
import { AbstractExecutePipeline } from './abstract-execute-pipeline.js';
import { TaskExecuteOptions } from './execute-mode-factory.js';
/**
 * 执行工程Project的Pipeline
 *
 * @since 2022/6/20
 */
export declare class ExecuteProjectPipeline extends AbstractExecutePipeline {
    constructor(project: Project, taskOptions: TaskExecuteOptions, shouldCheckTask: boolean);
    findPipeAllNeedExecuteSyncTasks(): string[];
    findPipeAllNeedExecuteTasks(): string[];
}
