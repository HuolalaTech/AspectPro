export declare let cpuUsage: number;
/**
 * 开始监测CPU使用率
 */
export declare function startMonitor(): void;
/**
 * 停止监测CPU使用率
 */
export declare function endMonitor(): Promise<void>;
