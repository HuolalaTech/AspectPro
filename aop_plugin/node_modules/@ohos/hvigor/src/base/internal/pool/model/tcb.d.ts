import { Priority } from '../enum/priority.js';
import { TaskState } from '../enum/task-state.js';
/**
 * 任务控制块
 * 任务控制块与工作单元一一对应，使得外部可以通过任务控制块操纵工作单元
 *
 * @since 2022/8/26
 */
export interface TCB {
    /**
     * 获取id
     *
     * @returns {string} 任务控制块id
     */
    getId(): string;
    /**
     * 获取worker的id
     *
     * @returns {number | undefined} worker的id
     */
    getWorkerId(): number | undefined;
    /**
     * 获取提交时间
     *
     * @returns {number} 任务提交时间
     */
    getSubmitTime(): number;
    /**
     * 获取执行开始时间
     *
     * @returns {number | undefined} 任务执行开始时间
     */
    getStartTime(): number | undefined;
    /**
     * 获取执行结束时间
     *
     * @returns {number | undefined} 任务执行结束时间
     */
    getEndTime(): number | undefined;
    /**
     * 获取任务状态
     *
     * @returns {TaskState} 任务状态
     */
    getState(): TaskState;
    /**
     * 获取优先级
     *
     * @returns {Priority} 任务优先级
     */
    getPriority(): Priority;
    /**
     * 获取回调函数
     *
     * @returns {Function} 任务回调函数
     */
    getCallback(): Function;
    /**
     * 获取回调函数的输入
     *
     * @returns {unknown[]} 回调函数输入数据
     */
    getCallbackInput(): unknown[];
    /**
     * 设置优先级
     *
     * @param priority 待设置的优先级
     * @returns {boolean} 是否设置成功
     */
    setPriority(priority: Priority): boolean;
    /**
     * 设置回调函数
     *
     * @param callback 待设置的回调函数
     * @param callbackInput 待设置的回调函数的输入
     * @returns {boolean} 是否设置成功
     */
    setCallback(callback: Function, callbackInput?: unknown[]): boolean;
    /**
     * 获取任务路径
     *
     * @returns {string} 任务路径
     */
    getTaskPath(): string;
    /**
     * 获取任务名
     *
     * @returns {string} 任务名
     */
    getTaskName(): string;
    /**
     * 获取任务完整路径，包含任务路径和任务名
     *
     * @returns {string} 任务完整路径
     */
    getTaskCompletePath(): string;
    /**
     * 回调函数是否使用工作单元的返回值作为输入
     *
     * @returns {boolean} 判断结果
     */
    useReturnVal(): boolean;
}
