import { CoreTaskImpl } from '../../../external/task/core-task-impl.js';
import { TaskSnapshot } from '../../snapshot/core/task-snapshot.js';
/**
 * 增量Task的一个中间代理类，用于在任务实际执行前进行一些增量检查,执行后,刷新增量缓存之类的
 *
 * @since 2022/9/1
 */
export declare class TaskProxy {
    private readonly project;
    private readonly task;
    private readonly taskNode;
    private readonly cacheTaskSnapShot;
    private projectCacheService;
    private snapshotGeneratorService;
    private snapshotComparatorService;
    private curTaskSnapShot;
    private curInputFileSnapShotMap;
    constructor(task: CoreTaskImpl);
    /**
     * 判断单个Task是否发生变化
     *
     * @return {boolean}
     * @private
     */
    private isTaskChange;
    /**
     * 判断单个文件是否发生变化
     *
     * @param {string} filePath
     * @param options
     * @return {[BasicFileSnapshot, boolean]}
     * @private
     */
    private getFileCompareResult;
    /**
     * 判断任务设置的增量输入文件是否发生变化
     *
     * @return {boolean}
     * @private
     */
    private isTaskInputFilesChange;
    /**
     * 判断任务设置的增量输出文件是否发生变化
     *
     * @return {boolean}
     * @private
     */
    private isTaskOutputFilesChange;
    /**
     * 执行任务之前的前置任务，比如增量的检查
     *
     * @return {boolean} true/false true->不需要重新执行,false->需要重新执行
     */
    preExecute(): boolean;
    /**
     * 执行任务的实际TaskAction逻辑
     */
    execute(): Promise<void>;
    /**
     * 任务执行成功后的刷新缓存
     */
    postExecute(): void;
    private updateTaskOutputFilesSnapShot;
    private updateTaskInputFilesSnapshot;
    private updateTaskSnapShot;
    getCurTaskSnapShot(): TaskSnapshot | undefined;
}
