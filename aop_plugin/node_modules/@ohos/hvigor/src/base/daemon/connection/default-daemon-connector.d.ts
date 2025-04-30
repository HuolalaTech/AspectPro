import { Socket } from 'socket.io-client';
import { DaemonInfo } from '../registry/daemon-info.js';
import { DaemonConnector } from './daemon-connector.js';
/**
 * 为client获取可用的与daemon的socket连接
 */
export declare class DefaultDaemonConnector implements DaemonConnector {
    getDaemonConnection(): Promise<Socket | undefined>;
    onConnect(...args: any[]): void;
    onClose(daemonInfo: DaemonInfo, reason: string): void;
    onConnectError(daemonInfo: DaemonInfo, error: Error): void;
}
