/**
 * 检查目标进程是否为hvigor守护进程的方法
 * 该方法使用时间约在300ms左右，因此暂时只在时间不敏感的stop-daemon中使用
 *
 * @param {number} pid
 * @returns {boolean}
 */
export declare function isHvigorDaemonProcess(pid: number): boolean;
/**
 * 通过--stop-daemon命令,关闭所有daemon注册表中的守护进程
 * 在client侧被调用,打印日志使用daemon-client
 */
export declare function stopDaemons(closeAll: boolean): void;
/**
 * 通过--status-daemon命令,打印所有daemon注册表中的守护进程信息
 * 在client侧被调用,打印日志使用daemon-client
 */
export declare function logDaemonInfo(): void;
