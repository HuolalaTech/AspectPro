import { BasicFileSnapshot } from '../core/filesystem-snapshot.js';
import { FileMetaHasher } from '../util/file-hasher.js';
import { FsOptions } from '../util/file-set.js';
import { FileSystemSnapshotGenerator } from './filesystem-snapshot-generator.js';
export declare class DefaultFilesystemSnapshotGenerator implements FileSystemSnapshotGenerator {
    private readonly fileHasher;
    constructor(fileHasher?: FileMetaHasher);
    private parseFileSystemSnapshot;
    /**
     * Snapshot a file or directory
     *
     * @param filepath filepath
     * @param options FsOptions for filter file
     */
    snapshot(filepath: string, options?: FsOptions): BasicFileSnapshot;
    loadSnapshotFromJson(jsonStr: string): BasicFileSnapshot | undefined;
    loadSnapshotCacheFromJson(jsonStr: string): Map<string, BasicFileSnapshot> | undefined;
    serializeSnapshotToJson(map: Map<string, BasicFileSnapshot>): string;
}
