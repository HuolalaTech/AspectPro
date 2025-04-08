/**
 * 判断传入的taskPath是否是一个合法的路径,并返回分隔后的字符串数组
 *
 * @param {string} taskPath
 * @returns {string[]}
 */
export declare function validateTaskPath(taskPath: string): string[];
/**
 * 通过Task的path分割获取其所属的Module name
 *
 * @param {string} taskPath
 * @returns {string}
 */
export declare function getModuleNameFromTaskPath(taskPath: string): string;
/**
 * 通过Task的path分割获取其所属的Task name
 *
 * @param {string} taskPath
 * @returns {string}
 */
export declare function getTaskNameFromTaskPath(taskPath: string): string;
/**
 * 拼接module name和task name
 *
 * @param {string} moduleName 如果是project则为“”,如果是module则是moduleName
 * @param {string} taskName taskName
 * @returns {string} taskPath
 */
export declare function union(moduleName: string, taskName: string): string;
export declare const parseTaskPath: (taskPath: string) => {
    moduleName: string;
    taskName: string;
};
