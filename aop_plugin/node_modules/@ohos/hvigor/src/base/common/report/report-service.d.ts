import { ReportListener } from './report-listener.js';
/**
 * 报告服务接口
 *
 * @since 2022/8/18
 */
export interface ReportService {
    report(): void;
    getReport(): any;
    addListener(listener: ReportListener): void;
    removeListener(listener: ReportListener): void;
}
