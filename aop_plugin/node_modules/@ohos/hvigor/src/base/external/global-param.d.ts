/**
 * 保存npm全局配置信息
 *
 * @since 2022/10/8
 */
export declare class GlobalParam {
    private _log;
    private static instance;
    private configuration;
    private _initialized;
    static getInstance(): GlobalParam;
    private constructor();
    private load;
    getConfig(key: string): any;
    setConfig(key: string, value: any): void;
    private check;
}
