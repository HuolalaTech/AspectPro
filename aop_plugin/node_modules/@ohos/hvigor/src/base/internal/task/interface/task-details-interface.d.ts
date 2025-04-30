/**
 * 定义一个Task所需的基础属性信息
 *
 * @since 2022/5/30
 */
export interface TaskDetails {
    readonly name: string;
    readonly group?: string;
    readonly description?: string;
    readonly isEnabled?: boolean;
    [propName: string]: unknown;
}
