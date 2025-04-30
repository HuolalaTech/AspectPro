import { BasicFileSnapshot } from '../../snapshot/core/filesystem-snapshot.js';
import { CacheEntry } from './cache-entry.js';
/**
 * 包装文件缓存的实例CacheEntry
 *
 * @since 2022/9/1
 */
export declare class FileSnapShotCacheEntry extends CacheEntry<BasicFileSnapshot> {
    constructor(key: string, fileSnapShot: BasicFileSnapshot);
}
