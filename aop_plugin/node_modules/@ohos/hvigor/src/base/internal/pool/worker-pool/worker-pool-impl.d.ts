import { CoreTask } from '../../../external/task/core-task.js';
import { CoreTaskImpl } from '../../../external/task/core-task-impl.js';
import { LogType } from '../enum/log-type.js';
import { PoolState } from '../enum/pool-state.js';
import { Log } from '../log-collection/log.js';
import { TCB } from '../model/tcb.js';
import { PoolConfig } from './pool-config.js';
import { SubmitOption } from './submit-option.js';
import { WorkerPool } from './worker-pool.js';
/**
 * 工作池的实现类
 *
 * @since 2022/8/12
 */
export declare class WorkerPoolImpl implements WorkerPool {
    private static instance;
    private readonly readyQueue;
    private dispatcher;
    private readonly workerManager;
    private readonly logService;
    private state;
    private resident;
    private readonly poolConfig;
    private constructor();
    setResident(resident: boolean): void;
    isResident(): boolean;
    getMaxPoolNum(): number;
    getMinPoolNum(): number;
    /**
     * 获取工作池的实例
     *
     * @param poolConfig 池配置
     * @returns {WorkerPool} 工作池实例
     */
    static getInstance(poolConfig: PoolConfig): WorkerPool;
    getLog(type: LogType): Set<Log> | undefined;
    clearLog(type?: LogType): void;
    getState(): PoolState;
    setMaxIdleTime(maxIdleTime: number): void;
    setRecycleInterval(recycleInterval: number): void;
    setErrorCallback(errorCallback: Function): void;
    setState(state: PoolState): void;
    warmUp(workPath: string): boolean;
    submit(task: CoreTask, workPath: string, submitOption?: SubmitOption): TCB;
    /**
     * 过滤出合法的worker集合
     *
     * @param targetWorkers 待过滤的worker集合
     * @returns {number[]} 过滤结果
     */
    private filterTargetWorkers;
    private submitWork;
    /**
     * 当用户提交work时，需要判断是否允许在WorkerPool中执行该work
     * 需要满足:
     * 1.用户开启并行能力，默认开启
     * 2.WorkerPool初始化完成
     * 3.指定的TargetWorker是符合要求的
     *
     * @param {Work} work
     * @return {boolean}
     * @private
     */
    private workSubmissionCanBeAccepted;
    private initTcb;
    recordDurationEvent(coreTask: CoreTaskImpl, workId: string, tcb: TCB, result: boolean): void;
    private updateTid;
    terminate(): Promise<boolean>;
    recycle(): Promise<boolean>;
    /**
     * 检查初始化后池状态是否正常
     *
     * @returns {boolean} 检查结果
     */
    private checkPoolState;
    private getPoolConfig;
}
