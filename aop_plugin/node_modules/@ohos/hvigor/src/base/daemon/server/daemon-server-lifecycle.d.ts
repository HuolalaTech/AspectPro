import { HvigorDaemonServer } from './hvigor-daemon-server.js';
export declare class DaemonServerLifecycle {
    /**
     * server启动并监听端口
     */
    startListen(hvigorDaemonServer: HvigorDaemonServer): Promise<void>;
}
