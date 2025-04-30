/// <reference types="node" />
import { EventEmitter } from 'events';
import { CoreTask } from '../../../external/task/core-task.js';
import { Priority } from '../enum/priority.js';
import { TaskState } from '../enum/task-state.js';
import { SubmitOption } from '../worker-pool/submit-option.js';
import { TCB } from './tcb.js';
import { Work } from './work.js';
/**
 * 内部任务控制块
 * 任务控制块接口的实现类
 *
 * @since 2022/8/12
 */
export declare class ITCB extends EventEmitter implements TCB {
    private workerId;
    private readonly submitTime;
    private startTime;
    private endTime;
    private state;
    private work;
    private cb;
    private cbInput;
    private readonly updateLoc;
    private readonly taskPath;
    private readonly taskName;
    private readonly taskCompletePath;
    private readonly useRetVal;
    private readonly warmUp;
    constructor(work: Work, callback: Function, useRetVal: boolean | undefined, cbInput: unknown[], updateLoc: Function, taskPath: string, taskName: string, taskCompletePath: string, warmUp?: boolean, state?: TaskState);
    /**
     * 当work不允许在WorkerPool中执行时,需要返回一个TaskState为reject的默认TCB
     *
     * @param {CoreTask} task
     * @param {Work} work
     * @param {SubmitOption} submitOption
     * @return {TCB}
     */
    static getDefaultRejectTcb(task: CoreTask, work: Work, submitOption?: SubmitOption): TCB;
    getId(): string;
    getWorkerId(): number | undefined;
    getSubmitTime(): number;
    getStartTime(): number | undefined;
    getEndTime(): number | undefined;
    getState(): TaskState;
    getPriority(): Priority;
    getCallback(): Function;
    getCallbackInput(): unknown[];
    /**
     * 设置workerId
     *
     * @param workerId 待设置的workerId
     */
    setWorkerId(workerId: number): void;
    setState(state: TaskState): boolean;
    /**
     * 设置优先级
     *
     * @param priority 待设置的优先级
     * @returns {boolean} 是否设置成功
     */
    setPriority(priority: Priority): boolean;
    setCallback(callback: Function, callbackInput?: unknown[]): boolean;
    /**
     * 设置开始时间
     *
     * @param startTime 开始时间
     */
    setStartTime(startTime: number): void;
    /**
     * 设置结束时间
     *
     * @param endTime 结束时间
     */
    setEndTime(endTime: number): void;
    getTaskCompletePath(): string;
    getTaskName(): string;
    getTaskPath(): string;
    useReturnVal(): boolean;
    /**
     * 是否是预热任务
     *
     * @returns {boolean} 判断结果
     */
    isWarmUp(): boolean;
}
