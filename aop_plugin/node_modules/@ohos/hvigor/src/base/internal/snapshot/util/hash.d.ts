/// <reference types="node" />
import * as crypto from 'crypto';
export declare enum HashAlgorithm {
    MD5 = "md5",
    SHA1 = "sha1",
    SHA256 = "sha256"
}
export declare class Hash {
    static getHash(algorithm?: HashAlgorithm): crypto.Hash;
    static hash(value: any, algorithm?: HashAlgorithm): string;
}
