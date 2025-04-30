import { Class } from '../external/core/hvigor-core-node.js';
/**
 * 判断给定的obj对象是否是某个对应的classType
 *
 * @param {Class} obj
 * @param {string} classType
 * @returns {boolean}
 */
export declare function instanceOf<T extends Class>(obj: T, classType: string): boolean;
