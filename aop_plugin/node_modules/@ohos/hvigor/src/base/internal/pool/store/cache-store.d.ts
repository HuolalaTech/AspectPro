export declare class CacheStore {
    private caches;
    private lruCache;
    private readonly name;
    private readonly pinned;
    constructor(name: string, lruCache: LRUCache, pinned?: boolean);
    getCache(key: string): any;
    get(key: string): any;
    set(key: string, value: any): CacheStore;
    setCache(key: string, value: any, pinned?: boolean): CacheStore;
    hasCache(key: string): boolean;
    clear(): void;
    delete(key: string): boolean;
    size(): number;
    keys(): IterableIterator<string>;
    private completeKey;
    private parseCompleteKey;
}
export interface CacheStoreManagerOption {
    capacity?: number;
    ttl?: number;
}
export declare class CacheStoreManager {
    private cacheStores;
    private readonly lruCache;
    constructor(cacheStoreManagerOption?: CacheStoreManagerOption);
    mount(key: string, pinned?: boolean): CacheStore;
    unmount(key: string): boolean;
    clear(): void;
    size(): number;
    keys(): IterableIterator<string>;
    cacheItemSize(): number;
}
declare class LRUCache {
    private cnt;
    private readonly capacity;
    private key2node;
    private readonly head;
    private readonly tail;
    private readonly ttl;
    constructor(cacheStoreManagerOption?: CacheStoreManagerOption);
    access(key: string): void;
    set(key: string): string | undefined;
    delete(key: string): void;
    private moveToHead;
    private eliminate;
    clear(): void;
    getTTL(): number | undefined;
}
export {};
