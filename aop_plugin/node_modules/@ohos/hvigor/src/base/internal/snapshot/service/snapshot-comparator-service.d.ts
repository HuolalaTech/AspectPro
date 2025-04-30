import { Snapshot } from '../core/snapshot.js';
export declare class SnapshotComparatorService {
    private static _instance;
    static getInstance(): SnapshotComparatorService;
    static isDiff(oldSnapShot: Snapshot | undefined, newSnapShot: Snapshot | undefined): boolean;
}
