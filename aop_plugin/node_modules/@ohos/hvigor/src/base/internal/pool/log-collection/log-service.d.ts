import { LogType } from '../enum/log-type.js';
import { Log } from './log.js';
/**
 * 日志服务
 *
 * @since 2022/8/18
 */
export interface LogService {
    /**
     * 获得日志
     *
     * @param type 日志类型
     * @returns {Set<Log>|undefined} 日志集合
     */
    getLog(type: LogType): Set<Log> | undefined;
    /**
     * 清空日志
     *
     * @param type 日志类型
     */
    clear(type?: LogType): void;
}
