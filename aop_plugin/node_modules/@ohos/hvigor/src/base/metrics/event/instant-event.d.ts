import { BaseEvent, EventAdditional } from './base-event.js';
export declare enum InstantEventScope {
    THREAD = "thread",
    PROCESS = "process",
    GLOBAL = "global"
}
export declare class InstantEventAdditional implements EventAdditional {
    scope?: InstantEventScope;
}
export declare class InstantEvent extends BaseEvent {
    additional: InstantEventAdditional;
    constructor(id: string, name: string, description: string, pid: number, tid: string);
    setScope(scope: InstantEventScope): void;
}
