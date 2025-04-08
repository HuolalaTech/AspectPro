/**
 * 对外暴露接口的plugin的基类
 *
 * @since 2021/12/16
 */
export declare abstract class HvigorSystemPlugin {
    protected pluginVersion: string;
    protected readonly pluginId: string;
    protected constructor(pluginId: string);
    getPluginId(): string;
    abstract getContext(): any;
}
