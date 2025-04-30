import { CoreTask } from '../../../external/task/core-task.js';
import { Task } from '../interface/task.js';
/**
 * 对外提供的Task视图接口实现
 */
export declare class TaskImpl implements Task {
    private readonly task;
    constructor(task: CoreTask);
    getDependencies(): string[];
    getName(): string;
    setEnable(enable: boolean): void;
    beforeRun(fn: Function): void;
    afterRun(fn: Function): void;
}
