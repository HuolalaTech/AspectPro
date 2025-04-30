import { BaseEvent, EventAdditional } from './base-event.js';
import { LogEvent, MetricLogType } from './log-event.js';
export declare class ContinualEventAdditional implements EventAdditional {
    totalTime: number;
    frequency: number;
    children: string[];
    parent?: string;
    logId?: string;
    detailId?: string;
    constructor(totalTime?: number, frequency?: number);
}
export declare class ContinualEvent extends BaseEvent {
    additional: ContinualEventAdditional;
    constructor(id: string, name: string, description: string, pid: number, tid: string, totalTime?: number, frequency?: number);
    setParent(parentId: string): void;
    getParent(): string | undefined;
    addChild(childId: string): void;
    getChildren(): string[];
    createSubEvent(name: string, description: string): ContinualEvent;
    setLog(name: string, type: MetricLogType, description?: string): void;
    setParentLog(logEvent: LogEvent): void;
    setDetail(name: string): void;
    setChildrenLog(logEvent: LogEvent): void;
}
