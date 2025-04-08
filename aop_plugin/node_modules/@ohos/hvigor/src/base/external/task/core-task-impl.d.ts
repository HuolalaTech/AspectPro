import { WorkerPoolDelegator } from '../../internal/pool/worker-pool/worker-delegator.js';
import { TaskExecuteStatus } from '../../internal/task/core/task-execute-status.js';
import { TaskPendingPromises } from '../../internal/task/core/task-pending-promises.js';
import { TaskDetails } from '../../internal/task/interface/task-details-interface.js';
import { HvigorLogger } from '../../log/hvigor-log.js';
import { DurationEvent } from '../../metrics/event/duration-event.js';
import { HvigorCoreNode } from '../core/hvigor-core-node.js';
import { CoreTask } from './core-task.js';
import { Task } from '../../vigor/task/interface/task.js';
import { Queue } from '../../../common/util/queue.js';
import { Stack as CoreStack } from '../../../common/util/stack.js';
/**
 * hvigor task的核心类，包含了基础的成员变量和默认的方法实现
 *
 * @since 2022/4/22
 */
export declare class CoreTaskImpl extends CoreTask {
    protected taskLog: HvigorLogger;
    protected node: HvigorCoreNode;
    protected name: string;
    protected path: string;
    protected dependsTask: string[];
    protected fn: Function;
    protected isEnabled: boolean;
    protected group: string;
    protected description: string;
    private subDurationEventMap;
    private readonly workerDelegator;
    private readonly afterRunFnQueue;
    private readonly beforeRunFnStack;
    taskExecutedStatus: TaskExecuteStatus;
    durationEvent: DurationEvent;
    pendingPromises: TaskPendingPromises;
    constructor(node: HvigorCoreNode, taskDetails: TaskDetails);
    getWorkerPool(): WorkerPoolDelegator;
    execute(): Promise<void>;
    taskShouldDo(): boolean;
    onFailed(error: Error): void;
    setDependsOn(...taskNames: string[]): CoreTask;
    getDependsOn(): string[];
    addDependsOn(taskName: string): CoreTask;
    dependsOn(task: string | CoreTask, node?: string | HvigorCoreNode): CoreTask;
    /**
     * 添加模块间任务依赖时，根据对应的模块名找对应依赖的模块,当前顺序为先模块后工程
     * 由于存在模块名和工程名一样的场景,因此增加一个默认":"时代表project
     *
     * @param {string} nodeName
     * @return {Module | Project}
     * @private
     */
    private findTargetNode;
    private isProject;
    getAction(): Function;
    getNode(): HvigorCoreNode;
    getName(): string;
    getPath(): string;
    getTaskLog(): HvigorLogger;
    getEnabled(): boolean;
    setEnabled(enabled: boolean): CoreTask;
    setDescription(description: string): CoreTask;
    getDescription(): string | undefined;
    getGroup(): string;
    setGroup(group: string): CoreTask;
    doNotTrackState(reason: string): void;
    /**
     * 添加任务子矩阵
     *
     * @param workId
     */
    addSubDurationEvent(workId: string): DurationEvent;
    /**
     * 获取任务子矩阵
     *
     * @param workId
     */
    getSubDurationEvent(workId: string): DurationEvent | undefined;
    /**
     * 根据hvigorNode以及task name来获取task的path
     *
     * @param {DefaultNodeImpl} hvigorNode
     * @param {string} taskName
     * @returns {string}
     */
    private static createTaskPath;
    /**
     * 获取当前task对外暴露的HvigorTask对象
     */
    getHvigorTask(): Task | undefined;
    beforeRun(fn: Function): void;
    afterRun(fn: Function): void;
    getAfterRunQueue(): Queue<Function>;
    getBeforeRunStack(): CoreStack<Function>;
    executeBeforeRun(): void;
    executeAfterRun(): void;
}
