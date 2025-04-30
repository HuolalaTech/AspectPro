/**
 * 一个包含TaskPath队列的对象
 *
 * @since 2023/11/09
 */
export declare class TaskQueue {
    private taskQueue;
    constructor(capacity?: number);
    push(task: string): boolean;
    pop(): string | undefined;
    peek(): string | undefined;
    size(): number;
    toString(): string;
    isEmpty(): boolean;
    clear(): void;
}
