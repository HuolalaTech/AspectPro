/**
 * 对应CacheEntry的基础服务类，定义一些通用的基本方法,比如增删查改
 *
 * @since 2022/9/1
 */
export interface CacheService<T> {
    initialize(): void;
    get(key: string): T | undefined;
    set(key: string, entryContent: T): void;
    remove(key: string): void;
    close(): void;
}
