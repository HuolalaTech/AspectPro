/**
 * 任务状态
 *
 * @since 2022/8/12
 */
export declare enum TaskState {
    WAITING = "waiting",
    RUNNING = "running",
    END = "end",
    REJECT = "reject",
    ERROR = "error"
}
export declare const transitionMap: Map<TaskState, Set<TaskState>>;
