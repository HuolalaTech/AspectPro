/**
 * 日志实体类，每次打印一个日志，应该带有一个code
 */
export declare class LogMessage {
    private _code;
    private _timestamp;
    private _buildId;
    private _message;
    private _stack;
    private _solutions;
    private _moreInfo;
    constructor(timestamp: Date, buildId: string | undefined);
    get message(): string | undefined;
    set message(value: string | undefined);
    get moreInfo(): string | undefined;
    set moreInfo(value: string | undefined);
    get code(): string | undefined;
    set code(value: string | undefined);
    get stack(): string | undefined;
    set stack(value: string | undefined);
    get solutions(): string[] | undefined;
    set solutions(value: string[] | undefined);
    get timestamp(): Date;
    get buildId(): string | undefined;
}
