export interface DaemonInfo {
    keyId: string;
    hvigorVersion: string;
    cwdPath: string;
    nodeVersion: string;
    nodeParams: string;
    address: string;
    port: number;
    pid: number;
    state: DaemonState;
    lastUsedTime: number;
    info?: string;
    createdBy: string;
    sessionId: string;
}
export declare enum DaemonState {
    IDLE = "idle",
    HALF_BUSY = "half_busy",
    BUSY = "busy",
    CANCELED = "canceled",
    STOP_REQ = "stopReq",
    STOPPED = "stopped",
    BROKEN = "broken"
}
