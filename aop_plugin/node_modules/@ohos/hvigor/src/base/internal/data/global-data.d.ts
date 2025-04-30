import { HvigorCliOptions } from '../../util/options/hvigor-cli-options.js';
/**
 * 保存cli生命周期中常用的全局数据
 *
 * @since 2022/8/17
 */
declare class GlobalData {
    cliEnv: any;
    cliOpts: HvigorCliOptions;
    buildId: string | undefined;
    init(cliEnv: any, cliOpts: HvigorCliOptions): void;
    /**
     * 每次构建结束显式的清除数据 (目前只有buildId有必要)
     */
    clean(): void;
}
export declare const globalData: GlobalData;
export interface StartEnvironment {
    nodeHome: string;
    workspaceDir: string;
}
export declare const defaultStartEnvironment: StartEnvironment;
export declare let startEnvironment: StartEnvironment;
export declare function initStartData(hvigorCliOptions?: HvigorCliOptions): void;
export declare function resetStartData(): void;
export {};
