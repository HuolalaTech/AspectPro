import { Work } from '../model/work.js';
/**
 * worker管理器
 * 管理每个worker的状态，管理工作者的生成和回收，并维护工作者ID与工作者实例的映射关系
 *
 * @since 2022/8/15
 */
export interface WorkerManager {
    /**
     * 创建worker
     *
     * @param workerId 待创建的worker的id
     * @param preludeDeps 在预热该worker时需要加载的依赖
     * @returns {boolean} 创建结果
     */
    createWorker(workerId?: number, preludeDeps?: string[]): boolean;
    /**
     * 判断是否存在可用的worker
     *
     * @returns {boolean} 判断结果
     */
    hasAvailableWorkers(): boolean;
    /**
     * 返回目前可用的worker
     *
     * @returns {number[]} 可用worker的集合
     */
    getAvailableWorkers(): number[];
    /**
     * 获取最大worker数量
     *
     * @returns {number} 最大worker数量
     */
    getMaxPoolNum(): number;
    /**
     * 获取最小worker数量
     *
     * @returns {number} 最小worker数量
     */
    getMinPoolNum(): number;
    /**
     * 判断是否是忙碌的worker
     *
     * @param workerId 待判断的worker的id
     * @returns {boolean} 判断结果
     */
    isBusyWorker(workerId: number): boolean;
    /**
     * 判断是否是空闲的worker
     *
     * @param workerId 待判断的worker的id
     * @returns {boolean} 判断结果
     */
    isIdleWorker(workerId: number): boolean;
    /**
     * 判断是否是已回收的worker
     *
     * @param workerId 待判断的worker的id
     * @returns {boolean} 判断结果
     */
    isRecycledWorker(workerId: number): boolean;
    /**
     * 回收空闲时间过长的worker
     */
    recycle(): void;
    /**
     * 清除所有worker
     *
     * @param callback 清除完毕后的回调函数
     */
    clear(callback: Function): void;
    /**
     * 清理非常驻或无内存缓存的worker
     *
     * @param callback
     */
    cleanUp(callback: () => void): void;
    /**
     * 执行工作单元
     *
     * @param work 待执行的工作单元
     * @param callback 执行完毕后的回调函数
     * @param callbackInput 执行完毕后的回调函数的输入
     * @param workerId 该工作单元被分配的worker的id
     * @returns {boolean} 是否成功发送到worker
     */
    doWork(work: Work, callback: Function, callbackInput: unknown[], workerId: number): boolean;
    /**
     * 设置池回收的间隔时间
     *
     * @param recycleInterval 待设置的间隔时间
     */
    setRecycleInterval(recycleInterval: number): void;
    /**
     * 设置worker的最大空闲时间
     *
     * @param maxIdleTime 待设置的最大空闲时间
     */
    setMaxIdleTime(maxIdleTime: number): void;
    /**
     * 设置work执行失败的回调
     * @param {Function} errorCallback
     */
    setErrorCallback(errorCallback: Function): void;
    /**
     * 线程池容量是否已满
     *
     * @returns {boolean} 判断结果
     */
    isFull(): boolean;
}
