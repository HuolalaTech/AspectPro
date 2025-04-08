import { FileSet } from '../../internal/snapshot/util/file-set.js';
import { TaskInputValue } from '../../internal/snapshot/util/task-input-value-entry.js';
import { DefaultTask } from './default-task.js';
export declare abstract class IncrementalTask extends DefaultTask {
    declareInputs(): Map<string, TaskInputValue>;
    declareInputFiles(): FileSet;
    declareOutputFiles(): FileSet;
    /**
     * 无论是否增量，总是执行此方法
     */
    beforeAlwaysAction(): Promise<void>;
}
