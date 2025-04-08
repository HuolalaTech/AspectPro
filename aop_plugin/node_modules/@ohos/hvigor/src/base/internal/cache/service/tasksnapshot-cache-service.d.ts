import { TaskSnapshot } from '../../snapshot/core/task-snapshot.js';
import { TaskSnapShotCacheEntry } from '../entry/tasksnapshot-cache-entry.js';
import { DefaultCacheService } from './default-cache-service.js';
/**
 * 提供获取任务缓存快照的统一服务接口
 *
 * @since 2022/9/1
 */
export declare class TaskSnapShotCacheService extends DefaultCacheService<TaskSnapshot> {
    private readonly _taskSnapShotCachePath;
    constructor(taskSnapShotCachePath: string);
    set(key: string, entryContent: TaskSnapshot): TaskSnapShotCacheEntry;
    initialize(): void;
}
