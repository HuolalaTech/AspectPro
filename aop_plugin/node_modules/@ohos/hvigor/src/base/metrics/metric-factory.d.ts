import { ContinualEvent } from './event/continual-event.js';
import { CounterEvent } from './event/counter-event.js';
import { DurationEvent } from './event/duration-event.js';
import { GaugeEvent } from './event/gauge-event.js';
import { InstantEvent } from './event/instant-event.js';
import { LogEvent, MetricLogType } from './event/log-event.js';
import { MarkEvent } from './event/mark-event.js';
import { MetadataEvent, MetadataEventState } from './event/metadata-event.js';
import { ObjectEvent, ObjectEventState } from './event/object-event.js';
export declare const MAIN_THREAD = "Main Thread";
/**
 * 矩阵工厂
 *
 * @since 2022/8/17
 */
export declare class MetricFactory {
    static getUuid(): `${string}-${string}-${string}-${string}-${string}`;
    static createDurationEvent(name: string, description: string, group: string, tid?: string): DurationEvent;
    static createInstantEvent(name: string, description: string, tid?: string): InstantEvent;
    static createCounterEvent(name: string, description: string, success?: number, failed?: number, tid?: string): CounterEvent;
    static createGaugeEvent(name: string, utilization: number, description: string, tid?: string): GaugeEvent;
    static createObjectEvent(name: string, objectId: string, state: ObjectEventState, description: string, snapshot?: object, tid?: string): ObjectEvent;
    static createMetadataEvent(name: string, state: MetadataEventState, description: string, tid?: string): MetadataEvent;
    static createMarkEvent(name: string, description: string, tid?: string): MarkEvent;
    static createLogEvent(name: string, type: MetricLogType, tid?: string, description?: string): LogEvent;
    static createContinualEvent(name: string, description: string, totalTime?: number, frequency?: number, tid?: string): ContinualEvent;
}
