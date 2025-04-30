import { BasicFileSnapshot } from '../core/filesystem-snapshot.js';
import { FileSystemSnapshotGenerator } from '../generator/filesystem-snapshot-generator.js';
import { FsOptions } from '../util/file-set.js';
export declare class DefaultFsSnapshotGenerator implements FileSystemSnapshotGenerator {
    /**
     * Snapshot a file or directory
     *
     * @param location location
     * @param options
     */
    snapshot(location: string, options?: FsOptions): BasicFileSnapshot;
    loadSnapshotCacheFromJson(jsonStr: string): Map<string, BasicFileSnapshot> | undefined;
    loadSnapshotFromJson(jsonStr: string): BasicFileSnapshot | undefined;
    serializeSnapshotToJson(map: Map<string, BasicFileSnapshot>): string;
}
