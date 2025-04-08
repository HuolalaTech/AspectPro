import { HvigorCoreNode } from '../../../external/core/hvigor-core-node.js';
import { IncrementalTask } from '../../../external/task/incremental-task.js';
import { FileSet } from '../../../internal/snapshot/util/file-set.js';
import { TaskInputValue } from '../../../internal/snapshot/util/task-input-value-entry.js';
import { HvigorTask, HvigorTaskContext } from '../interface/hvigor-task.js';
/**
 * hvigorTask转换为CoreTask
 *
 * @since 2023/12/20
 */
export declare class TransformHvigorTask extends IncrementalTask {
    private logger;
    private _inputs;
    private _inputFiles;
    private _outputFiles;
    protected task: HvigorTask;
    protected taskContext: any;
    protected taskRunContext: HvigorTaskContext;
    constructor(node: HvigorCoreNode, task: HvigorTask);
    initTaskContext(): void;
    initDependency(): void;
    initTaskRun(): void;
    getAction(): Function;
    doTaskAction(): Promise<void>;
    getTaskParam(): HvigorTaskContext;
    declareInputs(): Map<string, TaskInputValue>;
    declareInputFiles(): FileSet;
    declareOutputFiles(): FileSet;
}
