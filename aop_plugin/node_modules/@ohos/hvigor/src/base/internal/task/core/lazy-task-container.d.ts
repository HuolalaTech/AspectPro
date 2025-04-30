import { CoreTask } from '../../../external/task/core-task.js';
import { TaskContainer } from '../interface/task-container-interface.js';
import { TaskDetails } from '../interface/task-details-interface.js';
export type TaskCreation = {
    provider: () => CoreTask;
    depends: string[];
    details: TaskDetails;
};
export declare class LazyTaskContainer implements TaskContainer {
    private readonly _moduleName;
    private _tasks;
    private _lazyTasks;
    constructor(moduleName: string);
    registerTask(creation: TaskCreation): void;
    addTask(task: CoreTask): void;
    deleteTask(taskName: string): boolean;
    hasTask(taskName: string): boolean;
    getLazyTask(task: string): TaskCreation | undefined;
    getTask(task: string): CoreTask | undefined;
    /**
     * 获取所有任务
     * 仅返回已初始化的task
     */
    getAllTasks(): CoreTask[];
    getTaskPaths(): string[];
    findTask(taskName: string): CoreTask | undefined;
    getTaskDepends(taskPath: string): string[];
    clearTasks(): void;
    private initializeLazyTask;
    private mergeDepends;
}
