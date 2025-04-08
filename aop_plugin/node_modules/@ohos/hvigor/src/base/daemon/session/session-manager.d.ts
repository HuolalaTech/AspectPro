/// <reference types="node" />
import EventEmitter from 'events';
import { Socket } from 'socket.io';
import { SocketId, ThreadId } from './session-map.js';
export declare const SESSION_EMIT_LOG = "emitLog";
declare class SessionManager extends EventEmitter {
    private sessionMap;
    private readonly serverSockets;
    private curActiveSocket;
    constructor();
    /**
     * 添加socket与相对应的session，添加session条目与socket记录
     * @param {Socket} socket
     */
    initSession(socket: Socket): void;
    /**
     * 结束socket所对应的session，移除session条目和socket记录
     * @param {Socket} socket
     */
    endSession(socket: Socket): void;
    /**
     * 绑定socketId与threadId
     *
     * @param {SocketId} socketId
     * @param {ThreadId} threadId
     */
    bindThread(socketId: SocketId, threadId: ThreadId): void;
    /**
     * 绑定socketId与worker process
     *
     * @param {SocketId} socketId
     * @param workerId
     */
    bindProcess(socketId: SocketId, workerId: number): void;
    getSockets(): Socket[];
    getLength(): number;
    getSocketByThreadId(threadId: ThreadId): Socket<import("socket.io/dist/typed-events.js").DefaultEventsMap, import("socket.io/dist/typed-events.js").DefaultEventsMap, import("socket.io/dist/typed-events.js").DefaultEventsMap, any> | undefined;
    getSocketBySocketId(socketId: SocketId): Socket<import("socket.io/dist/typed-events.js").DefaultEventsMap, import("socket.io/dist/typed-events.js").DefaultEventsMap, import("socket.io/dist/typed-events.js").DefaultEventsMap, any> | undefined;
    hasSocket(socketId: SocketId): boolean;
    getThreadId(socketId: SocketId): ThreadId;
    /**
     * socket收到信息时触发，给对应worker进程发送消息，目标是传递给对应worker进程内的worker线程
     *
     * @param {SocketId} socketId 触发需要传递信息的socket
     * @param {object} data 需要传递的信息
     */
    postMessageToThread(socketId: SocketId, data: object): void;
    /**
     * 设定activeSocket，并重载输出流和错误流的write方法
     * @param {Socket} socket
     */
    setActiveSocket(socket: Socket): void;
    /**
     * 重置activeSocket，并还原输出流和错误流的write方法
     */
    resetActiveSocket(): void;
    getActiveSocket(): Socket<import("socket.io/dist/typed-events.js").DefaultEventsMap, import("socket.io/dist/typed-events.js").DefaultEventsMap, import("socket.io/dist/typed-events.js").DefaultEventsMap, any> | undefined;
    /**
     * 添加从worker process里传递过来的信息的监听器，相应地回传给socket或者其他操作
     */
    addListenersOnSocket(): void;
}
export declare const defaultSessionManager: SessionManager;
export {};
