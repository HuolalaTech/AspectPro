/**
 * 定义构建结果类
 */
export declare class BuildResult {
    private error;
    private report;
    constructor(error: Error | null, report?: any);
    getError(): Error | null;
    getReportJson(): any;
}
