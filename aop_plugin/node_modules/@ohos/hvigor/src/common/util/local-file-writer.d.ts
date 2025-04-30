/**
 * 将对象写进文件中
 *
 * @since 2022/8/25
 */
export declare class LocalFileWriter {
    private static instance;
    private _space;
    private _replacer;
    private constructor();
    withSpace(space: number): void;
    withReplacer(replacer: (this: any, key: string, value: any) => any): void;
    /**
     * 将object对象写进json文件中
     *
     * @param filePath
     * @param content
     */
    write(filePath: string, content: object): void;
    writeStr(filePath: string, content: string): void;
    static getInstance(): LocalFileWriter;
}
