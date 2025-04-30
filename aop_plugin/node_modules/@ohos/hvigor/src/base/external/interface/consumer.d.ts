/**
 * 定义的入参是一个参数的方法接口
 */
export interface Consumer<T> {
    (arg: T): Promise<void> | void;
}
