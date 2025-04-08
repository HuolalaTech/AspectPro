/**
 * 报告实体
 *
 * @since 2022/8/18
 */
export declare class Report<T> {
    private readonly name;
    private readonly value;
    constructor(name: string, report: T);
    /**
     * 获取报告名
     */
    getName(): string;
    /**
     * 获取报告内容
     */
    getValue(): T;
}
