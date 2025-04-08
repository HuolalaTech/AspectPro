import { BasicFileSnapshot } from '../core/filesystem-snapshot.js';
import { FileSnapshotDetailDiff } from './filesnapshot-detail-diff.js';
import { FilesystemSnapshotDetailComparator } from './filesystem-snapshot-detail-comparator.js';
import { SnapshotDiffListener } from './snapshot-diff-listener.js';
/**
 * Snapshot DiffUtil
 *
 * @since 2022/9/1
 */
export declare class DiffUtil {
    static diff(oldSnapshot: BasicFileSnapshot, newSnapshot: BasicFileSnapshot, comparator: FilesystemSnapshotDetailComparator): boolean;
    /**
     * Snapshot diff
     *
     * @param oldSnapshot oldSnapshot
     * @param newSnapshot newSnapshot
     * @param comparator comparator
     */
    static diffWithDetail(oldSnapshot: BasicFileSnapshot, newSnapshot: BasicFileSnapshot, comparator: FilesystemSnapshotDetailComparator): FileSnapshotDetailDiff;
    /**
     * Diff with break 可以在任意结点提早结束比较 （参考 gradle）
     *
     * @param oldSnapshot oldSnapshot
     * @param newSnapshot newSnapshot
     * @param comparator comparator
     * @param diffListener diffListener
     */
    static diffWithBreak(oldSnapshot: BasicFileSnapshot, newSnapshot: BasicFileSnapshot, comparator: FilesystemSnapshotDetailComparator, diffListener: SnapshotDiffListener): boolean;
}
