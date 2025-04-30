import { FileSystemSnapshotHierarchyVisitor, SnapshotVisitResult } from '../generator/filesystem-snapshot-visitor.js';
import { BasicFileSnapshot } from './filesystem-snapshot.js';
/**
 * 文件夹快照
 *
 * @since 2022/9/1
 */
export declare class DirectorySnapshot extends BasicFileSnapshot {
    children: BasicFileSnapshot[];
    accept(visitor: FileSystemSnapshotHierarchyVisitor): SnapshotVisitResult;
    walk(): IterableIterator<BasicFileSnapshot>;
    equals(other: BasicFileSnapshot): boolean;
}
