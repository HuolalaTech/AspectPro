/// <reference types="node" />
import EventEmitter from 'events';
import { HvigorLogger } from '../../log/hvigor-log.js';
declare class HvigorBuildProcess extends EventEmitter {
    taskBeginTime: [number, number] | undefined;
    hasTaskDone: boolean;
    constructor();
    /**
     * 初始化hvigorProcess,包括创建监听等
     *
     */
    init(): void;
    /**
     * 开始启动hvigorProcess的生命周期执行
     *
     */
    setTaskBeginTime(): void;
    /**
     * hvigor process正常结束
     *
     */
    close(): void;
    /**
     * hvigor process异常结束
     *
     */
    error(error: Error, taskLog?: HvigorLogger): void;
}
export declare const hvigorProcess: HvigorBuildProcess;
export {};
