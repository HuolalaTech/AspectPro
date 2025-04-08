import { HvigorSystemPlugin } from './hvigor-system-plugin.js';
import { PluginContainer } from './plugin-container-interface.js';
/**
 * 用于保存当前module在hvigorFile.js中exports出来的plugin
 *
 * @since 2022/5/5
 */
export declare class DefaultPluginContainer implements PluginContainer {
    private readonly _pluginMap;
    constructor();
    registryPlugin(plugin: HvigorSystemPlugin): HvigorSystemPlugin;
    getPluginById(pluginId: string): HvigorSystemPlugin | undefined;
}
