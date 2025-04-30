export type UnHook = () => void;
export type Transformer = (output: string) => boolean;
export declare class StdHook {
    promise: Promise<void>;
    unhook: UnHook;
    constructor(p: Promise<void>, u: UnHook);
}
/**
 * 初始化stdout和stderr的hook
 */
export declare function initHook(): void;
/**
 * 取消stdout和stderr的hook
 */
export declare function unhook(): void;
