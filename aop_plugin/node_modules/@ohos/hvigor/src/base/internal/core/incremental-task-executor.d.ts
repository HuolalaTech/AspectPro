import { CoreTaskImpl } from '../../external/task/core-task-impl.js';
/**
 * 声明为Incremental,并实现了相关增量方法的task的执行流程
 *
 * @param {CoreTaskImpl} coreTask
 */
export declare function doIncrementalTask(coreTask: CoreTaskImpl): Promise<void>;
