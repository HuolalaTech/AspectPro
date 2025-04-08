import { CoreTaskImpl } from '../../../../external/task/core-task-impl.js';
/**
 * 任务的单个Work执行失败后触发的事件监听
 *
 * @since 2022/9/1
 */
export declare const onWorkFailed: (task: CoreTaskImpl, error: Error) => void;
/**
 * 整个任务执行结束后触发的事件监听
 *
 * @since 2022/9/1
 */
export declare const onTaskFinished: (task: CoreTaskImpl) => void;
/**
 * 整个任务被disabled后,执行结束后触发的事件监听
 *
 * @since 2022/9/1
 */
export declare const onTaskFailed: (task: CoreTaskImpl, error: Error) => void;
/**
 * 整个任务被disabled后,执行结束后触发的事件监听
 *
 * @since 2022/9/1
 */
export declare const onTaskDisabled: (task: CoreTaskImpl) => void;
/**
 * 整个任务增量生效Up-to-date,不执行任务时触发的事件监听
 *
 * @since 2022/9/1
 */
export declare const onTaskUpToDated: (task: CoreTaskImpl) => void;
