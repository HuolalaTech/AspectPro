import { Module, Project } from '../../../external/core/hvigor-core-node.js';
import { Config } from '../../../vigor/plugin/interface/loader-profile.js';
import { DefaultNodeImpl } from './default-node-impl.js';
/**
 * hvigor工程的基础root module
 *
 * @since 2021/12/27
 */
export declare class ProjectImpl extends DefaultNodeImpl implements Project {
    classKind: string;
    private readonly _subProjects;
    private _config;
    constructor(projectName: string, moduleDir: string);
    findModuleByName(moduleName: string): Module | undefined;
    getProject(): Project;
    getSubModules(): Map<string, Module>;
    addSubModule(module: Module): void;
    getAllSubModules(): Module[];
    loadConfig(config: any): void;
    getConfigOpt(): Config;
}
