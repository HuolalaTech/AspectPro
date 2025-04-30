import ts from 'typescript';
export declare const hvigorfileTSRoots: Set<string>;
export declare const targetRoots: Set<string>;
export declare const targetModules: Set<string>;
export declare let hvigorConfigFileTsRoot: string | undefined;
/**
 * 以每个hvigorfile.ts和hvigorconfig.ts为入口文件并行进行类型检查
 *
 */
export declare function hvigorfileTypeCheck(): void;
/**
 * 格式化诊断结果
 *
 * @param diagnostic 格式化后前的诊断结果
 * @param host 格式化host
 * @param fileName 指定的诊断结果对应的文件
 * @returns {string} 格式化后的诊断结果
 */
export declare function formatDiagnostic(diagnostic: ts.Diagnostic, host: ts.FormatDiagnosticsHost, fileName?: string): string;
export declare function setHvigorConfigFileTsRoot(root: string): void;
