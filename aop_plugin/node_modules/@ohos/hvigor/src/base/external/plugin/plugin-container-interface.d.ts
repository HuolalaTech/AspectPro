import { HvigorSystemPlugin } from './hvigor-system-plugin.js';
/**
 * 对于每一个Hvigor 的Node节点，都可以注册多个自定义的Plugin插件
 * 该接口定义管理插件的相关接口
 *
 * @since 2022/5/6
 */
export interface PluginContainer {
    /**
     * 注册扩展的HvigorPlugin到对应的Hvigor module中
     *
     * @param {HvigorSystemPlugin} plugin
     * @return {HvigorSystemPlugin}
     */
    registryPlugin(plugin: HvigorSystemPlugin): HvigorSystemPlugin;
    /**
     * 通过Plugin Id来获取当前module中存在的plugin
     *
     * @param {string} pluginId
     * @return {HvigorSystemPlugin|undefined}
     */
    getPluginById(pluginId: string): HvigorSystemPlugin | undefined;
}
