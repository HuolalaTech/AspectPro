import { BaseEvent, EventAdditional } from './base-event.js';
export declare enum ObjectEventState {
    NEW = "new",
    SNAPSHOT = "snapshot",
    DESTROY = "destroy"
}
export declare class ObjectEventAdditional implements EventAdditional {
    objectId: string;
    state: ObjectEventState;
    snapshot?: object;
    constructor(objectId: string, state: ObjectEventState, snapshot?: object);
}
export declare class ObjectEvent extends BaseEvent {
    additional: ObjectEventAdditional;
    constructor(id: string, name: string, description: string, pid: number, tid: string, objectId: string, state: ObjectEventState, snapshot?: object);
}
