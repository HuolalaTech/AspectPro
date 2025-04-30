import { BasicFileSnapshot } from '../core/filesystem-snapshot.js';
/**
 * Snapshot diff listener
 *
 * @since 2022/9/1
 */
export interface SnapshotDiffListener {
    /**
     * Removed node listener
     *
     * @param previous
     */
    removed(previous: BasicFileSnapshot): boolean;
    /**
     * Added node listener
     *
     * @param current
     */
    added(current: BasicFileSnapshot): boolean;
    /**
     * Updated node listener
     *
     * @param previous
     * @param current
     */
    updated(previous: BasicFileSnapshot, current: BasicFileSnapshot): boolean;
}
