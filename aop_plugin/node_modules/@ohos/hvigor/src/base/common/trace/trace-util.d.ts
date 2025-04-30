/**
 * 记录打点数据：taskTime
 *
 * @param taskName
 * @param time
 */
export declare function recordTraceData(taskName: string, time: number): void;
/**
 * 插件记录打点数据
 */
export declare function pluginTrace(key: string, value: any): void;
