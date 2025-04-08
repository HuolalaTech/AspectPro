import { ProjectImpl } from '../../internal/lifecycle/hvigor-node-impl/project-impl.js';
import { HvigorNodeDescriptor } from '../../vigor/plugin/interface/hvigor-node-descriptor.js';
/**
 * hvigor配置对象 用于提供给用户实现动态加载模块等功能
 */
export declare class HvigorConfig {
    private rootNodeDescriptor;
    private allChildrenNodeDescriptor;
    constructor(project: ProjectImpl);
    includeNode(name: string, srcPath: string, extraOptions?: Record<string, any>): void;
    excludeNodeByName(name: string): void;
    getAllNodeDescriptor(): HvigorNodeDescriptor[];
    getRootNodeDescriptor(): HvigorNodeDescriptor;
    getNodeDescriptorByName(name: string): HvigorNodeDescriptor | undefined;
}
export declare let hvigorConfig: HvigorConfig;
export declare function hvigorConfigInit(project: ProjectImpl): void;
