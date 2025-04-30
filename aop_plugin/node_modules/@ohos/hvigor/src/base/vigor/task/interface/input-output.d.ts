import { FileSet } from '../../../internal/snapshot/util/file-set.js';
import { TaskInputValue } from '../../../internal/snapshot/util/task-input-value-entry.js';
export declare class TaskInput {
    private declareInputs;
    private declareInputFiles;
    constructor(declareInputs: Map<string, TaskInputValue>, declareInputFiles: FileSet);
    file(path: string): TaskInput;
    files(paths: string[]): TaskInput;
    property(key: string, value: TaskInputValue): TaskInput;
}
export declare class TaskOutput {
    private declareOutputFiles;
    constructor(declareOutputFiles: FileSet);
    file(path: string): TaskOutput;
    files(paths: string[]): TaskOutput;
}
