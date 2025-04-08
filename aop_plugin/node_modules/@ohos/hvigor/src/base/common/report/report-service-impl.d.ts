import { ReportListener } from './report-listener.js';
import { ReportService } from './report-service.js';
/**
 * 报告服务实现类
 *
 * @since 2022/8/18
 */
export declare class ReportServiceImpl implements ReportService {
    private reportListeners;
    private static instance;
    private static MAX_REPEAT_TIMES;
    private static REPORT_REG;
    private static HTML_REG;
    private static HTML_RESOURCE_NAME;
    private constructor();
    report(): void;
    getReport(): any;
    /**
     * 存储到report.json
     *
     * @param reportObj
     * @param reportDirPath
     */
    storage(reportObj: {
        [name: string]: any;
    }, reportDirPath: string): void;
    /**
     * 删除除了report以外的无效文件
     */
    deleteUnusableFiles(reportDirPath: string): void;
    /**
     * 添加监听
     *
     * @param listener
     */
    addListener(listener: ReportListener): void;
    /**
     * 移除监听
     *
     * @param listener
     */
    removeListener(listener: ReportListener): void;
    generateHtmlResource(reportDirPath: string, reportFileName: string, reportObj: {
        [name: string]: any;
    }): void;
    static getInstance(): ReportServiceImpl;
}
