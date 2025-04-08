/**
 * Copyright (c) Huawei Technologies Co., Ltd. 2022-2022. All rights reserved.
 */
export declare class FileSet {
    private _group;
    addEntry(path: string, options?: FsOptions): this;
    deleteEntry(path: string): this;
    addEntries(entries: string[], options?: FsOptions): this;
    collect(): Map<string, FsOptions>;
}
/**
 * 任务输入输出路径选项
 *
 * @since 2022/8/31
 */
export interface FsOptions {
    isDirectory?: boolean;
    /**
     * 正则表达式字符串
     */
    test?: RegExp;
    /**
     * 文件夹深度
     */
    depth?: number;
    /**
     * 该文件对应的FileSnapShot快照的HashValue
     */
    fileSnapShotHashValue?: string;
}
