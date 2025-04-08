import { IncrementalTask } from './incremental-task.js';
export declare abstract class IncrementalExecTask extends IncrementalTask {
    declareExecutionTool(): string;
    declareExecutionCommand(): string;
    declareExecutionEnv(): Map<string, string>;
}
