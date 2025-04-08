export declare class Json5Reader {
    private static logger;
    /**
     * 获取json5对象
     *
     * @param {string} json5path json5路径
     * @param {any} encodingStr 编码方式
     */
    static getJson5Obj(json5path: string, encodingStr?: string): any;
    /**
     * 异步API获取json5对象
     *
     * @param {string} json5path json5路径
     * @param {any} encodingStr 编码方式
     */
    static readJson5File(json5path: string, encodingStr?: string): Promise<any>;
    private static handleException;
    /**
     * 获取json5对象中某一个属性的值
     *
     * @param {any} json5对象 json5对象
     * @param {string} key json5对象中的属性名称，多个层级之间用.分隔
     */
    static getJson5ObjProp(obj: any, key: string): any;
}
