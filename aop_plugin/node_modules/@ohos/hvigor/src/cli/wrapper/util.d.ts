/// <reference types="node" />
import { SpawnSyncOptionsWithBufferEncoding } from 'child_process';
/**
 * 通过node原生require.resolve接口方法来判断在指定的paths路径中是否可以找到对应的npm包
 *
 * @param {string} packName npm pack name
 * @param {string[]} nodePaths node paths
 * @returns {boolean} true/false
 */
export declare function hasNpmPackInPaths(packName: string, nodePaths: string[]): boolean;
export declare function executeCommand(command: string, parameters: string[], options: SpawnSyncOptionsWithBufferEncoding, hvigorProjectDependenciesHome: string): void;
export declare function getHvigorProjectHome(): string;
export declare function getCurrentProjectCacheDirHash(): string;
