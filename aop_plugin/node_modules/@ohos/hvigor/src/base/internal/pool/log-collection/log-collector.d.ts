/**
 * 日志收集器
 *
 * @since 2022/8/18
 */
export declare class LogCollector<T> {
    private readonly logSet;
    constructor();
    /**
     * 添加日志
     *
     * @param log
     */
    add(log: T): void;
    /**
     * 返回所有日志
     *
     * @returns {Set<T>} 日志集合
     */
    dump(): Set<T>;
    /**
     * 清空日志
     */
    clear(): void;
}
