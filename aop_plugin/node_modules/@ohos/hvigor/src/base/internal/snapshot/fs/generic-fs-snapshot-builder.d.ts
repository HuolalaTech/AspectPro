import { FileSnapshot } from '../core/file-snapshot.js';
import { BasicFileSnapshot } from '../core/filesystem-snapshot.js';
import { FsEvent } from './fs-event.js';
import { FsSnapshotBuilder } from './fs-snapshot-builder.js';
/**
 * 快照生成器
 * 仅hash文件信息, 未hash文件内容
 *
 * @since 2022/08/27
 */
export declare class GenericFsSnapshotBuilder implements FsSnapshotBuilder {
    private directoryStack;
    private directorySnapshot;
    enterDirectory(ev: FsEvent): void;
    visitEntry(ev: FsEvent): void;
    leaveDirectory(ev: FsEvent): void;
    handleEntry(snapshot: BasicFileSnapshot): void;
    private completeDirectory;
    hashItem(snapshot: FileSnapshot): string;
    getResult(): BasicFileSnapshot | undefined;
    private assembleSnapshot;
    private peekLast;
}
