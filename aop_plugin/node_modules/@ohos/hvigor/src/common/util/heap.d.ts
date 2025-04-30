/**
 * 堆工具类
 * 根据传入的比较函数确定元素的优先级
 * 支持push/pop/update/clear/peek/empty操作
 *
 * @since 2022/9/17
 */
export declare class Heap<T> {
    private elements;
    private element2index;
    private size;
    private readonly compare;
    constructor(compare: (a: T, b: T) => number);
    update(x: T): void;
    clear(): void;
    peek(): T | undefined;
    push(x: T): void;
    pop(): T | undefined;
    empty(): boolean;
    private up;
    private down;
    private swap;
}
