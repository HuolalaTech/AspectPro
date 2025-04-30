import type { Configuration, Level, Logger } from 'log4js';
import { MetricLogType } from '../metrics/event/log-event.js';
import { LogMessage } from './log-message.js';
/**
 * 基于log4js封装的HvigorLogger
 *
 * @since 2022/03/02
 */
export declare class HvigorLogger {
    protected readonly _logger: Logger;
    protected readonly _filelogger: Logger;
    protected durationId: string | undefined;
    protected constructor(category?: string, durationId?: string);
    /**
     * 获取对于类别的HvigorLogger实例
     *
     * @param {string} category 默认是default
     * @return {HvigorLogger}
     */
    static getLogger(category?: string): HvigorLogger;
    static getLoggerWithDurationId(category: string, durationId: string): HvigorLogger;
    log(level: Level | string, ...args: unknown[]): void;
    debug(message: unknown, ...args: unknown[]): void;
    info(message: unknown, ...args: unknown[]): void;
    warn(message: unknown, ...args: unknown[]): void;
    error(message: unknown, ...args: unknown[]): void;
    _printTaskExecuteInfo(taskPath: string, time: string): void;
    _printFailedTaskInfo(taskPath: string): void;
    _printDisabledTaskInfo(taskPath: string): void;
    _printUpToDateTaskInfo(taskPath: string): void;
    _printStackErrorToFile(message: unknown, ...args: unknown[]): void;
    errorMessageExit(message: string, ...args: unknown[]): void;
    errorExit(e: Error, message?: string, ...args: unknown[]): void;
    getLevel(): Level | string;
    setLevel(level: Level | string): void;
    createLogEventByDurationId(message: unknown, logType: MetricLogType, ...args: unknown[]): unknown;
    getMessage(message: string, ...args: unknown[]): string;
    printError(logMessage: LogMessage): void;
    printErrorExit(logMessage: LogMessage): void;
}
export declare function evaluateLogLevel(level: Level, ignoreLevelCategoryFilterArr?: string[]): void;
/**
 * 这个方法会对configuration里加入daemon或者daemon-client的部分
 * 之后调用setConfiguration时，就会使用包含daemon/daemon-client的部分
 *
 * @param {Configuration} configuration
 */
export declare function configure(configuration: Configuration): void;
