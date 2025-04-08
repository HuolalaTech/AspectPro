/// <reference types="node" />
import fse from 'fs-extra';
import { HvigorLogger } from '../../base/log/hvigor-log.js';
export declare class PathUtil {
    private static hvigorCacheDirHasLogged;
    /**
     * 获取.hvigor的根目录，就是编译时产生的.hvigor文件夹，不是userHome下的
     * 例如D:\test\ToDoListArkTS\.hvigor
     * 会先从项目的配置文件中获取，不存在则获取userHome目录下的配置文件，都不存在返回项目下的
     */
    static getHvigorCacheDir(logger?: HvigorLogger): string;
    /**
     *
     * 检查用来copy的两个路径是否是指向相同的路径
     *
     * @param src
     * @param dest
     * @return 相同路径返回true,不同路径返回false
     */
    static checkCopyPathIsSame(src: string, dest: string): boolean;
    /**
     *
     * 获取一个文件的stats
     * @param path
     * @private
     * @return 返回fse.Stats对象，文件不能读取(不存在或其他报错)返回null
     */
    static getStatsSync(path: string): fse.Stats | null;
    private static areIdentical;
    private static getCommandHvigorCacheDir;
    static getReportDirPath(): string;
}
