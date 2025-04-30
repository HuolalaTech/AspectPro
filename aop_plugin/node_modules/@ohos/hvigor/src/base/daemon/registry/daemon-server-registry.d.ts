import { DaemonState } from './daemon-info.js';
import { DefaultDaemonRegistry } from './default-daemon-registry.js';
declare class DaemonServerRegistry extends DefaultDaemonRegistry {
    constructor();
    updateDaemonProcessState(daemonState: DaemonState, stateChangeInfo?: string): void;
    getAllPortInUsed(): number[];
}
export declare const defaultDaemonServerRegistry: DaemonServerRegistry;
export {};
