import { DirectorySnapshot } from '../core/directory-snapshot.js';
import { BasicFileSnapshot } from '../core/filesystem-snapshot.js';
export declare enum SnapshotVisitResult {
    /**
     * Continue visiting. When returned after visiting a directory,
     * the entries in the directory will be visited next.
     */
    CONTINUE = 0,
    /**
     * Terminate visiting immediately.
     */
    TERMINATE = 1,
    /**
     * If returned from visiting a directory, the directories entries will not be visited;
     * otherwise works as {@link #CONTINUE}.
     */
    SKIP_SUBTREE = 2
}
/**
 * FileSystem snapshot 层级 visitor
 *
 * @since 2022/9/1
 */
export interface FileSystemSnapshotHierarchyVisitor {
    /**
     * Called before visiting the contents of a directory.
     */
    enterDirectory(directorySnapshot: DirectorySnapshot): void;
    /**
     * Called for each regular file/directory/missing/unavailable file.
     *
     * @return how to continue visiting the rest of the snapshot hierarchy.
     */
    visitEntry(snapshot: BasicFileSnapshot): SnapshotVisitResult;
    /**
     * Called afterRun all entries in the directory has been visited.
     */
    leaveDirectory(directorySnapshot: DirectorySnapshot): void;
}
