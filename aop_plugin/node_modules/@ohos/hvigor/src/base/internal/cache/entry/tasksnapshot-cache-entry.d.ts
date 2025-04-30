import { TaskSnapshot } from '../../snapshot/core/task-snapshot.js';
import { CacheEntry } from './cache-entry.js';
/**
 * 包装TaskSnapShot的实例
 *
 * @since 2022/9/1
 */
export declare class TaskSnapShotCacheEntry extends CacheEntry<TaskSnapshot> {
    constructor(key: string, taskSnapShot: TaskSnapshot);
}
