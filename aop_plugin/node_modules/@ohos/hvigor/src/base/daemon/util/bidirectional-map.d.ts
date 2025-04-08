/**
 * 双向映射表，严格按照一对一映射关系
 */
export declare class BidirectionalMap<T, U> {
    private readonly forwardMap;
    private readonly reverseMap;
    constructor();
    /**
     * 用键索引值
     * @param {T} key
     * @returns {U | undefined}
     */
    getByKey(key: T): U | undefined;
    /**
     * 用值索引键
     * @param {U} value
     * @returns {T | undefined}
     */
    getByValue(value: U): T | undefined;
    /**
     * 检查键是否存在
     * @param {T} key
     * @returns {boolean}
     */
    checkByKey(key: T): boolean;
    /**
     * 检查值是否存在
     * @param {U} value
     * @returns {boolean}
     */
    checkByValue(value: U): boolean;
    /**
     * 添加键值对
     * @param {[T, U]} pair
     */
    set(pair: [T, U]): void;
    /**
     * 按键删除键值对
     * @param {T} key
     */
    deleteByKey(key: T): void;
    /**
     * 按值删除键值对
     * @param {U} value
     */
    deleteByValue(value: U): void;
}
