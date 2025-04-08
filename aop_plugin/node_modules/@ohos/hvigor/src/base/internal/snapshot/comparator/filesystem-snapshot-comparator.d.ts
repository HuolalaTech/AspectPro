import { BasicFileSnapshot } from '../core/filesystem-snapshot.js';
/**
 * Filesystem snapshot comparator
 *
 * @since 2022/9/1
 */
export interface FilesystemSnapshotComparator {
    compare(oldSnapshot: BasicFileSnapshot, newSnapshot: BasicFileSnapshot): boolean;
}
export declare class DefaultFileSystemSnapshotComparator implements FilesystemSnapshotComparator {
    compare(oldSnapshot: BasicFileSnapshot, newSnapshot: BasicFileSnapshot): boolean;
}
