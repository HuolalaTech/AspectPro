import { Level } from 'log4js';
import { HvigorLogger } from '../../log/hvigor-log.js';
export declare class HvigorDaemonClientLogger extends HvigorLogger {
    private readonly _daemonClientFileLogger;
    protected constructor(category?: string);
    /**
     * 获取对于类别的HvigorLogger实例
     *
     * @param {string} category 默认是default
     * @return {HvigorLogger}
     */
    static getLogger(category?: string): HvigorDaemonClientLogger;
    log(level: Level | string, ...args: unknown[]): void;
    debug(message: unknown, ...args: unknown[]): void;
    info(message: unknown, ...args: unknown[]): void;
    warn(message: unknown, ...args: unknown[]): void;
    error(message: unknown, ...args: unknown[]): void;
    clientErrorLink(): void;
    daemonErrorLink(daemonPid: number): void;
    clientWarnLink(): void;
    daemonWarnLink(daemonPid: number): void;
}
export declare function configureDaemonClient(): void;
