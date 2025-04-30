import { Module, Project } from '../../../external/core/hvigor-core-node.js';
import { DefaultNodeImpl } from './default-node-impl.js';
/**
 * hvigor工程的基础module
 *
 * @since 2021/12/27
 */
export declare class ModuleImpl extends DefaultNodeImpl implements Module {
    classKind: string;
    private readonly _project;
    constructor(project: Project, moduleName: string, moduleDir: string);
    findModuleByName(moduleName: string): Module | undefined;
    getProject(): Project;
}
