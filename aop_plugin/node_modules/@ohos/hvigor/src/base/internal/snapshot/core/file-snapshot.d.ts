import { FileSystemSnapshotHierarchyVisitor, SnapshotVisitResult } from '../generator/filesystem-snapshot-visitor.js';
import { FileMetaData } from '../util/file-metadata.js';
import { FileType } from '../util/file-type.js';
import { BasicFileSnapshot } from './filesystem-snapshot.js';
/**
 * 单个文件快照
 *
 * @since 2022/9/1
 */
export declare class FileSnapshot extends BasicFileSnapshot {
    fileMetaData: FileMetaData;
    constructor(name: string, path: string, type: FileType, isSymbolicLink: boolean, fileMetaData: FileMetaData);
    accept(visitor: FileSystemSnapshotHierarchyVisitor): SnapshotVisitResult;
    walk(): IterableIterator<BasicFileSnapshot>;
    equals(other: BasicFileSnapshot): boolean;
}
