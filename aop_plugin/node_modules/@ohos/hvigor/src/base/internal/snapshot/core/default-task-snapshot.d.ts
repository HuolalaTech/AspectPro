import type { IncrementalTask } from '../../../external/task/incremental-task.js';
import type { FsOptions } from '../util/file-set.js';
import { TaskInputValue, ValueEntry } from '../util/task-input-value-entry.js';
import { TaskSnapshot } from './task-snapshot.js';
import type { ProjectCacheService } from '../../cache/project-cache-service.js';
export declare class DefaultTaskSnapshot implements TaskSnapshot {
    private readonly _inputs;
    private readonly _projectName;
    private readonly _moduleName;
    private readonly _taskName;
    private readonly _key;
    private _successful;
    private readonly _executionId;
    private readonly _inputFiles;
    private readonly _outputFiles;
    constructor(task: IncrementalTask);
    getKey(): string;
    compareTo(other: TaskSnapshot): boolean;
    /**
     * 使用新生成的FileSnapShot保存到最终的TaskSnapShot
     *
     * @param {ProjectCacheService} projectCacheService
     */
    updateFilesOptions(projectCacheService: ProjectCacheService): void;
    /**
     * 使用Cache的FileSnapShot更新新生成的TaskSnapShot
     *
     * @param {ProjectCacheService} projectCacheService
     */
    updateCacheFilesOptions(projectCacheService: ProjectCacheService): void;
    getModuleName(): string;
    getTaskName(): string;
    getProjectName(): string;
    isSuccessful(): boolean;
    setExecutedSuccessful(): void;
    addInput(key: string, value: TaskInputValue): void;
    getInputs(): ValueEntry[];
    getExecutionId(): string;
    private compareInputs;
    private compareInputFiles;
    private compareOutputFiles;
    private static compareFiles;
    getInputFiles(): Map<string, FsOptions>;
    getOutputFiles(): Map<string, FsOptions>;
    stringify(): string;
}
