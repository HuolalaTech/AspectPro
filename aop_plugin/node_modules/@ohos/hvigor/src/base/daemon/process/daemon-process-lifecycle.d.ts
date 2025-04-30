import { DaemonState } from '../registry/daemon-info.js';
import { HvigorDaemonServer } from '../server/hvigor-daemon-server.js';
/**
 * 获取当前daemon状态
 *
 * @returns {DaemonState}
 */
export declare function getCurrentProcessState(): DaemonState;
/**
 * 更新当前daemon状态
 *
 * @param {DaemonState} daemonState
 * @param stateChangeInfo
 */
export declare function setCurrentProcessState(daemonState: DaemonState, stateChangeInfo?: string): void;
/**
 * 初始化设置定时器
 */
export declare function setProcessTimeOutTimer(hvigorDaemonServer: HvigorDaemonServer): void;
/**
 * 刷新计时器
 */
export declare function resetProcessTimeOutTimer(hvigorDaemonServer: HvigorDaemonServer): void;
/**
 * 监控daemon cache中自身信息的正确性
 */
export declare function setProcessRemovedFromRegistryTimer(hvigorDaemonServer: HvigorDaemonServer): void;
export declare function registryProcessListener(hvigorDaemonServer: HvigorDaemonServer): void;
