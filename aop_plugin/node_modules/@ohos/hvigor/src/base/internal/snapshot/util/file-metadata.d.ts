export declare class FileMetaData {
    size: number;
    lastModifiedTime: number;
    constructor(size?: number, lastModifiedTime?: number);
    equals(other: FileMetaData): boolean;
}
