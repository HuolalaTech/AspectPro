/**
 * 池配置
 *
 * @since 2022/8/12
 */
export type PoolConfig = {
    maxPoolNum?: number;
    minPoolNum?: number;
    recycleInterval?: number;
    maxIdleTime?: number;
    maxCoreSize?: number;
    cacheCapacity?: number;
    cacheTtl?: number;
};
export declare function isSamePoolConfig(p1: PoolConfig, p2: PoolConfig): boolean;
