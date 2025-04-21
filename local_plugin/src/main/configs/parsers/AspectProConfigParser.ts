//@ts-ignore
import * as fs from 'fs';
import { getAllFiles, readConfigFile, ReplaceRule, shouldKeep } from './BaseConfigParser';

const TAG = "AspectProConfigParser"

/**
 * 1.函数替换配置解析
 */
export class AspectProConfigParser {
  static parse(rootDir: string, configFilePath: string): { allFiles: string[]; replaceRules: ReplaceRule[]; } {
    const { filesToProcess, keepFiles, replaceRules } = readConfigFile(rootDir, configFilePath);
    let allFiles: string[] = [];

    if (filesToProcess.length > 0) {
      allFiles = filesToProcess.reduce<string[]>((acc, fileOrDir) => {
        if (fs.statSync(fileOrDir).isDirectory()) {
          return acc.concat(getAllFiles(fileOrDir, keepFiles));
        } else {
          return shouldKeep(fileOrDir, keepFiles) ? acc : acc.concat(fileOrDir);
        }
      }, []);
    } else {
      allFiles = getAllFiles(rootDir, keepFiles);
    }
    allFiles = allFiles.filter(filePath => /\.(ts|js|ets)$/.test(filePath))
    return { allFiles, replaceRules };
  }
}






