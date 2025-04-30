import { Priority } from '../enum/priority.js';
/**
 * 工作单元
 * 外部向池提交的逻辑实体
 *
 * @since 2022/8/12
 */
export declare class Work {
    private readonly id;
    private priority;
    private readonly targetWorkers;
    private readonly workPath;
    private readonly inputData;
    private readonly sideEffects;
    private readonly preludeDeps;
    constructor(priority: Priority, targetWorkers: number[] | undefined, workPath: string, inputData?: unknown, sideEffects?: boolean, preludeDeps?: string[]);
    /**
     * 获取id
     *
     * @returns {string} 工作单元id
     */
    getId(): string;
    /**
     * 获取优先级
     *
     * @returns {Priority} 工作单元优先级
     */
    getPriority(): Priority;
    /**
     * 获取工作路径
     *
     * @returns {string} 工作单元路径
     */
    getWorkPath(): string;
    /**
     * 获取输入数据
     *
     * @returns {unknown} 工作单元输入数据
     */
    getInputData(): unknown;
    /**
     * 是否会污染线程环境
     *
     * @returns {boolean} 判断结果
     */
    hasSideEffects(): boolean;
    /**
     * 获取目标worker集合
     *
     * @returns {number[] | undefined} 工作单元目标worker集合
     */
    getTargetWorkers(): number[] | undefined;
    /**
     * 设置优先级
     *
     * @param priority 待设置的优先级
     */
    setPriority(priority: Priority): void;
    /**
     * 获取预热线程时需要require的依赖列表
     *
     * @returns {string[]} 依赖列表
     */
    getPreludeDeps(): string[];
}
