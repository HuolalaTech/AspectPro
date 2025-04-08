export declare class ValueEntry {
    private readonly _name;
    private readonly _value;
    private readonly _valueType;
    private _hash;
    constructor(name: string, value: TaskInputValue);
    getName(): string;
    getValue(): TaskInputValue;
    getValueType(): unknown;
    getHash(): string;
}
export type TaskInputValue = number | string | boolean | string[] | number[] | boolean[];
