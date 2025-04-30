import { Work } from '../model/work.js';
/**
 * 就绪队列
 * 以一定的数据结构存储目前等待被执行的工作单元，向外部提供对工作单元进行增/删/改/查的能力
 *
 * @since 2022/8/12
 */
export interface ReadyQueue {
    /**
     * 判断是否为空
     *
     * @returns {boolean} 判断结果
     */
    empty(): boolean;
    /**
     * 工作单元出队
     *
     * @returns {Work | undefined} 出队的工作单元
     */
    pop(): Work | undefined;
    /**
     * 工作单元入队
     *
     * @param work 待入队的工作单元
     */
    push(work: Work): void;
    /**
     * 更新工作单元
     *
     * @param work 待更新的工作单元
     */
    update(work: Work): void;
    /**
     * 清空队列
     */
    clear(): void;
}
