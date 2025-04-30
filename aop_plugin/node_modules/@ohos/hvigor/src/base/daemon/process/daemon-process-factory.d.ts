import { DaemonInfo } from '../registry/daemon-info.js';
/**
 * 生成新daemon process的工厂类
 */
export declare class DaemonProcessFactory {
    private readonly childExecArgv;
    createDaemonPromise: Promise<void> | undefined;
    constructor();
    getProjectCompatibleIdleDaemon(needAwait?: boolean): Promise<DaemonInfo | undefined>;
    private killOldProcessAndCreateNew;
    private createNewIdleDaemon;
    /**
     * 新启动一个node进程去创建daemon
     */
    createDaemonFork(): void;
}
export declare const defaultDaemonServerFactory: DaemonProcessFactory;
