/**
 * 池化管理模块的常量
 *
 * @since 2022/8/15
 */
export declare class PoolConstant {
    static readonly MAX_POOL_NUM: number;
    static readonly MIN_POOL_NUM: number;
    static readonly DEFAULT_MAX_IDLE_TIME: number;
    static readonly DEFAULT_RECYCLE_INTERVAL: number;
    static readonly WORKER_ACTION_PATH: string;
    static readonly WORK_DONE: string;
    static readonly WORK_ERROR: string;
    static readonly CALLBACK_ERROR: string;
    static readonly FILE_SUFFIX: string;
    static readonly UNKNOWN_LOG_TIME: string;
    static readonly ENCODING: string;
    static readonly TIME_PREFIX_LENGTH: number;
    static readonly CPU_LIMIT: number;
    static readonly FAIL_DISPATCH_INTERVAL: number;
    static readonly MAX_FAIL_ATTEMPTS: number;
    static readonly UNMOUNT_TSC_COMMON_CACHE_EVENT = "unmountTscCommonCache";
    static readonly TSC_COMMON_CACHE_KEY = "common";
}
