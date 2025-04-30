import { HvigorLogger } from '../../log/hvigor-log.js';
import { BaseEvent, EventAdditional } from './base-event.js';
import { LogEvent, MetricLogType } from './log-event';
export declare enum DurationEventState {
    CREATED = "created",
    BEGINNING = "beginning",
    RUNNING = "running",
    FAILED = "failed",
    SUCCESS = "success",
    WARN = "warn"
}
declare class DurationEventAdditional implements EventAdditional {
    category?: string;
    parent?: string;
    children: string[];
    state: DurationEventState;
    logId?: string;
    detailId?: string;
    targetName: string;
    moduleName: string;
    taskRunReasons: string[];
    constructor(eventName: string, category: string);
}
export declare class DurationEvent extends BaseEvent {
    additional: DurationEventAdditional;
    log: HvigorLogger;
    constructor(id: string, name: string, description: string, pid: number, group: string, tid: string);
    start(state?: DurationEventState, time?: number): this;
    stop(state?: DurationEventState, time?: number): this;
    setState(state: DurationEventState): void;
    createSubEvent(name: string, description: string): DurationEvent;
    addChild(childId: string): void;
    setParent(parentId: string): void;
    getParent(): string | undefined;
    getChildren(): string[];
    setLog(name?: string, type?: MetricLogType, description?: string, totalTime?: number): void;
    setParentLog(logEvent: LogEvent): void;
    setChildrenLog(logEvent: LogEvent): void;
    setDetail(name: string): void;
    setCategory(category: string): void;
    addTaskRunReason(taskRunReason: string): void;
}
export {};
