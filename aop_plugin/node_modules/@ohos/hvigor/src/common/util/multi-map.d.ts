/**
 * 一个用Map来保存图中的邻接信息的数据结构
 *
 * @since 2022/4/24
 */
export declare class MultiMap {
    private _nMap;
    put(key: string, value?: string): void;
    get(key: string): Set<string>;
    keys(): string[];
    removeAll(key: string): Set<string>;
    remove(key: string, value: string): void;
    clear(): void;
}
