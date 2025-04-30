/**
 * Copyright (c) Huawei Technologies Co., Ltd. 2022-2022. All rights reserved.
 */
import { ProjectCacheService } from '../../cache/project-cache-service.js';
import { FsOptions } from '../util/file-set.js';
import { ValueEntry } from '../util/task-input-value-entry.js';
/**
 * 任务快照数据结构
 *
 * @since 2022/8/31
 */
export interface TaskSnapshot {
    /**
     * 根据任务信息组成标识key, 用作定位
     */
    getKey(): string;
    getTaskName(): string;
    getProjectName(): string;
    getModuleName(): string;
    isSuccessful(): boolean;
    getInputs(): ValueEntry[];
    getInputFiles(): Map<string, FsOptions>;
    getOutputFiles(): Map<string, FsOptions>;
    compareTo(other: TaskSnapshot): boolean;
    stringify(): string;
    setExecutedSuccessful(): void;
    updateFilesOptions(projectCacheService: ProjectCacheService): void;
    updateCacheFilesOptions(projectCacheService: ProjectCacheService): void;
}
