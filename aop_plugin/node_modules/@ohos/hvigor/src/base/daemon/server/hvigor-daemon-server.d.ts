/// <reference types="node" />
/// <reference types="node" />
import EventEmitter from 'events';
import * as http from 'http';
import { Socket } from 'socket.io';
export declare enum DaemonServerEventName {
    CONNECTION = "connection",
    LISTENING = "listening",
    LISTEN_FAILED = "listenFailed",
    CLOSE_CONNECTION = "closeConnection",
    CLOSE_SERVER = "closeServer",
    ERROR = "error"
}
/**
 * daemon process中运行的server
 */
export declare class HvigorDaemonServer extends EventEmitter {
    private static instance;
    private server;
    private readonly httpServer;
    private readonly sessionId;
    constructor(sessionId: string);
    static getInstance(sessionId: string): HvigorDaemonServer;
    getHttpServer(): http.Server;
    getSessionId(): string;
    onConnection(listener: (socket: Socket) => void): void;
    onError(listener: (err: Error) => void): void;
    listen(port?: number, hostname?: string, listeningListener?: () => void): void;
    onListening(listener: () => void): void;
    onListenFailed(listener: (message: string) => void): void;
    onCloseConnection(listener: (...args: any[]) => void): void;
    onCloseServer(listener: (...args: any[]) => void): void;
}
