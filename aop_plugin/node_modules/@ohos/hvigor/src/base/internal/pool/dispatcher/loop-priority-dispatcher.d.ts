import { LogServiceImpl } from '../log-collection/log-service-impl.js';
import { ReadyQueue } from '../ready-queue/ready-queue.js';
import { WorkerManager } from '../worker-manager/worker-manager.js';
import { Dispatcher } from './dispatcher.js';
/**
 * 每次遍历worker进行分发的优先级分发器
 *
 * @since 2022/8/24
 */
export declare class LoopPriorityDispatcher implements Dispatcher {
    private failedAttempts;
    dispatch(logService: LogServiceImpl, readyQueue: ReadyQueue, workerManager: WorkerManager, workerId?: number): boolean;
    private dispatchWithGivenWorker;
}
