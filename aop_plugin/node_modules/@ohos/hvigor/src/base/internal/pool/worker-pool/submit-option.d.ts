import { Priority } from '../enum/priority.js';
/**
 * 提交选项
 *
 * @since 2022/8/23
 */
export type SubmitOption = {
    workInput?: unknown;
    callback?: Function;
    callbackInput?: unknown[];
    priority?: Priority;
    targetWorkers?: number[];
    useReturnVal?: boolean;
    hasSideEffects?: boolean;
    preludeDeps?: string[];
};
