/// <reference types="node" />
import { Worker, WorkerOptions } from 'worker_threads';
import { CoreTaskImpl } from '../../../external/task/core-task-impl.js';
/**
 * 用于watch任务的线程管理
 *
 * @since 2022/12/7
 */
declare class WatchWorker {
    private readonly workerMap;
    constructor();
    getWorker(id: number): Worker | undefined;
    createWorker(task: CoreTaskImpl, filename: string, hasCustomTerminate: boolean, callback: Function, options?: WorkerOptions): string;
    beforeTerminate(id: number): void;
    private terminateWorker;
    /**
     * 监听主线程传递的来自socket的信息，传递给对应的worker线程
     * @private
     */
    private addListenersOnSessionManager;
}
/**
 * 普通worker，编译完成后直接terminate。
 * 目前用于预览时级联编译entry所依赖的所有hsp。
 */
declare class NormalWorker {
    private static runningThreadCnt;
    private static workQueue;
    private static promiseMap;
    private readonly maxWorkerNum;
    createWorker(task: CoreTaskImpl, filename: string, hasCustomTerminate: boolean, callback: Function, options?: WorkerOptions): string;
    reset(): void;
    private executeWorker;
}
export declare const watchWorker: WatchWorker;
export declare const normalWorker: NormalWorker;
export {};
