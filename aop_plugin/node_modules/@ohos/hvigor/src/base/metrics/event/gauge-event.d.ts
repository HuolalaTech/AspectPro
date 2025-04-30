import { BaseEvent, EventAdditional } from './base-event.js';
export declare class GaugeEventAdditional implements EventAdditional {
    utilization: number;
    constructor(utilization: number);
}
export declare class GaugeEvent extends BaseEvent {
    additional: GaugeEventAdditional;
    constructor(id: string, name: string, description: string, pid: number, tid: string, utilization: number);
}
