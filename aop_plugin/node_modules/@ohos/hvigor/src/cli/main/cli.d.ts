import { HvigorCliOptions } from '../../base/util/options/hvigor-cli-options.js';
/**
 * 解析hvigor命令行参数
 *
 * @return {HvigorCliOptions} 解析后的命令行参数
 */
export declare function parseCommand(): HvigorCliOptions;
/**
 * hvigor执行入口，根据命令行参数是否启用服务化调用不同的启动接口。
 *
 * @param {HvigorCliOptions} cliArgv hvigor命令行参数
 */
export declare function startHvigorBuild(cliArgv: HvigorCliOptions): Promise<void>;
