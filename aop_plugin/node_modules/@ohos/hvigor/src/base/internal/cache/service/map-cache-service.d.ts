/**
 * CacheService的一个Map类型实现,可以根据容器中的具体对象,重载不同的方法实现
 *
 * @since 2023/5/16
 */
export declare abstract class MapCacheService<T> {
    protected cacheEntryMap: Map<string, T>;
    protected constructor();
    /**
     * 初始化函数,默认只需要一个空的map,子类需要根据不同场景进行重载
     */
    initialize(): void;
    close(): void;
    get(key: string): T | undefined;
    remove(key: string): void;
    size(): number;
    /**
     * Set方法需要根据具体场景进行实例化
     *
     * @param {T} entry
     */
    abstract add(entry: T): void;
}
