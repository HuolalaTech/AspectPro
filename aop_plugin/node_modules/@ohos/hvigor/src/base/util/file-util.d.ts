/// <reference types="node" />
/// <reference types="node" />
import { HvigorLogger } from '../log/hvigor-log.js';
export declare function readFile(filepath: string): Promise<Error | Buffer>;
export declare function writeFile(filepath: string, data: string | NodeJS.ArrayBufferView): Promise<Error | void>;
/**
 * 如果路径不存在就报错并退出
 *
 * @param log 日志
 * @param path 待判断的路径
 * @param field 需要检查的字段
 * @param configFile 需要检查的配置文件
 */
export declare function exitIfNotExists(log: HvigorLogger, path: string, field: string, configFile: string): void;
/**
 * 寻找工程下hvigorfile文件的真实路径
 *
 * @param hvigorFilePath 不带后缀的hvigorfile文件路径
 * @param _log 日志工具
 * @returns {string | undefined} 寻找结果
 */
export declare function findRealHvigorFilePath(hvigorFilePath?: string, _log?: any): string | undefined;
