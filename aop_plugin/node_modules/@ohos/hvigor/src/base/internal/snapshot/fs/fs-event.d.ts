/// <reference types="node" />
import fs from 'fs';
import { EventType } from './event-type.js';
export declare class FsEvent {
    private readonly name;
    private readonly file;
    private readonly eventType;
    private readonly stats;
    constructor(eventType: EventType, name: string, file: string, stats: fs.Stats);
    getName(): string;
    type(): EventType;
    getFile(): string;
    getStats(): fs.Stats;
}
