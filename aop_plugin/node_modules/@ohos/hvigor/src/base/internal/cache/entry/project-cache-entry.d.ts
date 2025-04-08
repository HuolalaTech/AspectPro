import { NodeCacheEntry } from './node-cache-entry.js';
import { TreeCacheEntry } from './tree-cache-entry.js';
/**
 * 包含多个NodeCacheEntry,对应一个Hvigor工程结构的对象
 *
 * @since 2022/9/1
 */
export declare class ProjectCacheEntry extends TreeCacheEntry<NodeCacheEntry, NodeCacheEntry> {
    constructor(key: string, content: NodeCacheEntry);
}
