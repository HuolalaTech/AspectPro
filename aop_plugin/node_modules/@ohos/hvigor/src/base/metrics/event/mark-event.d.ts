import { BaseEvent, EventAdditional } from './base-event.js';
export declare enum MarkEventType {
    HISTORY = "history",
    OTHER = "other"
}
export declare enum MarkEventCategory {
    BUILD = "build",
    CLEAN = "clean"
}
export declare enum MarkEventState {
    SUCCESS = "success",
    FAILED = "failed",
    RUNNING = "running"
}
export declare class MarkEventTime {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    constructor(time: Date);
}
export declare class MarkEventAdditional implements EventAdditional {
    markType?: MarkEventType;
    category?: MarkEventCategory;
    state?: MarkEventState;
    time: MarkEventTime;
    hvigorVersion?: string;
    completeCommand?: string;
    nodeVersion?: string;
    constructor();
}
export declare class MarkEvent extends BaseEvent {
    additional: MarkEventAdditional;
    constructor(id: string, name: string, description: string, pid: number, tid: string);
    start(state?: MarkEventState, time?: number): void;
    stop(state?: MarkEventState, time?: number): void;
    setMarkType(markType: MarkEventType): void;
    setCategory(category: MarkEventCategory): void;
    setState(state: MarkEventState): void;
    setHvigorVersion(hvigorVersion: string): void;
    setCompleteCommand(completeCommand: string): void;
    setNodeVersion(nodeVersion: string): void;
}
