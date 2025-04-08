/**
 * 根据DAG图,将传入的参数递归的执行所有任务和其依赖
 *
 * @since 2022/4/22
 */
export declare class TaskExecutor {
    /**
     * 通过指定task的path，执行对应的任务
     *
     * @param {string[]} taskPaths 需要执行的所有任务路径
     */
    initTasks(taskPaths: string[]): Promise<void>;
}
export declare const taskExecutorInst: TaskExecutor;
