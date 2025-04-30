/**
 * Hvigor扩展数据模型的接口类型定义
 *
 * @since 2022/2/19
 */
export interface ToolingModelBean {
    modelId: string;
    /**
     * 调用相关的函数，来初始化和注册对应的ToolingModelBean
     *
     * @return {string | undefined}
     */
    buildModel(): string | undefined;
}
