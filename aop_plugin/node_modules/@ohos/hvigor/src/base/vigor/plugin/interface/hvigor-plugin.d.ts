import { HvigorNode } from './hvigor-node.js';
/**
 * HvigorPlugin定义声明
 */
export interface HvigorPlugin {
    /**
     * 插件的唯一标示ID
     */
    pluginId: string;
    /**
     * 插件元数据定义
     */
    context?: (() => any) | any;
    /**
     * 插件的主体方法，定义插件实现逻辑（例如任务注册等）
     * 在hvigor的生命周期配置阶段调用，进行task的注册
     *
     * @param node
     */
    apply: (node: HvigorNode) => void | Promise<void>;
}
