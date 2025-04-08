/**
 * 任务的pendingPromises，用于保存当前任务的promise
 *
 * @since 2023/12/14
 */
export declare class TaskPendingPromises {
    private promiseSet;
    /**
     * 给当前任务添加promise，可添加多个，只有当全部被添加的promise状态都变更为fulfilled，当前任务才算执行成功
     * 可以基于promisify来改造你的异步逻辑，并调用此方法加入promise，内部会检测promise的状态变更来调用相对应的逻辑
     * 同时，你也可以将worker和child_process进行promisify来提高并发处理能力
     *
     * const promise = new Promise((resolve, reject) => {
     *     const worker = new Worker(filename);
     *     worker.on('close', resolve);
     *     worker.on('error', reject);
     * });
     *
     * task.pendingPromises.add(promise);
     *
     * @param promise
     */
    add(promise: Promise<unknown>): void;
    /**
     * 获取当前任务的全部promise
     */
    get(): Promise<unknown>[];
    /**
     * 清空当前任务的promise
     */
    clear(): void;
}
