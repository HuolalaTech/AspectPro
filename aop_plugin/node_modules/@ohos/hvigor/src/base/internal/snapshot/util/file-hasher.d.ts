import { FileMetaData } from './file-metadata.js';
export interface FileHasher {
    hash(filepath: string, fileMetaData?: FileMetaData): string;
}
export declare class FileContentHasher implements FileHasher {
    hash(filepath: string): string;
}
export declare class FileMetaHasher implements FileHasher {
    hash(filepath: string, fileMetaData: FileMetaData): string;
}
