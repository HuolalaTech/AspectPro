import { TCB } from '../model/tcb.js';
/**
 * TCB存储
 * 维护TCB数据
 *
 * @since 2022/8/16
 */
export declare class TcbStore {
    private static tcbMap;
    static getTCB(id: string): TCB | undefined;
    static clear(): void;
    static add(tcb: TCB): void;
}
