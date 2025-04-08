import { IncrementalTask } from '../../../external/task/incremental-task.js';
import { TaskSnapshot } from '../core/task-snapshot.js';
/**
 * 任务快照生成器
 * 包括根据任务生成和根据缓存json字符串生成
 *
 * @since 2022/8/31
 */
export interface TaskSnapshotGenerator {
    /**
     * 根据任务生成任务快照
     *
     * @param task
     */
    snapshot(task: IncrementalTask): TaskSnapshot;
    /**
     * 从json字符串生成任务快照
     *
     * @param text
     */
    loadSnapshotFromJson(text: string): TaskSnapshot;
    /**
     * 根据json字符串生成任务快照map
     *
     * @param text
     */
    loadSnapshotCacheFromJson(text: string): Map<string, TaskSnapshot>;
    /**
     * 将任务快照map序列化为json字符串
     * @param collection
     */
    serializeSnapshotCacheToJson(collection: Map<string, TaskSnapshot>): string;
}
