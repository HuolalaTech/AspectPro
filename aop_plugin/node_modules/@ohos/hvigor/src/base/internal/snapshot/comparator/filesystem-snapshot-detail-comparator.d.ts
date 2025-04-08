import { BasicFileSnapshot } from '../core/filesystem-snapshot.js';
export interface FilesystemSnapshotDetailComparator {
    compare(previous: BasicFileSnapshot, current: BasicFileSnapshot): number;
}
export declare class FileSystemSnapshotNameComparator implements FilesystemSnapshotDetailComparator {
    compare(previous: BasicFileSnapshot, current: BasicFileSnapshot): number;
}
export declare class FileSystemSnapshotHashValueComparator implements FilesystemSnapshotDetailComparator {
    compare(previous: BasicFileSnapshot, current: BasicFileSnapshot): number;
}
