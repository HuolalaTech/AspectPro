import crypto, { BinaryLike } from 'crypto';
export declare const createHash: (algorithm?: string) => crypto.Hash;
export declare const hash: (data: BinaryLike, algorithm?: string) => string;
export declare const hashFile: (filePath: string, algorithm?: string) => string | undefined;
