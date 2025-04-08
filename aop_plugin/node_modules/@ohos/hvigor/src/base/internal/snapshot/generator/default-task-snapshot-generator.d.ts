import { IncrementalTask } from '../../../external/task/incremental-task.js';
import { TaskSnapshot } from '../core/task-snapshot.js';
import { TaskSnapshotGenerator } from './task-snapshot-generator.js';
export declare class DefaultTaskSnapshotGenerator implements TaskSnapshotGenerator {
    snapshot(task: IncrementalTask): TaskSnapshot;
    loadSnapshotFromJson(text: string): TaskSnapshot;
    loadSnapshotCacheFromJson(text: string): Map<string, TaskSnapshot>;
    serializeSnapshotCacheToJson(collection: Map<string, TaskSnapshot>): string;
}
