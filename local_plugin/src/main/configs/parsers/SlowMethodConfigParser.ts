//@ts-ignore
import * as fs from 'fs';
import { getAllFiles, readConfigFile, shouldKeep } from './BaseConfigParser';

const TAG = "SlowMethodConfigParser"

/**
 * 1.plugin 配置解析
 */
export class SlowMethodConfigParser {
  static parse(rootDir: string, configFilePath: string): string[] {
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
    return allFiles.filter(filePath => /\.(ts|js|ets)$/.test(filePath));
  }
}
