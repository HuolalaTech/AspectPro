/**
 * JSON.stringify将js对象转换为json时，对象内部属性为map时，将得到空对象{}
 * JSON.stringify(traceBuildAnalyze, replacer, 2)
 * 传参数replacer方法，可使得map类型js数据正常转化为json
 *
 * @since 2022/6/11
 * @param key
 * @param value
 * @return any
 */
export declare function replacer(key: string, value: any): any;
