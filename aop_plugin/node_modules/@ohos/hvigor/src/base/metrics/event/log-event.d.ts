import { BaseEvent, EventAdditional } from './base-event.js';
export declare enum MetricLogType {
    DEBUG = "debug",
    INFO = "info",
    WARN = "warn",
    ERROR = "error",
    DETAIL = "detail"
}
export declare class LogEventAdditional implements EventAdditional {
    logType: MetricLogType;
    durationId?: string;
    continualId?: string;
    parent?: string;
    children: string[];
    constructor(logType: MetricLogType);
}
export declare class LogEvent extends BaseEvent {
    additional: LogEventAdditional;
    constructor(id: string, name: string, description: string, pid: number, tid: string, type: MetricLogType);
    getLogType(): MetricLogType;
    setLogType(type: MetricLogType): void;
    getDurationId(): string | undefined;
    setDurationId(durationId: string): void;
    getContinualId(): string | undefined;
    setContinualId(continualId: string): void;
    addChild(id?: string): void;
    setParent(id: string): void;
}
