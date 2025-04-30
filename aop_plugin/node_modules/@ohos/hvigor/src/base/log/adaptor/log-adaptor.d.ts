import { LogMessage } from '../log-message.js';
/**
 * 适配器模式,将不同格式的错误通过适配器形成统一的输出形式
 */
export interface LogAdaptor {
    getLogMessage(): LogMessage;
}
export declare class HvigorLogAdaptor implements LogAdaptor {
    private logMessage;
    constructor(errorCode: string, buildId: string | undefined);
    getLogMessage(): LogMessage;
    getErrorCodeJsonPath(): string;
    formatMessage(...args: unknown[]): this;
    formatSolutions(index: number, ...args: unknown[]): this;
}
export declare class HvigorGlobalErrorAdaptor extends HvigorLogAdaptor {
    constructor(errorMsg: string, buildId: string | undefined);
    packingToolAdaptor(errorMsg: string): void;
    toolAdaptor(errorMsg: string): void;
}
export declare function matchErrorMessage(errorMessage: string, errorJsonPath: string): string | undefined;
