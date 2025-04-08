export declare const TASK_EXECUTE_STATUS: {
    BLOCKED: number;
    PENDING: number;
    RUNNING: number;
    END: number;
    CANCELLED: number;
    FAILED: number;
};
/**
 * 用于保存一些任务执行状态的信息
 *
 * @since 2022/9/1
 */
export declare class TaskExecuteStatus {
    private _state;
    private _taskBeginTime;
    private _workerTimePeriod;
    private _isUpToDate;
    unTrackStateReason: string | undefined;
    constructor();
    setState(state: number): void;
    getState(): number;
    getTaskBeginTime(): [number, number] | undefined;
    setIsUpToDate(upToDate: boolean): void;
    isUpToDate(): boolean;
    setWorkerTimePeriod(time: [number, number]): void;
    getWorkerTimePeriod(): [number, number][];
}
