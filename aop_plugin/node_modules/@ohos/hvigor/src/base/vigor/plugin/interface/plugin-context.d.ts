import { HvigorLogger } from '../../../log/hvigor-log.js';
export declare class PluginContext {
    protected logger: HvigorLogger;
    private contextMap;
    setContextFunc(pluginId: string, func: Function): void;
    getContext(pluginId: string): any;
}
