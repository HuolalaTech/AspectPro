/// <reference types="node" />
import { Worker } from 'worker_threads';
import { WorkerState } from '../enum/worker-state.js';
import { Work } from '../model/work.js';
export interface TaskInfo {
    hasSideEffects: boolean;
    preludeDeps: string[];
}
/**
 * 管理单个worker的状态
 *
 * @since 2022/8/15
 */
export declare class HWorker {
    private worker;
    private readonly id;
    private state;
    private lastBusyTime;
    private curWorkId;
    private melted;
    private curTaskInfo;
    private cacheSize;
    constructor(worker: Worker, id: number);
    /**
     * 获取worker状态
     *
     * @returns {WorkerState} worker状态
     */
    getState(): WorkerState;
    /**
     * 获取该worker上次工作结束时间
     *
     * @returns {number} 上次工作结束时间
     */
    getLastBusyTime(): number;
    /**
     * 获取该worker的id
     *
     * @returns {number} worker的id
     */
    getId(): number;
    /**
     * 终止worker
     *
     * @param callback 终止worker后的回调函数
     */
    terminate(callback: Function): void;
    /**
     * 设置该worker的状态
     *
     * @param state 待设置的状态
     */
    setState(state: WorkerState): void;
    /**
     * 设置该worker上次工作结束时间
     *
     * @param time 上次工作结束时间
     */
    setLastBusyTime(time: number): void;
    /**
     * 执行任务单元
     *
     * @param work 待执行的任务单元
     * @returns {boolean} 是否执行
     */
    doWork(work: Work): boolean;
    /**
     * 获取该worker当前正在执行的工作单元id
     */
    getCurWorkId(): string | undefined;
    /**
     * 将当前正在执行的工作单元id设为undefined
     */
    cancelCurWorkId(): void;
    isMeltdown(): boolean;
    meltdown(): void;
    /**
     * 获取该线程当前执行的任务单元的信息
     *
     * @returns {TaskInfo | undefined} 当前执行的任务单元的信息
     */
    getCurTaskInfo(): TaskInfo | undefined;
    /**
     * 该线程当前是否存在缓存内容
     */
    hasCache(): boolean;
    /**
     * 更新此线程当前的缓存项数量
     *
     * @param cacheSize 当前缓存项的数量
     */
    updateCacheSize(cacheSize: number): void;
    sendMessageToWorker(message: any): void;
}
