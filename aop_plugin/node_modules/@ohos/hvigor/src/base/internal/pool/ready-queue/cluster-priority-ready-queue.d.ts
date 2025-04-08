import { Heap } from '../../../../common/util/heap.js';
import { Work } from '../model/work.js';
import { ReadyQueue } from './ready-queue.js';
/**
 * 按worker分组的优先就绪队列
 *
 * @since 2022/8/24
 */
export declare class ClusterPriorityReadyQueue implements ReadyQueue {
    private heaps;
    constructor(num: number);
    clear(): void;
    empty(): boolean;
    pop(): Work | undefined;
    push(work: Work): void;
    update(work: Work): void;
    /**
     * 获取一个worker对应的工作单元堆
     *
     * @param workerId worker的id
     * @returns {Heap<Work> | undefined} 对应的工作单元堆
     */
    getWorkHeap(workerId: number): Heap<Work> | undefined;
    /**
     * 获取第一个尚未执行的工作单元
     *
     * @param workerId worker的id
     * @returns {Work | undefined} 第一个尚未执行的工作单元
     */
    getFirstWaitingWork(workerId: number): Work | undefined;
    pushWork(work: Work, workerId: number): void;
}
