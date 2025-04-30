/**
 * 最终写入details.json的打点数据
 */
declare class TraceBuildAnalyze {
    private readonly data;
    constructor();
    getData(): {
        totalTime: number;
        moduleNum: number;
        isIncremental: boolean;
        hasIncremental: boolean;
        isParallel: boolean;
        IS_DAEMON: boolean;
        LOG_LEVEL: string;
        IS_HVIGORFILE_TYPE_CHECK: boolean;
        HVIGOR_INSTALL_TIME?: number | undefined;
        CUSTOM_PLUGINS?: {
            PLUGIN_ID: string;
        }[] | undefined;
        CUSTOM_TASKS?: {
            NAME: string;
        }[] | undefined;
        taskTime: Record<string, number>;
    };
    set(key: string, value: any): void;
}
export declare const traceBuildAnalyze: TraceBuildAnalyze;
export {};
