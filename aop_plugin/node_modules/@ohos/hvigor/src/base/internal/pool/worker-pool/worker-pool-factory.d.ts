import { WorkerPoolType } from '../enum/worker-pool-type.js';
import { PoolConfig } from './pool-config.js';
import { WorkerPool } from './worker-pool.js';
/**
 * 工作池工厂
 * 创建不同类型的工作池
 *
 * @since 2022/8/17
 */
export declare class WorkerPoolFactory {
    static getWorkerPool(type: WorkerPoolType, poolConfig: PoolConfig): WorkerPool | undefined;
    static getDefaultWorkerPool(): WorkerPool;
}
