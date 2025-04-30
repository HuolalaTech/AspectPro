export declare class Queue<T> {
    private elements;
    private readonly _capacity;
    constructor(capacity?: number);
    push(element: T): boolean;
    pop(): T | undefined;
    size(): number;
    peek(): T | undefined;
    clear(): void;
    toString(): string;
}
