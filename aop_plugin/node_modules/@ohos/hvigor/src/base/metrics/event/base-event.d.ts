export declare enum MetricEventType {
    DURATION = "duration",
    INSTANT = "instant",
    COUNTER = "counter",
    GAUGE = "gauge",
    OBJECT = "object",
    METADATA = "metadata",
    MARK = "mark",
    LOG = "log",
    CONTINUAL = "continual"
}
export declare class EventHead {
    id: string;
    name: string;
    description: string;
    type: MetricEventType;
    constructor(id: string, name: string, description: string, type: MetricEventType);
}
export declare class EventBody {
    pid: number;
    tid: string;
    startTime: number;
    endTime?: number;
    totalTime?: number;
    constructor(pid: number, tid: string);
}
export type EventAdditional = object;
export declare class BaseEvent {
    protected head: EventHead;
    protected body: EventBody;
    protected additional: EventAdditional;
    constructor(head: EventHead, body: EventBody);
    setStartTime(time?: number): void;
    setEndTime(time?: number): void;
    setTotalTime(time: number): void;
    getId(): string;
    getName(): string;
    getDescription(): string;
    setName(name: string): void;
    getType(): MetricEventType;
    setType(type: MetricEventType): void;
    getTid(): string;
    setTid(tid: string): this;
}
