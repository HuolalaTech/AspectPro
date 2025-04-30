import { ToolingModelBean } from './tooling-model-bean.js';
import { ToolingModelBeanRegistry } from './tooling-model-bean-registry.js';
/**
 * 默认的Hvigor的数据扩展模型的注册器
 *
 * @since 2022/2/19
 */
declare class DefaultToolingModelBeanRegistry implements ToolingModelBeanRegistry {
    private _log;
    private readonly _modelMap;
    constructor();
    registry(modelBean: ToolingModelBean): void;
    getModelMap(): Map<string, ToolingModelBean>;
    clear(): void;
}
export declare const defaultModelRegistry: DefaultToolingModelBeanRegistry;
export {};
