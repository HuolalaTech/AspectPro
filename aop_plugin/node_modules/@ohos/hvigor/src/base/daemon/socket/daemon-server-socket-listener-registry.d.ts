import { Socket } from 'socket.io';
import { HvigorDaemonServer } from '../server/hvigor-daemon-server.js';
/**
 * daemon侧的socket上所需要添加的事件监听
 */
export declare class DaemonServerSocketListenerRegistry {
    private readonly socket;
    constructor(socket: Socket);
    /**
     * 注册所有socket都需要注册的事件监听
     */
    registryBaseListener(hvigorDaemonServer: HvigorDaemonServer): void;
    /**
     * 注册收到开始构建任务的消息的事件监听
     * @private
     */
    private onStartBuild;
    private awaitBuildResult;
    /**
     * 注册收到取消构建指令的消息的事件监听
     * @private
     */
    private onCancel;
    /**
     * 注册收到关闭daemon进程的事件监听
     * @private
     */
    private onStop;
    private addDebugFileToServerProcess;
    private deleteDebugFileToServerProcess;
    /**
     * 注册当socket连接发生错误时触发的事件监听
     * @private
     */
    private onError;
    private onDisconnected;
    /**
     * 在server端，socket需要根据自己绑定线程状态来停止相应的任务：
     * 1. curActiveSocket: 终止工作进程的hvigor任务执行，同时要让主进程的事件循环不阻塞。
     * 2. threadId != undefined: 向相应worker线程发送终止信号。
     * 3. threadId == undefined: 无需处理。
     * @private
     */
    private stopTask;
}
