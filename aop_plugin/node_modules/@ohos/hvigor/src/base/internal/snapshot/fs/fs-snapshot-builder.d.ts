import { BasicFileSnapshot } from '../core/filesystem-snapshot.js';
import { FsEvent } from './fs-event.js';
export interface FsSnapshotBuilder {
    /**
     * 处理遇见文件夹的情景
     *
     * @param info
     */
    enterDirectory(ev: FsEvent): void;
    /**
     * 处理遇见文件的场景
     * @param info
     */
    visitEntry(ev: FsEvent): void;
    /**
     * 文件夹访问完成时调用
     */
    leaveDirectory(fileev: FsEvent): void;
    /**
     * 返回Snapshot实例
     */
    getResult(): BasicFileSnapshot | undefined;
}
