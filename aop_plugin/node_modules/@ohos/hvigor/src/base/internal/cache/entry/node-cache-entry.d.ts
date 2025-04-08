import { TaskSnapShotCacheEntry } from './tasksnapshot-cache-entry.js';
import { TreeCacheEntry } from './tree-cache-entry.js';
/**
 * 包含多个TaskCacheEntry,对应一个HvigorNode的结构的对象
 *
 * @since 2022/9/1
 */
export declare class NodeCacheEntry extends TreeCacheEntry<undefined, TaskSnapShotCacheEntry> {
    constructor(key: string, content?: undefined);
}
