export type ThreadId = string | undefined;
export type SocketId = string;
/**
 * 存储socket与thread映射关系的映射表
 */
export declare class SessionMap {
    private readonly sessionMap;
    constructor();
    getSocketId(threadId: ThreadId): string | undefined;
    getThreadId(socketId: SocketId): ThreadId;
    setSession(socketId: SocketId, threadId: ThreadId): void;
    deleteByThreadId(threadId: ThreadId): void;
    deleteBySocketId(socketId: SocketId): void;
    checkBySocketId(socketId: SocketId): boolean;
    checkByThreadId(threadId: ThreadId): boolean;
}
export declare function getThreadId(workerProcessId: number, workerThreadId: number): ThreadId;
export declare function resolveThreadId(threadId: string): number[];
