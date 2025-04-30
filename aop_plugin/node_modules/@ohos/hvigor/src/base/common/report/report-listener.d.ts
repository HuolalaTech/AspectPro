import { Report } from './report.js';
/**
 * 报告服务监听器接口
 *
 * @since 2022/8/18
 */
export interface ReportListener {
    queryReport(): Report<any>;
}
