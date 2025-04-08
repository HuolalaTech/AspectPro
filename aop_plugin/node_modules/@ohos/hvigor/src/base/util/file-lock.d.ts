/// <reference types="node" />
export interface LockOptions {
    stale?: number;
    update?: number;
    retries?: number;
}
export interface LockInfo {
    mtime?: number;
    lastUpdate?: number;
    option?: LockOptions;
    lockPath?: string;
    updateTimer?: NodeJS.Timer;
    release?: boolean;
}
/**
 * 同步上锁，当文件夹存在并且没有超时时，认为已获得锁
 * @param {string} file
 * @param {LockOptions} opt
 */
export declare function lockSync(file: string, opt?: LockOptions): void;
/**
 * 通过删除文件来解除文件锁
 * @param {string} file
 */
export declare function unlockSync(file: string): void;
/**
 * 检查一个文件是否处于被锁定的状态
 * @param {string} file
 * @param {LockOptions} opt
 * @returns {boolean}
 */
export declare function checkSync(file: string, opt?: LockOptions): boolean;
