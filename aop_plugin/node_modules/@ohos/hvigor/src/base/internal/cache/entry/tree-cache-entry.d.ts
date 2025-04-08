import { CacheEntry } from './cache-entry.js';
/**
 * 基于CacheEntry的基本结构封装的一个带有树状结构的容器类
 *
 * @since 2022/9/1
 */
export declare class TreeCacheEntry<E, T> extends CacheEntry<E> {
    private _subEntries;
    constructor(key: string, content: E);
    getSubEntry(key: string): T | undefined;
    setSubEntry(key: string, subEntry: T): void;
    getSubEntries(): T[];
    getSunEntrySize(): number;
    remove(key: string): void;
}
