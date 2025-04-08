import { Report } from '../../../common/report/report.js';
import { ReportListener } from '../../../common/report/report-listener.js';
import { LogType } from '../enum/log-type.js';
import { Log } from './log.js';
import { LogService } from './log-service.js';
/**
 * LogService实现类
 *
 * @since 2022/8/18
 */
export declare class LogServiceImpl implements LogService, ReportListener {
    private isActive;
    private logCollectorMap;
    constructor();
    clear(type?: LogType): void;
    getLog(type: LogType): Set<Log> | undefined;
    /**
     * 添加日志
     *
     * @param log 待添加的日志
     */
    addLog(log: Log): void;
    /**
     * 允许收集日志
     */
    start(): void;
    /**
     * 停止收集日志
     */
    end(): void;
    queryReport(): Report<Set<Log>>;
}
