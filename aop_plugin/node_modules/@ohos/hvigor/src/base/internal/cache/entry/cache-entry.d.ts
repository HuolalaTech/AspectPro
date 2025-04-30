/**
 * 基础容器类,可以将不同类型的T包装起来，并提供一些通用方法和建立容器之间的关系
 *
 * @since 2022/9/1
 */
export declare class CacheEntry<T> {
    private readonly _key;
    private readonly _content;
    constructor(key: string, content: T);
    getKey(): string;
    getContent(): T;
}
