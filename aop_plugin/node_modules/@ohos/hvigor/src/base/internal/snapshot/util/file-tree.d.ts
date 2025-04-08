import { FileType } from './file-type.js';
/**
 * File Visit options
 */
export interface FileOptions {
    maxDepth?: number;
    normalizePath?: boolean;
    filter?: RegExp;
    extensions?: RegExp;
    exclude?: RegExp;
    followSymlinks?: boolean;
}
export declare class FileInfo {
    name: string;
    path: string;
    type: FileType;
    size: number;
    lastModifiedTime: number;
    isSymbolicLink: boolean;
    constructor(name: string, path: string, type?: FileType, size?: number, lastModifiedTime?: number, isSymbolicLink?: boolean);
    toString(): string;
}
export interface FileVisitor {
    preVisitDirectory(fileInfo: FileInfo): void;
    visitFile(fileInfo: FileInfo): void;
    visitFileFailed(path: string, error: any): void;
    postVisitDirectory(fileInfo: FileInfo): void;
}
/**
 * Walk file tree in depth first recursive way
 *
 * @param path file or directory path
 * @param fileVisitor file visitor (depth first)
 * @param options file options
 */
export declare function walkFileTree(path: string, fileVisitor: FileVisitor, options?: FileOptions): void;
