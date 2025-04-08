import { HvigorLogger } from '../../log/hvigor-log.js';
import { DaemonInfo } from './daemon-info.js';
interface DaemonRegistry {
    getIdles(): DaemonInfo[];
    getInfos(): DaemonInfo[];
    getInfo(keyId: string): DaemonInfo | undefined;
    setInfo(keyId: string, daemonInfo: DaemonInfo): void;
}
export declare class DefaultDaemonRegistry implements DaemonRegistry {
    private _log;
    private daemonCacheService;
    constructor(log: HvigorLogger);
    getIdles(): DaemonInfo[];
    getAlive(): DaemonInfo[];
    getInfo(keyId: string): DaemonInfo | undefined;
    getInfos(): DaemonInfo[];
    getDaemonInfoByPid(pid: number): DaemonInfo | undefined;
    setInfo(keyId: string, daemonInfo: DaemonInfo): void;
}
export {};
