/**
 * 解析JSON/JSON5文件
 *
 * @param filePath json文件路径
 * @param location 是否携带位置信息
 * @param encoding
 */
export declare function parseJsonFile(filePath: string, location?: boolean, encoding?: string): any;
/**
 * 解析JSON/JSON5字符串
 *
 * @param text json字符串
 * @param location 是否携带位置信息
 * @throws SyntaxError
 * @since 2022/6/17
 */
export declare function parseJsonText(text: string, location?: boolean): any;
