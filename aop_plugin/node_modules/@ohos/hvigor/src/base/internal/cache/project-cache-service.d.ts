import { HvigorCoreNode, Project } from '../../external/core/hvigor-core-node.js';
import { BasicFileSnapshot } from '../snapshot/core/filesystem-snapshot.js';
import { TaskSnapshot } from '../snapshot/core/task-snapshot.js';
import { FileSnapShotCacheService } from './service/filesnapshot-cache-service.js';
import { TaskSnapShotCacheService } from './service/tasksnapshot-cache-service.js';
/**
 * 整个生命周期提供任务相关缓存信息的服务类,采用单例,当前是一个Node进程一个单例，后续有守护进程需要一个工程对应一个实例,
 * 当前包含:
 * TaskSnapShotCacheService 用户管理任务缓存快照
 * FileSnapShotCacheService 用于管理文件缓存快照
 *
 * @since 2022/9/1
 */
export declare class ProjectCacheService {
    private readonly projectNodeDir;
    private readonly projectName;
    private readonly projectTaskSnapShotCacheFilePath;
    private readonly projectFileSnapShotCacheFilePath;
    taskSnapShotCacheService: TaskSnapShotCacheService;
    fileSnapShotCacheService: FileSnapShotCacheService;
    currentTaskSnapShotCacheService: TaskSnapShotCacheService;
    currentFileSnapShotCacheService: FileSnapShotCacheService;
    private static instance?;
    private constructor();
    private getProjectFileSnapShotCacheFilePath;
    private getProjectTaskSnapShotCacheFilePath;
    initialize(): void;
    getTaskSnapShot(taskName: string, node: HvigorCoreNode): TaskSnapshot | undefined;
    getFileSnapShot(filePath: string): BasicFileSnapshot | undefined;
    updateFileSnapShot(key: string, fileSnapShot: BasicFileSnapshot): void;
    updateTaskSnapShot(key: string, taskSnapShot: TaskSnapshot): void;
    /**
     * 整个生命周期结束后，需要对缓存进行序列化更新
     */
    close(): void;
    static getInstance(project: Project): ProjectCacheService;
    private checkMetaInfo;
}
