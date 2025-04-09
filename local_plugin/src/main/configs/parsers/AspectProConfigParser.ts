//@ts-ignore
import * as fs from 'fs';
import { getAllFiles, readConfigFile, ReplaceRule, shouldKeep } from './BaseConfigParser';

const TAG = "AspectProConfigParser"

/**
 * 1.plugin 配置解析
 */
export class AspectProConfigParser {
  static parse(rootDir: string, configFilePath: string): { allFiles: string[]; replaceRules: ReplaceRule[]; } {
    const { filesToProcess, keepFiles, replaceRules } = readConfigFile(rootDir, configFilePath);
    let allFiles: string[] = [];

    if (filesToProcess.length > 0) {
      allFiles = filesToProcess.flatMap(fileOrDir => {
        if (fs.statSync(fileOrDir).isDirectory()) {
          return getAllFiles(fileOrDir, keepFiles);
        } else {
          return shouldKeep(fileOrDir, keepFiles) ? [] : [fileOrDir];
        }
      });
    } else {
      allFiles = getAllFiles(rootDir, keepFiles);
    }
    allFiles = allFiles.filter(filePath => /\.(ts|js|ets)$/.test(filePath))
    return { allFiles, replaceRules };
  }
}






