/**
 * hvigorfile.ts的默认导出
 * export default中定义的配置项
 */
export interface LoaderProfile {
    system: Function;
    plugins: Function[];
    config: Record<string, any>;
}
/**
 * LoaderProfile对象
 */
export interface Config {
    getObject: (name: string) => any;
    setObject: (name: string, obj: object) => void;
}
export declare class CoreConfig implements Config {
    private logger;
    private config;
    constructor(config: any);
    getObject(name: string): any;
    setObject(name: string, obj: any): void;
}
