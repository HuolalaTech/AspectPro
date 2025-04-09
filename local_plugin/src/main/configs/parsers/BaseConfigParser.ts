//@ts-ignore
import * as fs from 'fs';
//@ts-ignore
import * as path from 'path';

const TAG = "BaseConfigParser"

export interface ReplaceRule {
  pattern: string;
  replacement: string;
  imports: string[];
}

export interface Config {
  filesToProcess: string[];
  keepFiles: string[];
  replaceRules: ReplaceRule[];
}

export function escapeRegExp(string: string): string {
  return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');
}

export function unescapeRegExp(string) {
  return string.replace(/\\([.*+\-?^${}()|[\]\\])/g, '$1');
}

export function getFileContent(filePath: string): string {
  return fs.readFileSync(filePath, 'utf-8');
}

export function writeFile(filePath: string, data: string): void {
  fs.writeFileSync(filePath, data, 'utf-8');
}

export function readConfigFile(rootDir: string, configFilePath: string): Config {
  configFilePath = path.join(rootDir, configFilePath)
  const filesToProcess: string[] = [];
  const keepFiles: string[] = [];
  const replaceRules: ReplaceRule[] = [];

  const lines = fs.readFileSync(configFilePath, 'utf-8').split('\n');
  const replaceRegex = /^-replace\s+([^\s]+)\s+([^\s]+)\s*(?:\[(.*)\])?/;

  lines.map(line => line.trim())
    .filter(line => line.length > 0 && !line.startsWith('#'))
    .forEach(line => {
      if (line.startsWith('-hook ')) {
        filesToProcess.push(resolvePath(line.substring(6).trim(), rootDir));
      } else if (line.startsWith('-keep ')) {
        keepFiles.push(resolvePath(line.substring(6).trim(), rootDir));
      } else if (replaceRegex.test(line)) {
        const match = replaceRegex.exec(line);
        if (match) {
          const pattern = escapeRegExp(match[1]);
          const replacement = match[2];
          const imports =
            match[3] ? match[3].split('-import ').filter(Boolean).map(s => s.trim()) :
              [];
          replaceRules.push({ pattern, replacement, imports });
        }
      }
    });

  return { filesToProcess, keepFiles, replaceRules };
}


export function resolvePath(filePath: string, rootDir: string): string {
  return path.isAbsolute(filePath) ? filePath : path.resolve(rootDir, `.${path.sep}${filePath}`);
}

export function getAllFiles(dir: string, keepFiles: string[], fileList: string[] = []): string[] {
  if (!fs.existsSync(dir)) {
    console.error(`ERROR: Directory does not exist: ${dir}`);
    return fileList;
  }

  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      if (!shouldKeep(filePath, keepFiles)) {
        getAllFiles(filePath, keepFiles, fileList);
      }
    } else {
      if (!shouldKeep(filePath, keepFiles)) {
        fileList.push(filePath);
      }
    }
  });

  return fileList;
}

export function shouldKeep(filePath: string, keepFiles: string[]): boolean {
  return keepFiles.some(keepFile => filePath.startsWith(keepFile));
}