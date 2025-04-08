import { CoreTask } from '../../../external/task/core-task.js';
import { LogType } from '../enum/log-type.js';
import { PoolState } from '../enum/pool-state.js';
import { Log } from '../log-collection/log.js';
import { TCB } from '../model/tcb.js';
import { SubmitOption } from './submit-option.js';
/**
 * 工作池代理器
 * 内置于task的对象，提供对工作池功能的间接访问
 *
 * @since 2022/8/31
 */
export declare class WorkerPoolDelegator {
    private workerPool;
    private static isActive;
    private static needWarmUp;
    constructor();
    warmUp(warmUpPath: string): void;
    submit(task: CoreTask, workPath: string, submitOption?: SubmitOption): TCB;
    terminate(): Promise<boolean>;
    getState(): PoolState;
    setState(state: PoolState): void;
    setRecycleInterval(recycleInterval: number): void;
    setMaxIdleTime(maxIdleTime: number): void;
    setErrorCallback(errorCallback: Function): void;
    getLog(type: LogType): Set<Log> | undefined;
    clearLog(type?: LogType): void;
    getMaxPoolNum(): number;
    getMinPoolNum(): number;
    setResident(resident: boolean): void;
    isActive(): boolean;
}
