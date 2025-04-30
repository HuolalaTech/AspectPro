import { IncrementalTask } from '../../../external/task/incremental-task.js';
import { BasicFileSnapshot } from '../core/filesystem-snapshot.js';
import { TaskSnapshot } from '../core/task-snapshot.js';
import { FileSystemSnapshotGenerator } from '../generator/filesystem-snapshot-generator.js';
import { TaskSnapshotGenerator } from '../generator/task-snapshot-generator.js';
import { FsOptions } from '../util/file-set.js';
/**
 * Snapshot generator 外部统一入口单例类
 *
 * @since 2022/9/1
 */
export declare class SnapshotGeneratorService {
    private static _instance;
    private defaultFileSystemSnapshotGenerator;
    private taskGenerator;
    private constructor();
    static getInstance(): SnapshotGeneratorService;
    generateTaskSnapshot(task: IncrementalTask, generator?: TaskSnapshotGenerator): TaskSnapshot;
    /**
     * generateFileSystemSnapshot
     *
     * @param filepath file or directory path
     * @param options FsOptions for filter file
     * @param fileSystemSnapshotGenerator generator
     */
    generateFileSystemSnapshot(filepath: string, options?: FsOptions, fileSystemSnapshotGenerator?: FileSystemSnapshotGenerator): BasicFileSnapshot;
    loadTaskSnapshotFromJson(jsonStr: string): TaskSnapshot;
    loadTaskSnapshotCacheFromJson(text: string): Map<string, TaskSnapshot>;
    serializeTaskSnapshotCacheToJson(collection: Map<string, TaskSnapshot>): string;
    /**
     * json string 转 FileSystem snapshot
     *
     * @param jsonStr
     */
    loadFileSystemSnapshotFromJson(jsonStr: string): BasicFileSnapshot | undefined;
    /**
     * json string 转 Map<string, BasicFileSnapshot>
     *
     * @param jsonStr
     */
    loadFileSystemSnapshotCacheFromJson(jsonStr: string): Map<string, BasicFileSnapshot> | undefined;
    /**
     * serialize map of  BasicFileSnapshot to json string
     *
     * @param map
     */
    serializeFileSystemSnapshotToJson(map: Map<string, BasicFileSnapshot>): string;
}
