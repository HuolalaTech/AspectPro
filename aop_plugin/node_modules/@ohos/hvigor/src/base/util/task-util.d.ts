import { CoreTaskImpl } from '../external/task/core-task-impl.js';
/**
 * 判断任务是否是增量任务
 *
 * @param task 待判断的任务
 * @returns {boolean} 判断结果
 */
export declare function isIncrementalTask(task: CoreTaskImpl): boolean;
/**
 * 将任务快照中的任务状态置为成功
 *
 * @param task 执行结束和成功的任务
 */
export declare function markTaskExecuteSuccessful(task: CoreTaskImpl): void;
export declare function getAlignTarget(): string | undefined;
