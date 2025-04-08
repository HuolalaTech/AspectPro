import { Socket } from 'socket.io-client';
export interface DaemonConnector {
    getDaemonConnection(): Promise<Socket | undefined>;
}
