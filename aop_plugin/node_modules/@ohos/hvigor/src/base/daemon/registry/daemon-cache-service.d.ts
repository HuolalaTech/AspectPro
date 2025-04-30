import { CacheService } from '../../internal/cache/service/cache-service.js';
import { HvigorLogger } from '../../log/hvigor-log.js';
import { DaemonInfo } from './daemon-info.js';
export declare class DaemonCacheService implements CacheService<DaemonInfo> {
    private _log;
    private readonly cachePath;
    constructor(cachePath: string, log: HvigorLogger);
    set(key: string, entryContent: DaemonInfo): void;
    close(): void;
    get(key: string): DaemonInfo;
    remove(key: string): void;
    size(): number;
    initialize(): void;
    getAll(): {
        [keyId: string]: DaemonInfo;
    };
    private removeUselessInfoInDaemonRegistry;
}
