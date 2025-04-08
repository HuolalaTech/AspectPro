import { CacheEntry } from '../entry/cache-entry.js';
import { CacheService } from './cache-service.js';
/**
 * CacheService的一个基本默认实现,可以根据容器中的具体对象,重载不同的方法实现
 *
 * @since 2022/9/1
 */
export declare abstract class DefaultCacheService<T> implements CacheService<T> {
    protected cacheEntries: Map<string, CacheEntry<T>>;
    protected constructor();
    clone(cacheService: DefaultCacheService<T>): void;
    /**
     * 初始化函数,默认只需要一个空的map,子类需要根据不同场景进行重载
     */
    initialize(): void;
    close(): void;
    get(key: string): T | undefined;
    remove(key: string): void;
    size(): number;
    keys(): string[];
    /**
     * Service中保存的是容器对象的Map,该方法提供自动拆包,将容器中的内容提取并返回一个对应的Map<string,T>
     *
     * @return {Map<string, T>}
     */
    getCacheEntryContentMap(): Map<string, T>;
    /**
     * Set方法需要根据具体场景进行实例化
     *
     * @param {string} key
     * @param {T} entryContent
     * @return {CacheEntry<T>}
     */
    abstract set(key: string, entryContent: T): CacheEntry<T>;
}
