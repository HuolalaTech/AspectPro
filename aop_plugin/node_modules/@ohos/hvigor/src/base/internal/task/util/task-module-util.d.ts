import { HvigorCoreNode } from '../../../external/core/hvigor-core-node.js';
/**
 * 通过Task的path分割获取其所属Module
 *
 * @param {string} taskPath
 * @returns {HvigorNode | undefined}
 */
export declare function getModuleFromTaskPath(taskPath: string): HvigorCoreNode | undefined;
