import { BaseEvent, EventAdditional } from './base-event.js';
export declare class CounterEventAdditional implements EventAdditional {
    success: number;
    failed: number;
    constructor(success?: number, failed?: number);
}
export declare class CounterEvent extends BaseEvent {
    additional: CounterEventAdditional;
    constructor(id: string, name: string, description: string, pid: number, tid: string, success?: number, failed?: number);
}
