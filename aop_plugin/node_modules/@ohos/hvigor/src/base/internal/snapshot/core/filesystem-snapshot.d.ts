import { FileSystemSnapshotHierarchyVisitor, SnapshotVisitResult } from '../generator/filesystem-snapshot-visitor.js';
import { FileType } from '../util/file-type.js';
import { Snapshot } from './snapshot.js';
/**
 * 快照抽象基类
 *
 * @since 2022/9/1
 */
export declare abstract class BasicFileSnapshot extends Snapshot {
    hashValue: string;
    name: string;
    path: string;
    type: FileType;
    isSymbolicLink: boolean;
    constructor(name?: string, path?: string, type?: FileType, isSymbolicLink?: boolean);
    /**
     * accept
     *
     * @param visitor
     */
    abstract accept(visitor: FileSystemSnapshotHierarchyVisitor): SnapshotVisitResult;
    /**
     * Generator 生成器 ，Depth First order
     */
    abstract walk(): IterableIterator<BasicFileSnapshot>;
    /**
     * equals
     *
     * @param other
     */
    abstract equals(other: BasicFileSnapshot): boolean;
    /**
     * isHashEquals
     *
     * @param other
     */
    isHashEquals(other: BasicFileSnapshot): boolean;
    /**
     * toJsonString
     */
    toJsonString(): string;
    [Symbol.iterator](): IterableIterator<BasicFileSnapshot>;
}
