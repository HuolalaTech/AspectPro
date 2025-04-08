/**
 * hvigor里的打点
 */
interface HvigorTrace {
    totalTime: number;
    moduleNum: number;
    isIncremental: boolean;
    hasIncremental: boolean;
    isParallel: boolean;
    IS_DAEMON: boolean;
    LOG_LEVEL: string;
    IS_HVIGORFILE_TYPE_CHECK: boolean;
    HVIGOR_INSTALL_TIME?: number;
    CUSTOM_PLUGINS?: {
        PLUGIN_ID: string;
    }[];
    CUSTOM_TASKS?: {
        NAME: string;
    }[];
    /**
     * 打点数据Task执行时间
     * 取多个模块相同任务执行时间的最大值
     * 时间单位是纳秒
     */
    taskTime: Record<string, number>;
}
export declare const hvigorTrace: HvigorTrace;
/**
 * 添加自定义任务
 * 防止daemon下出现重复数据
 * @param {{NAME: string}} task
 */
export declare function addCustomTask(task: {
    NAME: string;
}): void;
/**
 * 添加自定义差劲
 * 防止daemon下出现重复数据
 * @param {{NAME: string}} task
 */
export declare function addCustomPlugin(plugin: {
    PLUGIN_ID: string;
}): void;
export {};
