import { Project } from '../../../../external/core/hvigor-core-node.js';
import { AbstractExecutePipeline } from './abstract-execute-pipeline.js';
import { TaskExecuteOptions } from './execute-mode-factory.js';
/**
 * 执行mode为undefined状态下的Pipeline
 *
 * @since 2022/6/20
 */
export declare class ExecuteUndefinedPipeline extends AbstractExecutePipeline {
    private projectPipeLine;
    private modulePipeline;
    constructor(project: Project, taskOptions: TaskExecuteOptions);
    findPipeAllNeedExecuteSyncTasks(): string[];
    findPipeAllNeedExecuteTasks(): string[];
}
