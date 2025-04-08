/**
 * 栈, 先进后出
 */
export declare class Stack<T> {
    private readonly stack;
    constructor();
    push(element: T): number;
    pop(): T | undefined;
    peek(): T | undefined;
    size(): number;
    isEmpty(): boolean;
}
